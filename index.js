const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const indexModule = {};
// const chalk = require('chalk');

let totalLinks = 0;
let uniqueLinks = 0;
let brokenLinks = 0;


const fileOrDirectory = (dirPath) => {
    return new Promise((resolve, reject) => {
      fs.stat(dirPath, (err, stats) => {
        if (err) {
          reject(err)
        } else if (stats.isFile()) { 
          resolve(readMdFiles(dirPath))
        } else if (stats.isDirectory()) {
          resolve(readDirectorys(dirPath))
        }
      });
    });
  };

// const readDirectorys 
const readDirectorys = (dirPath) => {
  return new Promise((resolve, reject) => {
  const files = fs.readdirSync(dirPath);
  let directoryContent = [];
  files.forEach((arch, i) => {
    directoryContent[i] = fileOrDirectory(dirPath + "/" + arch);
  });
   // console.log(directoryContent);
   Promise.all(directoryContent)
   .then((resultado) => {
     return resultado.reduce((acc, val) => acc.concat(val), []);
   })
   .then((resu) => {
     resolve(resu.filter((val) => typeof val === "object"));
   })
   .catch((error) => {
     reject(error);
   });
  })

}




const readMdFiles = (dirPath) => {
    let ext = path.extname(dirPath).toLowerCase()
    if (ext === '.md') {
      return fileRead(dirPath)
    }
  }
  // Encontrar links del archivo
  const getLinks = (file) => {
    //expresion regular para encontrar links
    const reg = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g;
    return file.matchAll(reg);
  };

  const fileRead = (dirPath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(dirPath, "utf-8", (error, data) => {
        if (error) {
          reject(error);
        }
        let links = [];
        let index = 0;
        //Recorre todos los links y  almacena los datos como un array de objetos
        for (const url of getLinks(data)) {
          const obj = {
            href: url[2],
            text: url[1],
            file: dirPath,
          };
          //llenar array con el obj
          links[index] = obj;
          index++;
          
        } 
        resolve(links);
        
      });
    });
  };

 
 
const validateOption = links => {
  //console.log("LINKS:", links);
  return new Promise((resolve, reject) => {
    let statusLinks = links.map(link => {
      return fetch(link.href).then(res => {
        if (res.stats === 200) {
          links.stats = res.stats;
          links.response = "O.K.";
          //console.log("LINK O.K.", link.response);
        } else if(res.stats === 404) {
          links.stats = res.stats;
          links.response = res.statsText;
          links.response = "FAIL";
          //console.log("LINK FAIL", link.response);
        }
      });
    });
    Promise.all(statusLinks)
      .then(res => {
        resolve(links);
    }).catch(err => {
      links.stats = null;
      links.response = "FAIL";
      resolve(links);
    });
    
  });
};

//Estadisticas de TOTAL y UNIQUES
const statsOption = links => {
  return new Promise((resolve, reject) => {
    let allLinks = links.map(link => link.href);
    totalLinks += allLinks.length;
    uniqueLinks += [...new Set(allLinks)].length;
    let statsResult = {
      total: totalLinks,
      unique: uniqueLinks
    };
    resolve(statsResult);
  });
};

const statsValidateOption = (links) => {
  return new Promise((resolve, reject) => {
    validateOption(links).then(link => {
      let allLinks = link.map(link => link.href);
      let statusLinks = links.map(link => link.response);
      //console.log("statusLinks:", statusLinks);
      let totalLinks = allLinks.length;
      //console.log("totalLinks:", totalLinks);
      uniqueLinks = [...new Set(allLinks)];
      //console.log("uniqueLinks:", uniqueLinks);
      brokenLinks += (statusLinks.toString().match(/FAIL/g));
      //console.log("brokenLinks:", brokenLinks);
      let statsResult = {
        total: totalLinks,
        unique: uniqueLinks.length,
        broken: brokenLinks.length
      }
      
      //console.log("STATS RESULT 2:", statsResult);
      if (brokenLinks === 0) {
        statsResult = {
          total: totalLinks,
          unique: uniqueLinks.length,
          broken: 0
        }
        console.log("statsResult",statsResult);
        resolve(statsResult);
      } else {
        brokenLinks = (statusLinks.toString().match(/FAIL/g)).length;
        let statsResult = {
          total: totalLinks,
          unique: uniqueLinks.length,
          broken: brokenLinks
        }
        resolve(statsResult);
        //console.log("STATS RESULT:", statsResult);
      }
    }).catch(err => {
      reject(new Error("Error en la promesa"))
    })
  })
}

//Recibe ruta y verfica si es un archivo o directorio
const mdlinks = (dirPath, options) => {
  return new Promise((resolve, reject) => {
    if (options.validate === false && options.stats === false) {
      fileOrDirectory(dirPath)
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    }else if(options.validate === true && options.stats === false){
      fileOrDirectory(dirPath).then(links => {
        validateOption(links).then(res => {
          resolve(res);
        });
        
      });

    } else if (options.validate === false && options.stats === true) {
      fileOrDirectory(dirPath).then(res => {
        statsOption(res).then(res => {
          resolve(res);
        });
      });
    } else if (options.validate === true && options.stats === true) {
      fileOrDirectory(dirPath).then(res => {
        statsValidateOption(res)
          .then(res => {
            resolve(res);
          });
      });
    }

  });
};


indexModule.mdlinks = mdlinks;
module.exports = indexModule;
