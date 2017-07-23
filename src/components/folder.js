export default class Folder {
        constructor(content, children, path) {
            this.content = content;
            this.children = children;
            this.path = path;
            this.isOpen = false;
        }

        addChild(childrenList, pathArray) {
            const path = pathArray.length===1 ? this.path+pathArray[0] : this.path+pathArray[0]+"/";
            childrenList.push(new Folder(pathArray[0], [], path));
        }

        addChildren(fullPath) {
            const pathArray = fullPath.split("/");
            if(pathArray[0]) {
                if(!this.children.length) {
                    this.addChild(this.children, pathArray);
                } else {
                    var match = false;
                    for(var i = 0; i<this.children.length; i++) {
                        if(this.children[i].content===pathArray[0]){
                            this.children[i].addChildren(pathArray.slice(1).join("/"));
                            match = true;
                            break;
                        }
                    }
                    if(!match) {
                        this.addChild(this.children, pathArray);
                    }
                }
            }
        }

        changeFolderState(path){
            function collapseSubFolders(folder){
                if(!Array.isArray(folder)) {
                    folder = [folder];
                }
                folder.forEach(subFolder => {
                    if(subFolder.isOpen) {
                        subFolder.isOpen = false;
                    }
                    if(subFolder.children){
                        subFolder.children.forEach(child=>{
                            if(child.isOpen){
                                collapseSubFolders(child.children);
                                child.isOpen = false;
                            }
                        })
                    }
                }) 
            }
            var pathArray = path.split("/");
            if(pathArray[0]){
                for(let i=0; i<this.children.length; i++){
                    if(pathArray[0] === this.children[i].content){
                        if(!pathArray[1]){
                            if(this.children[i].isOpen) {
                                collapseSubFolders(this.children[i])
                            } else {
                                this.children[i].isOpen = !this.children[i].isOpen;
                            }
                        } else {
                            this.children[i].changeFolderState(pathArray.slice(1).join("/"));
                        }
                    } 
                }
            }
            return this;
        }
}