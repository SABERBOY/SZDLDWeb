!function(t,i){"use strict";class e extends i.Sprite{constructor(){super(...arguments),this.relativeX=0,this.relativeY=0,this.isAloneObject=!1,this.isHaveAnimation=!1,this.drawImageNum=0,this._map=null}initData(t,i=!1){this._map=t,this.isAloneObject=i}addAniSprite(t){null==this.aniSpriteArray&&(this.aniSpriteArray=[]),this.aniSpriteArray.push(t)}show(){if(!this.visible){if(this.visible=!0,null==this.aniSpriteArray)return;for(var t=0;t<this.aniSpriteArray.length;t++)this.aniSpriteArray[t].show()}}hide(){if(this.visible){if(this.visible=!1,null==this.aniSpriteArray)return;for(var t=0;t<this.aniSpriteArray.length;t++)this.aniSpriteArray[t].hide()}}updatePos(){this.isAloneObject?(this._map&&(this.x=this.relativeX-this._map._viewPortX,this.y=this.relativeY-this._map._viewPortY),this.x<0||this.x>this._map.viewPortWidth||this.y<0||this.y>this._map.viewPortHeight?this.hide():this.show()):this._map&&(this.x=this.relativeX-this._map._viewPortX,this.y=this.relativeY-this._map._viewPortY)}clearAll(){if(this._map&&(this._map=null),this.visible=!1,null!=this.aniSpriteArray)for(var t=0;t<this.aniSpriteArray.length;t++)this.aniSpriteArray[t].clearAll();this.destroy(),this.relativeX=0,this.relativeY=0,this.isHaveAnimation=!1,this.aniSpriteArray=null,this.drawImageNum=0}}class r{}r.TiledMap=null;class h extends i.Sprite{constructor(){super(...arguments),this._tileTextureSet=null,this._aniName=null}setTileTextureSet(t,i){this._aniName=t,this._tileTextureSet=i,i.addAniSprite(this._aniName,this)}show(){this._tileTextureSet.addAniSprite(this._aniName,this)}hide(){this._tileTextureSet.removeAniSprite(this._aniName)}clearAll(){this._tileTextureSet.removeAniSprite(this._aniName),this.destroy(),this._tileTextureSet=null,this._aniName=null}}class a extends i.Sprite{constructor(){super(...arguments),this._mapData=null,this._tileWidthHalf=0,this._tileHeightHalf=0,this._mapWidthHalf=0,this._mapHeightHalf=0,this._gridSpriteArray=[],this._objDic=null,this._dataDic=null,this._tempMapPos=new i.Point,this.layerName=null}init(t,e){this._map=e,this._mapData=t.data;t.height,t.width;var h=e.tileWidth,a=e.tileHeight;switch(this.layerName=t.name,this._properties=t.properties,this.alpha=t.opacity,this._tileWidthHalf=h/2,this._tileHeightHalf=a/2,this._mapWidthHalf=this._map.width/2-this._tileWidthHalf,this._mapHeightHalf=this._map.height/2,t.type){case"tilelayer":break;case"objectgroup":var s,l,_,o=t.objects;o.length>0&&(this._objDic={},this._dataDic={});for(var n=0;n<o.length;n++)if(s=o[n],this._dataDic[s.name]=s,1==s.visible){l=s.width,_=s.height;var p=e.getSprite(s.gid,l,_);if(null!=p){switch(this._map.orientation){case r.TiledMap.ORIENTATION_ISOMETRIC:this.getScreenPositionByTilePos(s.x/a,s.y/a,i.Point.TEMP),p.pivot(l/2,_/2),p.rotation=s.rotation,p.x=p.relativeX=i.Point.TEMP.x+this._map.viewPortX,p.y=p.relativeY=i.Point.TEMP.y+this._map.viewPortY-_/2;break;case r.TiledMap.ORIENTATION_STAGGERED:case r.TiledMap.ORIENTATION_ORTHOGONAL:p.pivot(l/2,_/2),p.rotation=s.rotation,p.x=p.relativeX=s.x+l/2,p.y=p.relativeY=s.y-_/2;break;case r.TiledMap.ORIENTATION_HEXAGONAL:p.x=p.relativeX=s.x,p.y=p.relativeY=s.y}this.addChild(p),this._gridSpriteArray.push(p),this._objDic[s.name]=p}}}}getObjectByName(t){return this._objDic?this._objDic[t]:null}getObjectDataByName(t){return this._dataDic?this._dataDic[t]:null}getLayerProperties(t){return this._properties?this._properties[t]:null}getTileData(t,i){if(i>=0&&i<this._map.numRowsTile&&t>=0&&t<this._map.numColumnsTile){var e=i*this._map.numColumnsTile+t,r=this._mapData;if(null!=r&&e<r.length)return r[e]}return 0}getScreenPositionByTilePos(t,i,e=null){if(e){switch(this._map.orientation){case r.TiledMap.ORIENTATION_ISOMETRIC:e.x=this._map.width/2-(i-t)*this._tileWidthHalf,e.y=(i+t)*this._tileHeightHalf;break;case r.TiledMap.ORIENTATION_STAGGERED:t=Math.floor(t),i=Math.floor(i),e.x=t*this._map.tileWidth+(1&i)*this._tileWidthHalf,e.y=i*this._tileHeightHalf;break;case r.TiledMap.ORIENTATION_ORTHOGONAL:e.x=t*this._map.tileWidth,e.y=i*this._map.tileHeight;break;case r.TiledMap.ORIENTATION_HEXAGONAL:t=Math.floor(t),i=Math.floor(i);var h=2*this._map.tileHeight/3;e.x=(t*this._map.tileWidth+i%2*this._tileWidthHalf)%this._map.gridWidth,e.y=i*h%this._map.gridHeight}e.x=(e.x+this._map.viewPortX)*this._map.scale,e.y=(e.y+this._map.viewPortY)*this._map.scale}}getTileDataByScreenPos(t,i){var e=0;return this.getTilePositionByScreenPos(t,i,this._tempMapPos)&&(e=this.getTileData(Math.floor(this._tempMapPos.x),Math.floor(this._tempMapPos.y))),e}getTilePositionByScreenPos(t,i,e=null){t=t/this._map.scale-this._map.viewPortX,i=i/this._map.scale-this._map.viewPortY;var h=this._map.tileWidth,a=this._map.tileHeight,s=0,l=0;switch(this._map.orientation){case r.TiledMap.ORIENTATION_ISOMETRIC:var _=t-this._map.width/2;return s=-(_/h-i/a),l=_/h+i/a,e&&(e.x=l,e.y=s),!0;case r.TiledMap.ORIENTATION_STAGGERED:var o,n;if(e)o=(t-(Math.floor(t/h)*h+h/2))*a/2,n=(i-(Math.floor(i/a)*a+a/2))*h/2,Math.abs(o)+Math.abs(n)<=h*a/4?(l=Math.floor(t/h),s=2*Math.floor(i/a)):(t-=h/2,l=Math.floor(t/h)+1,i-=a/2,s=2*Math.floor(i/a)+1),e.x=l-(1&s),e.y=s;return!0;case r.TiledMap.ORIENTATION_ORTHOGONAL:return l=t/h,s=i/a,e&&(e.x=l,e.y=s),!0;case r.TiledMap.ORIENTATION_HEXAGONAL:l=(t-(s=i/(2*a/3))%2*this._tileWidthHalf)/h,e&&(e.x=l,e.y=s)}return!1}getDrawSprite(t,i){var r=new e;return r.relativeX=t*this._map.gridWidth,r.relativeY=i*this._map.gridHeight,r.initData(this._map),this._gridSpriteArray.push(r),r}updateGridPos(){for(var t,i=0;i<this._gridSpriteArray.length;i++)((t=this._gridSpriteArray[i]).visible||t.isAloneObject)&&t.drawImageNum>0&&t.updatePos()}drawTileTexture(t,i,e){if(e>=0&&e<this._map.numRowsTile&&i>=0&&i<this._map.numColumnsTile){var a=e*this._map.numColumnsTile+i,s=this._mapData;if(null!=s&&a<s.length&&0!=s[a]){var l=this._map.getTexture(s[a]);if(l){var _=0,o=0;l.texture;switch(this._map.orientation){case r.TiledMap.ORIENTATION_STAGGERED:_=i*this._map.tileWidth%this._map.gridWidth+(1&e)*this._tileWidthHalf,o=e*this._tileHeightHalf%this._map.gridHeight;break;case r.TiledMap.ORIENTATION_ORTHOGONAL:_=i*this._map.tileWidth%this._map.gridWidth,o=e*this._map.tileHeight%this._map.gridHeight;break;case r.TiledMap.ORIENTATION_ISOMETRIC:_=(this._mapWidthHalf+(i-e)*this._tileWidthHalf)%this._map.gridWidth,o=(i+e)*this._tileHeightHalf%this._map.gridHeight;break;case r.TiledMap.ORIENTATION_HEXAGONAL:var n=2*this._map.tileHeight/3;_=(i*this._map.tileWidth+e%2*this._tileWidthHalf)%this._map.gridWidth,o=e*n%this._map.gridHeight}if(l.isAnimation){var p=new h;p.x=_,p.y=o,p.setTileTextureSet(a.toString(),l),t.addAniSprite(p),t.addChild(p),t.isHaveAnimation=!0}else t.graphics.drawImage(l.texture,_+l.offX,o+l.offY);return!0}}}return!1}clearAll(){this._map=null,this._mapData=null,this._tileWidthHalf=0,this._tileHeightHalf=0,this._mapWidthHalf=0,this._mapHeightHalf=0,this.layerName=null;var t=0;if(this._objDic){for(var i in this._objDic)delete this._objDic[i];this._objDic=null}if(this._dataDic){for(i in this._dataDic)delete this._dataDic[i];this._dataDic=null}for(t=0;t<this._gridSpriteArray.length;t++)this._gridSpriteArray[t].clearAll();this._properties=null,this._tempMapPos=null,this.tarLayer=null}}class s{constructor(){this.gid=-1,this.offX=0,this.offY=0,this.textureArray=null,this.durationTimeArray=null,this.animationTotalTime=0,this.isAnimation=!1,this._spriteNum=0,this._aniDic=null,this._frameIndex=0,this._time=0,this._interval=0,this._preFrameTime=0}addAniSprite(t,e){if(0!=this.animationTotalTime&&(null==this._aniDic&&(this._aniDic={}),0==this._spriteNum&&(i.ILaya.timer.frameLoop(3,this,this.animate),this._preFrameTime=i.ILaya.Browser.now(),this._frameIndex=0,this._time=0,this._interval=0),this._spriteNum++,this._aniDic[t]=e,this.textureArray&&this._frameIndex<this.textureArray.length)){var r=this.textureArray[this._frameIndex];this.drawTexture(e,r)}}animate(){if(this.textureArray&&this.textureArray.length>0&&this.durationTimeArray&&this.durationTimeArray.length>0){var t=i.ILaya.Browser.now();this._interval=t-this._preFrameTime,this._preFrameTime=t,this._interval>this.animationTotalTime&&(this._interval=this._interval%this.animationTotalTime),this._time+=this._interval;for(var e=this.durationTimeArray[this._frameIndex];this._time>e;){this._time-=e,this._frameIndex++,(this._frameIndex>=this.durationTimeArray.length||this._frameIndex>=this.textureArray.length)&&(this._frameIndex=0);var r,h=this.textureArray[this._frameIndex];for(var a in this._aniDic)r=this._aniDic[a],this.drawTexture(r,h);e=this.durationTimeArray[this._frameIndex]}}}drawTexture(t,i){t.graphics.clear(!0),t.graphics.drawImage(i.texture,i.offX,i.offY)}removeAniSprite(t){this._aniDic&&this._aniDic[t]&&(delete this._aniDic[t],this._spriteNum--,0==this._spriteNum&&i.ILaya.timer.clear(this,this.animate))}showDebugInfo(){var t=null;return this._spriteNum>0&&(t="TileTextureSet::gid:"+this.gid.toString()+" 动画数:"+this._spriteNum.toString()),t}clearAll(){this.gid=-1,this.texture&&(this.texture.destroy(),this.texture=null),this.offX=0,this.offY=0,this.textureArray=null,this.durationTimeArray=null,this.isAnimation=!1,this._spriteNum=0,this._aniDic=null,this._frameIndex=0,this._preFrameTime=0,this._time=0,this._interval=0}}class l{constructor(){this._tileTexSetArr=[],this._texArray=[],this._x=0,this._y=0,this._width=0,this._height=0,this._mapW=0,this._mapH=0,this._mapTileW=0,this._mapTileH=0,this._rect=new i.Rectangle,this._paddingRect=new i.Rectangle,this._mapSprite=null,this._layerArray=[],this._renderLayerArray=[],this._gridArray=[],this._showGridKey=!1,this._totalGridNum=0,this._gridW=0,this._gridH=0,this._gridWidth=450,this._gridHeight=450,this._jsonLoader=null,this._loader=null,this._tileSetArray=[],this._currTileSet=null,this._completeHandler=null,this._mapRect=new _,this._mapLastRect=new _,this._index=0,this._animationDic={},this._tileProperties={},this._tileProperties2={},this._orientation="orthogonal",this._renderOrder="right-down",this._colorArray=["FF","00","33","66"],this._scale=1,this._pivotScaleX=.5,this._pivotScaleY=.5,this._centerX=0,this._centerY=0,this._viewPortX=0,this._viewPortY=0,this._viewPortWidth=0,this._viewPortHeight=0,this._enableLinear=!0,this._limitRange=!1,this.autoCache=!0,this.autoCacheType="normal",this.enableMergeLayer=!1,this.removeCoveredTile=!1,this.showGridTextureCount=!1,this.antiCrack=!0,this.cacheAllAfterInit=!1,this._texutreStartDic={}}createMap(t,e,r,h=null,a=null,s=!0,l=!1){this._enableLinear=s,this._limitRange=l,this._rect.x=e.x,this._rect.y=e.y,this._rect.width=e.width,this._rect.height=e.height,this._viewPortWidth=e.width/this._scale,this._viewPortHeight=e.height/this._scale,this._completeHandler=r,h?this._paddingRect.copyFrom(h):this._paddingRect.setTo(0,0,0,0),a&&(this._gridWidth=a.x,this._gridHeight=a.y);var _=t.lastIndexOf("/");_>-1?(this._resPath=t.substr(0,_),this._pathArray=this._resPath.split("/")):(this._resPath="",this._pathArray=[]),this._jsonLoader=new i.Loader,this._jsonLoader.once("complete",this,this.onJsonComplete),this._jsonLoader.load(t,i.Loader.JSON,!1)}onJsonComplete(t){this._mapSprite=new i.Sprite,i.ILaya.stage.addChild(this._mapSprite);var e=this._jsonData=t;this._properties=e.properties,this._orientation=e.orientation,this._renderOrder=e.renderorder,this._mapW=e.width,this._mapH=e.height,this._mapTileW=e.tilewidth,this._mapTileH=e.tileheight,this._width=this._mapTileW*this._mapW,this._height=this._mapTileH*this._mapH,this._orientation==l.ORIENTATION_STAGGERED&&(this._height=(.5+.5*this._mapH)*this._mapTileH),this._mapLastRect.top=this._mapLastRect.bottom=this._mapLastRect.left=this._mapLastRect.right=-1;var r,h,a=e.tilesets,s=0;for(s=0;s<a.length;s++)if(r=a[s],(h=new n).init(r),!h.properties||!h.properties.ignore){this._tileProperties[s]=h.tileproperties,this.addTileProperties(h.tileproperties),this._tileSetArray.push(h);var _=r.tiles;if(_)for(var p in _){var m=_[p].animation;if(m){var d=new o;this._animationDic[p]=d,d.image=r.image;for(var g=0;g<m.length;g++){var c=m[g];d.mAniIdArray.push(c.tileid),d.mDurationTimeArray.push(c.duration)}}}}if(this._tileTexSetArr.push(null),this._tileSetArray.length>0){h=this._currTileSet=this._tileSetArray.shift(),this._loader=new i.Loader,this._loader.once("complete",this,this.onTextureComplete);var u=this.mergePath(this._resPath,h.image);this._loader.load(u,i.Loader.IMAGE,!1)}}mergePath(t,i){var e="",r=i.split("/"),h=0,a=0;for(a=r.length-1;a>=0;a--)".."==r[a]&&h++;if(0==h)return e=this._pathArray.length>0?t+"/"+i:i;var s=this._pathArray.length-h;for(s<0&&console.log("[error]path does not exist",this._pathArray,r,t,i),a=0;a<s;a++)0==a?e+=this._pathArray[a]:e=e+"/"+this._pathArray[a];for(a=h;a<r.length;a++)e=e+"/"+r[a];return e}onTextureComplete(t){this._jsonData;var e=t;this._enableLinear||(e.bitmap.minFifter=9728,e.bitmap.magFifter=9728),this._texArray.push(e);var r=this._currTileSet,h=r.tilewidth,a=r.tileheight,l=r.imagewidth,_=r.imageheight,o=(r.firstgid,Math.floor((l-r.margin-h)/(h+r.spacing))+1),n=Math.floor((_-r.margin-a)/(a+r.spacing))+1,p=null;this._texutreStartDic[r.image]=this._tileTexSetArr.length;for(var m=0;m<n;m++)for(var d=0;d<o;d++)(p=new s).offX=r.titleoffsetX,p.offY=r.titleoffsetY-(a-this._mapTileH),p.texture=i.Texture.createFromTexture(e,r.margin+(h+r.spacing)*d,r.margin+(a+r.spacing)*m,h,a),this.antiCrack&&this.adptTexture(p.texture),this._tileTexSetArr.push(p),p.gid=this._tileTexSetArr.length;if(this._tileSetArray.length>0){r=this._currTileSet=this._tileSetArray.shift(),this._loader.once("complete",this,this.onTextureComplete);var g=this.mergePath(this._resPath,r.image);this._loader.load(g,i.Loader.IMAGE,!1)}else this._currTileSet=null,this.initMap()}adptTexture(t){if(t){var i=t.uv[0],e=t.uv[2],r=t.uv[1],h=t.uv[7],a=1/t.bitmap.width,s=1/t.bitmap.height,l=t;l.uv[0]=l.uv[6]=i+a,l.uv[2]=l.uv[4]=e-a,l.uv[1]=l.uv[3]=r+s,l.uv[5]=l.uv[7]=h-s}}initMap(){var t,i;for(var e in this._animationDic){var r,h=this._animationDic[e];r=this._texutreStartDic[h.image];var s=this.getTexture(parseInt(e)+r);if(h.mAniIdArray.length>0){for(s.textureArray=[],s.durationTimeArray=h.mDurationTimeArray,s.isAnimation=!0,s.animationTotalTime=0,t=0,i=s.durationTimeArray.length;t<i;t++)s.animationTotalTime+=s.durationTimeArray[t];for(t=0,i=h.mAniIdArray.length;t<i;t++){var l=this.getTexture(h.mAniIdArray[t]+r);s.textureArray.push(l)}}}for(this._gridWidth=Math.floor(this._gridWidth/this._mapTileW)*this._mapTileW,this._gridHeight=Math.floor(this._gridHeight/this._mapTileH)*this._mapTileH,this._gridWidth<this._mapTileW&&(this._gridWidth=this._mapTileW),this._gridHeight<this._mapTileH&&(this._gridHeight=this._mapTileH),this._gridW=Math.ceil(this._width/this._gridWidth),this._gridH=Math.ceil(this._height/this._gridHeight),this._totalGridNum=this._gridW*this._gridH,t=0;t<this._gridH;t++){var _=[];this._gridArray.push(_);for(var o=0;o<this._gridW;o++)_.push(null)}for(var n,p,m,d=this._jsonData.layers,g=!0,c=0;c<d.length;c++){var u=d[c];if(1==u.visible){var f=new a;f.init(u,this),this.enableMergeLayer?(n=f.getLayerProperties("layer"),(g=g||!m||n!=p)?(g=!1,f.tarLayer=f,m=f,this._mapSprite.addChild(f),this._renderLayerArray.push(f)):f.tarLayer=m,p=n):(this._mapSprite.addChild(f),this._renderLayerArray.push(f)),this._layerArray.push(f)}}this.removeCoveredTile&&this.adptTiledMapData(),this.cacheAllAfterInit&&this.cacheAllGrid(),this.moveViewPort(this._rect.x,this._rect.y),null!=this._completeHandler&&this._completeHandler.run()}addTileProperties(t){var i;for(i in t)this._tileProperties2[i]=t[i]}getTileUserData(t,i,e=null){return this._tileProperties2&&this._tileProperties2[t]&&i in this._tileProperties2[t]?this._tileProperties2[t][i]:e}adptTiledMapData(){var t,i,e={};for(t=this._layerArray.length-1;t>=0;t--)(i=this._layerArray[t]._mapData)&&(this.removeCoverd(i,e),this.collectCovers(i,e,t))}removeCoverd(t,i){var e,r;for(r=t.length,e=0;e<r;e++)i[e]&&(t[e]=0)}collectCovers(t,i,e){var r,h,a;for(h=t.length,r=0;r<h;r++)(a=t[r])>0&&this.getTileUserData(a-1,"type",0)>0&&(i[r]=a)}getTexture(t){return t<this._tileTexSetArr.length?this._tileTexSetArr[t]:null}getMapProperties(t){return this._properties?this._properties[t]:null}getTileProperties(t,i,e){return this._tileProperties[t]&&this._tileProperties[t][i]?this._tileProperties[t][i][e]:null}getSprite(t,i,r){if(0<this._tileTexSetArr.length){var a=new e;a.initData(this,!0),a.size(i,r);var s=this._tileTexSetArr[t];if(null!=s&&null!=s.texture){if(s.isAnimation){var l=new h;this._index++,l.setTileTextureSet(this._index.toString(),s),a.addAniSprite(l),a.addChild(l)}else a.graphics.drawImage(s.texture,0,0,i,r);a.drawImageNum++}return a}return null}setViewPortPivotByScale(t,i){this._pivotScaleX=t,this._pivotScaleY=i}set scale(t){t<=0||(this._scale=t,this._viewPortWidth=this._rect.width/t,this._viewPortHeight=this._rect.height/t,this._mapSprite.scale(this._scale,this._scale),this.updateViewPort())}get scale(){return this._scale}moveViewPort(t,i){this._x=-t,this._y=-i,this._rect.x=t,this._rect.y=i,this.updateViewPort()}changeViewPort(t,i,e,r){t==this._rect.x&&i==this._rect.y&&e==this._rect.width&&r==this._rect.height||(this._x=-t,this._y=-i,this._rect.x=t,this._rect.y=i,this._rect.width=e,this._rect.height=r,this._viewPortWidth=e/this._scale,this._viewPortHeight=r/this._scale,this.updateViewPort())}changeViewPortBySize(t,e,r=null){return null==r&&(r=new i.Rectangle),this._centerX=this._rect.x+this._rect.width*this._pivotScaleX,this._centerY=this._rect.y+this._rect.height*this._pivotScaleY,r.x=this._centerX-t*this._pivotScaleX,r.y=this._centerY-e*this._pivotScaleY,r.width=t,r.height=e,this.changeViewPort(r.x,r.y,r.width,r.height),r}updateViewPort(){this._centerX=this._rect.x+this._rect.width*this._pivotScaleX,this._centerY=this._rect.y+this._rect.height*this._pivotScaleY;var t=!1,i=this._viewPortX;(this._viewPortX=this._centerX-this._rect.width*this._pivotScaleX/this._scale,i!=this._viewPortX?t=!0:i=this._viewPortY,this._viewPortY=this._centerY-this._rect.height*this._pivotScaleY/this._scale,t||i==this._viewPortY||(t=!0),this._limitRange)&&(this._viewPortX+this._viewPortWidth>this._width&&(this._viewPortX=this._width-this._viewPortWidth),this._viewPortY+this._viewPortHeight>this._height&&(this._viewPortY=this._height-this._viewPortHeight),this._viewPortX<0&&(this._viewPortX=0),this._viewPortY<0&&(this._viewPortY=0));var e=this._paddingRect;if(this._mapRect.top=Math.floor((this._viewPortY-e.y)/this._gridHeight),this._mapRect.bottom=Math.floor((this._viewPortY+this._viewPortHeight+e.height+e.y)/this._gridHeight),this._mapRect.left=Math.floor((this._viewPortX-e.x)/this._gridWidth),this._mapRect.right=Math.floor((this._viewPortX+this._viewPortWidth+e.width+e.x)/this._gridWidth),this._mapRect.top==this._mapLastRect.top&&this._mapRect.bottom==this._mapLastRect.bottom&&this._mapRect.left==this._mapLastRect.left&&this._mapRect.right==this._mapLastRect.right||(this.clipViewPort(),this._mapLastRect.top=this._mapRect.top,this._mapLastRect.bottom=this._mapRect.bottom,this._mapLastRect.left=this._mapRect.left,this._mapLastRect.right=this._mapRect.right,t=!0),t)for(var r,h=this._renderLayerArray.length,a=0;a<h;a++)(r=this._renderLayerArray[a])._gridSpriteArray.length>0&&r.updateGridPos()}clipViewPort(){var t,i,e=0,r=0;if(this._mapRect.left>this._mapLastRect.left){if((e=this._mapRect.left-this._mapLastRect.left)>0)for(i=this._mapLastRect.left;i<this._mapLastRect.left+e;i++)for(t=this._mapLastRect.top;t<=this._mapLastRect.bottom;t++)this.hideGrid(i,t)}else if((r=Math.min(this._mapLastRect.left,this._mapRect.right+1)-this._mapRect.left)>0)for(i=this._mapRect.left;i<this._mapRect.left+r;i++)for(t=this._mapRect.top;t<=this._mapRect.bottom;t++)this.showGrid(i,t);if(this._mapRect.right>this._mapLastRect.right){if((r=this._mapRect.right-this._mapLastRect.right)>0)for(i=Math.max(this._mapLastRect.right+1,this._mapRect.left);i<=this._mapLastRect.right+r;i++)for(t=this._mapRect.top;t<=this._mapRect.bottom;t++)this.showGrid(i,t)}else if((e=this._mapLastRect.right-this._mapRect.right)>0)for(i=this._mapRect.right+1;i<=this._mapRect.right+e;i++)for(t=this._mapLastRect.top;t<=this._mapLastRect.bottom;t++)this.hideGrid(i,t);if(this._mapRect.top>this._mapLastRect.top){if((e=this._mapRect.top-this._mapLastRect.top)>0)for(t=this._mapLastRect.top;t<this._mapLastRect.top+e;t++)for(i=this._mapLastRect.left;i<=this._mapLastRect.right;i++)this.hideGrid(i,t)}else if((r=Math.min(this._mapLastRect.top,this._mapRect.bottom+1)-this._mapRect.top)>0)for(t=this._mapRect.top;t<this._mapRect.top+r;t++)for(i=this._mapRect.left;i<=this._mapRect.right;i++)this.showGrid(i,t);if(this._mapRect.bottom>this._mapLastRect.bottom){if((r=this._mapRect.bottom-this._mapLastRect.bottom)>0)for(t=Math.max(this._mapLastRect.bottom+1,this._mapRect.top);t<=this._mapLastRect.bottom+r;t++)for(i=this._mapRect.left;i<=this._mapRect.right;i++)this.showGrid(i,t)}else if((e=this._mapLastRect.bottom-this._mapRect.bottom)>0)for(t=this._mapRect.bottom+1;t<=this._mapRect.bottom+e;t++)for(i=this._mapLastRect.left;i<=this._mapLastRect.right;i++)this.hideGrid(i,t)}showGrid(t,i){if(!(t<0||t>=this._gridW||i<0||i>=this._gridH)){var e,r,h=this._gridArray[i][t];if(null==h)h=this.getGridArray(t,i);else for(e=0;e<h.length&&e<this._layerArray.length;e++){this._layerArray[e]&&h[e]&&0==(r=h[e]).visible&&r.drawImageNum>0&&r.show()}}}cacheAllGrid(){var t,i,e;for(t=0;t<this._gridW;t++)for(i=0;i<this._gridH;i++)e=this.getGridArray(t,i),this.cacheGridsArray(e)}cacheGridsArray(t){var e,r,h,a;if(!l._tempCanvas){l._tempCanvas=new i.HTMLCanvas;var s=l._tempCanvas.context;s||(s=l._tempCanvas.getContext("2d"))}for((e=l._tempCanvas).context.asBitmap=!1,h=t.length,r=0;r<h;r++)a=t[r],e.clear(),e.size(1,1),a.render(e.context,0,0),a.hide();e.clear(),e.size(1,1)}getGridArray(t,i){var e,r,h,a=this._gridArray[i][t];if(null==a){a=this._gridArray[i][t]=[];var s=0,_=0,o=0,n=0,p=this._gridWidth,m=this._gridHeight;switch(this.orientation){case l.ORIENTATION_ISOMETRIC:var d,g,c,u;s=Math.floor(t*p),_=Math.floor(t*p+p),o=Math.floor(i*m),n=Math.floor(i*m+m);break;case l.ORIENTATION_STAGGERED:s=Math.floor(t*p/this._mapTileW),_=Math.floor((t*p+p)/this._mapTileW),o=Math.floor(i*m/(this._mapTileH/2)),n=Math.floor((i*m+m)/(this._mapTileH/2));break;case l.ORIENTATION_ORTHOGONAL:s=Math.floor(t*p/this._mapTileW),_=Math.floor((t*p+p)/this._mapTileW),o=Math.floor(i*m/this._mapTileH),n=Math.floor((i*m+m)/this._mapTileH);break;case l.ORIENTATION_HEXAGONAL:var f=2*this._mapTileH/3;s=Math.floor(t*p/this._mapTileW),_=Math.ceil((t*p+p)/this._mapTileW),o=Math.floor(i*m/f),n=Math.ceil((i*m+m)/f)}for(var T,y,A=null,v=0;v<this._layerArray.length;v++){var w;switch(A=this._layerArray[v],this.enableMergeLayer?(A.tarLayer!=y&&(T=null,y=A.tarLayer),T||(T=y.getDrawSprite(t,i),a.push(T)),h=T):(h=A.getDrawSprite(t,i),a.push(h)),this._showGridKey&&(w="#",w+=this._colorArray[Math.floor(Math.random()*this._colorArray.length)],w+=this._colorArray[Math.floor(Math.random()*this._colorArray.length)],w+=this._colorArray[Math.floor(Math.random()*this._colorArray.length)]),this.orientation){case l.ORIENTATION_ISOMETRIC:var R=this.tileHeight/2,x=this.tileWidth/2,H=this._width/2;c=Math.floor(o/R),u=Math.floor(n/R),d=this._mapW+Math.floor((s-H)/x),g=this._mapW+Math.floor((_-H)/x);this._mapW;var N=2*this._mapH;for(c<0&&(c=0),c>=N&&(c=N-1),u<0&&(n=0),u>=N&&(u=N-1),h.zOrder=this._totalGridNum*v+i*this._gridW+t,e=c;e<u;e++)for(r=0;r<=e;r++){var S=e-r,O=r,I=S-O+this._mapW;I>d&&I<=g&&A.drawTileTexture(h,S,O)&&h.drawImageNum++}break;case l.ORIENTATION_STAGGERED:for(h.zOrder=v*this._totalGridNum+i*this._gridW+t,e=o;e<n;e++)for(r=s;r<_;r++)A.drawTileTexture(h,r,e)&&h.drawImageNum++;break;case l.ORIENTATION_ORTHOGONAL:case l.ORIENTATION_HEXAGONAL:switch(this._renderOrder){case l.RENDERORDER_RIGHTDOWN:for(h.zOrder=v*this._totalGridNum+i*this._gridW+t,e=o;e<n;e++)for(r=s;r<_;r++)A.drawTileTexture(h,r,e)&&h.drawImageNum++;break;case l.RENDERORDER_RIGHTUP:for(h.zOrder=v*this._totalGridNum+(this._gridH-1-i)*this._gridW+t,e=n-1;e>=o;e--)for(r=s;r<_;r++)A.drawTileTexture(h,r,e)&&h.drawImageNum++;break;case l.RENDERORDER_LEFTDOWN:for(h.zOrder=v*this._totalGridNum+i*this._gridW+(this._gridW-1-t),e=o;e<n;e++)for(r=_-1;r>=s;r--)A.drawTileTexture(h,r,e)&&h.drawImageNum++;break;case l.RENDERORDER_LEFTUP:for(h.zOrder=v*this._totalGridNum+(this._gridH-1-i)*this._gridW+(this._gridW-1-t),e=n-1;e>=o;e--)for(r=_-1;r>=s;r--)A.drawTileTexture(h,r,e)&&h.drawImageNum++}}h.isHaveAnimation||(h.autoSize=!0,this.autoCache&&(h.cacheAs=this.autoCacheType),h.autoSize=!1),this.enableMergeLayer?T&&T.drawImageNum>0&&y&&y.addChild(T):(h.drawImageNum>0&&A.addChild(h),this._showGridKey&&h.graphics.drawRect(0,0,p,m,null,w))}this.enableMergeLayer&&this.showGridTextureCount&&T&&T.graphics.fillText(T.drawImageNum+"",20,20,null,"#ff0000","left")}return a}hideGrid(t,i){if(!(t<0||t>=this._gridW||i<0||i>=this._gridH)){var e=this._gridArray[i][t];if(e)for(var r,h=0;h<e.length;h++)(r=e[h]).drawImageNum>0&&null!=r&&r.hide()}}getLayerObject(t,i){for(var e=null,r=0;r<this._layerArray.length&&(e=this._layerArray[r]).layerName!=t;r++);return e?e.getObjectByName(i):null}destroy(){this._orientation=l.ORIENTATION_ORTHOGONAL,this._jsonData=null;var t,i=0;for(this._gridArray=[],i=0;i<this._tileTexSetArr.length;i++)(t=this._tileTexSetArr[i])&&t.clearAll();for(this._tileTexSetArr=[],i=0;i<this._texArray.length;i++)this._texArray[i].destroy();for(this._texArray=[],this._width=0,this._height=0,this._mapW=0,this._mapH=0,this._mapTileW=0,this._mapTileH=0,this._rect.setTo(0,0,0,0),i=0;i<this._layerArray.length;i++)this._layerArray[i].clearAll();this._layerArray=[],this._renderLayerArray=[],this._mapSprite&&(this._mapSprite.destroy(),this._mapSprite=null),this._jsonLoader=null,this._loader=null;var e=this._animationDic;for(var r in e)delete e[r];for(r in this._properties=null,e=this._tileProperties)delete e[r];this._currTileSet=null,this._completeHandler=null,this._mapRect.clearAll(),this._mapLastRect.clearAll(),this._tileSetArray=[],this._gridWidth=450,this._gridHeight=450,this._gridW=0,this._gridH=0,this._x=0,this._y=0,this._index=0,this._enableLinear=!0,this._resPath=null,this._pathArray=null}get tileWidth(){return this._mapTileW}get tileHeight(){return this._mapTileH}get width(){return this._width}get height(){return this._height}get numColumnsTile(){return this._mapW}get numRowsTile(){return this._mapH}get viewPortX(){return-this._viewPortX}get viewPortY(){return-this._viewPortY}get viewPortWidth(){return this._viewPortWidth}get viewPortHeight(){return this._viewPortHeight}get x(){return this._x}get y(){return this._y}get gridWidth(){return this._gridWidth}get gridHeight(){return this._gridHeight}get numColumnsGrid(){return this._gridW}get numRowsGrid(){return this._gridH}get orientation(){return this._orientation}get renderOrder(){return this._renderOrder}mapSprite(){return this._mapSprite}getLayerByName(t){for(var i,e=0;e<this._layerArray.length;e++)if(t==(i=this._layerArray[e]).layerName)return i;return null}getLayerByIndex(t){return t<this._layerArray.length?this._layerArray[t]:null}}l.ORIENTATION_ORTHOGONAL="orthogonal",l.ORIENTATION_ISOMETRIC="isometric",l.ORIENTATION_STAGGERED="staggered",l.ORIENTATION_HEXAGONAL="hexagonal",l.RENDERORDER_RIGHTDOWN="right-down",l.RENDERORDER_RIGHTUP="right-up",l.RENDERORDER_LEFTDOWN="left-down",l.RENDERORDER_LEFTUP="left-up";class _{clearAll(){this.left=this.top=this.right=this.bottom=0}}class o{constructor(){this.mAniIdArray=[],this.mDurationTimeArray=[],this.mTileTexSetArr=[]}}class n{constructor(){this.firstgid=0,this.image="",this.imageheight=0,this.imagewidth=0,this.margin=0,this.name=0,this.spacing=0,this.tileheight=0,this.tilewidth=0,this.titleoffsetX=0,this.titleoffsetY=0}init(t){this.firstgid=t.firstgid,this.image=t.image,this.imageheight=t.imageheight,this.imagewidth=t.imagewidth,this.margin=t.margin,this.name=t.name,this.properties=t.properties,this.spacing=t.spacing,this.tileheight=t.tileheight,this.tilewidth=t.tilewidth,this.tileproperties=t.tileproperties;var i=t.tileoffset;i&&(this.titleoffsetX=i.x,this.titleoffsetY=i.y)}}r.TiledMap=l,t.GridSprite=e,t.IMap=r,t.MapLayer=a,t.TileAniSprite=h,t.TileTexSet=s,t.TiledMap=l}(window.Laya=window.Laya||{},Laya);