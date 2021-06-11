const path = require("path");

const iconpath = path.join(__dirname, "icons", "icon");

module.exports = {
    "packagerConfig": {
	"icon": iconpath
    },

    "makers": [
        {
	    "name": "@electron-forge/maker-squirrel",
	    "config": {
		"name": "helloworld",
		"iconUrl": iconpath + ".ico"
	    }
        },
        {
	    "name": "@electron-forge/maker-zip",
	    "platforms": [
		"darwin",
		"linux",
		"win32"
	    ]
        },
        {
	    "name": "@electron-forge/maker-deb",
	    "config": {
		"options": {
		    "icon": iconpath + ".png"
		}
	    }
        },
        {
	    "name": "@electron-forge/maker-rpm",
	    "config": {
		"options": {
		    "icon": iconpath + ".png"
		}
	    }
        }
    ]
};
