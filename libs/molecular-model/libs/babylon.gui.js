var re=Object.assign;var Xt=(kt,Mt,ct)=>new Promise((ot,Et)=>{var C=s=>{try{n(ct.next(s))}catch(r){Et(r)}},v=s=>{try{n(ct.throw(s))}catch(r){Et(r)}},n=s=>s.done?ot(s.value):Promise.resolve(s.value).then(C,v);n((ct=ct.apply(kt,Mt)).next())});(function(Mt,ct){typeof exports=="object"&&typeof module=="object"?module.exports=ct(require("babylonjs")):typeof define=="function"&&define.amd?define("babylonjs-gui",["babylonjs"],ct):typeof exports=="object"?exports["babylonjs-gui"]=ct(require("babylonjs")):(Mt.BABYLON=Mt.BABYLON||{},Mt.BABYLON.GUI=ct(Mt.BABYLON))})(typeof self!="undefined"?self:typeof global!="undefined"?global:this,kt=>(()=>{"use strict";var Mt={"../../../dev/gui/dist/2D/adtInstrumentation.js":(C,v,n)=>{n.r(v),n.d(v,{AdvancedDynamicTextureInstrumentation:()=>p});var s=n("core/Misc/observable"),r=n.n(s);class p{get renderTimeCounter(){return this._renderTime}get layoutTimeCounter(){return this._layoutTime}get captureRenderTime(){return this._captureRenderTime}set captureRenderTime(g){g!==this._captureRenderTime&&(this._captureRenderTime=g,g?(this._onBeginRenderObserver=this.texture.onBeginRenderObservable.add(()=>{this._renderTime.beginMonitoring()}),this._onEndRenderObserver=this.texture.onEndRenderObservable.add(()=>{this._renderTime.endMonitoring(!0)})):(this.texture.onBeginRenderObservable.remove(this._onBeginRenderObserver),this._onBeginRenderObserver=null,this.texture.onEndRenderObservable.remove(this._onEndRenderObserver),this._onEndRenderObserver=null))}get captureLayoutTime(){return this._captureLayoutTime}set captureLayoutTime(g){g!==this._captureLayoutTime&&(this._captureLayoutTime=g,g?(this._onBeginLayoutObserver=this.texture.onBeginLayoutObservable.add(()=>{this._layoutTime.beginMonitoring()}),this._onEndLayoutObserver=this.texture.onEndLayoutObservable.add(()=>{this._layoutTime.endMonitoring(!0)})):(this.texture.onBeginLayoutObservable.remove(this._onBeginLayoutObserver),this._onBeginLayoutObserver=null,this.texture.onEndLayoutObservable.remove(this._onEndLayoutObserver),this._onEndLayoutObserver=null))}constructor(g){this.texture=g,this._captureRenderTime=!1,this._renderTime=new s.PerfCounter,this._captureLayoutTime=!1,this._layoutTime=new s.PerfCounter,this._onBeginRenderObserver=null,this._onEndRenderObserver=null,this._onBeginLayoutObserver=null,this._onEndLayoutObserver=null}dispose(){this.texture.onBeginRenderObservable.remove(this._onBeginRenderObserver),this._onBeginRenderObserver=null,this.texture.onEndRenderObservable.remove(this._onEndRenderObserver),this._onEndRenderObserver=null,this.texture.onBeginLayoutObservable.remove(this._onBeginLayoutObserver),this._onBeginLayoutObserver=null,this.texture.onEndLayoutObservable.remove(this._onEndLayoutObserver),this._onEndLayoutObserver=null,this.texture=null}}},"../../../dev/gui/dist/2D/advancedDynamicTexture.js":(C,v,n)=>{n.r(v),n.d(v,{AdvancedDynamicTexture:()=>e});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/2D/controls/container.js"),f=n("../../../dev/gui/dist/2D/controls/control.js"),g=n("../../../dev/gui/dist/2D/style.js"),d=n("../../../dev/gui/dist/2D/measure.js");class e extends s.DynamicTexture{get numLayoutCalls(){return this._numLayoutCalls}get numRenderCalls(){return this._numRenderCalls}get renderScale(){return this._renderScale}set renderScale(t){t!==this._renderScale&&(this._renderScale=t,this._onResize())}get background(){return this._background}set background(t){this._background!==t&&(this._background=t,this.markAsDirty())}get idealWidth(){return this._idealWidth}set idealWidth(t){this._idealWidth!==t&&(this._idealWidth=t,this.markAsDirty(),this._rootContainer._markAllAsDirty())}get idealHeight(){return this._idealHeight}set idealHeight(t){this._idealHeight!==t&&(this._idealHeight=t,this.markAsDirty(),this._rootContainer._markAllAsDirty())}get useSmallestIdeal(){return this._useSmallestIdeal}set useSmallestIdeal(t){this._useSmallestIdeal!==t&&(this._useSmallestIdeal=t,this.markAsDirty(),this._rootContainer._markAllAsDirty())}get renderAtIdealSize(){return this._renderAtIdealSize}set renderAtIdealSize(t){this._renderAtIdealSize!==t&&(this._renderAtIdealSize=t,this._onResize())}get idealRatio(){let t=0,i=0;return this._idealWidth&&(t=this.getSize().width/this._idealWidth),this._idealHeight&&(i=this.getSize().height/this._idealHeight),this._useSmallestIdeal&&this._idealWidth&&this._idealHeight?window.innerWidth<window.innerHeight?t:i:this._idealWidth?t:this._idealHeight?i:1}get layer(){return this._layerToDispose}get rootContainer(){return this._rootContainer}getChildren(){return[this._rootContainer]}getDescendants(t,i){return this._rootContainer.getDescendants(t,i)}getControlsByType(t){return this._rootContainer.getDescendants(!1,i=>i.typeName===t)}getControlByName(t){return this._getControlByKey("name",t)}_getControlByKey(t,i){return this._rootContainer.getDescendants().find(o=>o[t]===i)||null}get focusedControl(){return this._focusedControl}set focusedControl(t){this._focusedControl!=t&&(this._focusedControl&&this._focusedControl.onBlur(),t&&t.onFocus(),this._focusedControl=t)}get isForeground(){return this.layer?!this.layer.isBackground:!0}set isForeground(t){!this.layer||this.layer.isBackground!==!t&&(this.layer.isBackground=!t)}get clipboardData(){return this._clipboardData}set clipboardData(t){this._clipboardData=t}constructor(t,i=0,o=0,a,l=!1,c=s.Texture.NEAREST_SAMPLINGMODE,h=!0){super(t,{width:i,height:o},a,l,c,s.Constants.TEXTUREFORMAT_RGBA,h);this.onGuiReadyObservable=new s.Observable,this._isDirty=!1,this._rootContainer=new p.Container("root"),this._lastControlOver={},this._lastControlDown={},this._capturingControl={},this._linkedControls=new Array,this._isFullscreen=!1,this._fullscreenViewport=new s.Viewport(0,0,1,1),this._idealWidth=0,this._idealHeight=0,this._useSmallestIdeal=!1,this._renderAtIdealSize=!1,this._blockNextFocusCheck=!1,this._renderScale=1,this._cursorChanged=!1,this._defaultMousePointerId=0,this._rootChildrenHaveChanged=!1,this._capturedPointerIds=new Set,this._numLayoutCalls=0,this._numRenderCalls=0,this._clipboardData="",this.onClipboardObservable=new s.Observable,this.onControlPickedObservable=new s.Observable,this.onBeginLayoutObservable=new s.Observable,this.onEndLayoutObservable=new s.Observable,this.onBeginRenderObservable=new s.Observable,this.onEndRenderObservable=new s.Observable,this.premulAlpha=!1,this.applyYInversionOnUpdate=!0,this.checkPointerEveryFrame=!1,this._useInvalidateRectOptimization=!0,this._invalidatedRectangle=null,this._clearMeasure=new d.Measure(0,0,0,0),this._onClipboardCopy=u=>{const m=u,b=new s.ClipboardInfo(s.ClipboardEventTypes.COPY,m);this.onClipboardObservable.notifyObservers(b),m.preventDefault()},this._onClipboardCut=u=>{const m=u,b=new s.ClipboardInfo(s.ClipboardEventTypes.CUT,m);this.onClipboardObservable.notifyObservers(b),m.preventDefault()},this._onClipboardPaste=u=>{const m=u,b=new s.ClipboardInfo(s.ClipboardEventTypes.PASTE,m);this.onClipboardObservable.notifyObservers(b),m.preventDefault()},this.parseContent=this.parseSerializedObject,a=this.getScene(),!(!a||!this._texture)&&(this.applyYInversionOnUpdate=h,this._rootElement=a.getEngine().getInputElement(),this._renderObserver=a.onBeforeCameraRenderObservable.add(u=>this._checkUpdate(u)),this._controlAddedObserver=this._rootContainer.onControlAddedObservable.add(u=>{u&&(this._rootChildrenHaveChanged=!0)}),this._controlRemovedObserver=this._rootContainer.onControlRemovedObservable.add(u=>{u&&(this._rootChildrenHaveChanged=!0)}),this._preKeyboardObserver=a.onPreKeyboardObservable.add(u=>{!this._focusedControl||(u.type===s.KeyboardEventTypes.KEYDOWN&&this._focusedControl.processKeyboard(u.event),u.skipOnPointerObservable=!0)}),this._rootContainer._link(this),this.hasAlpha=!0,(!i||!o)&&(this._resizeObserver=a.getEngine().onResizeObservable.add(()=>this._onResize()),this._onResize()),this._texture.isReady=!0)}getClassName(){return"AdvancedDynamicTexture"}executeOnAllControls(t,i){i||(i=this._rootContainer),t(i);for(const o of i.children){if(o.children){this.executeOnAllControls(t,o);continue}t(o)}}get useInvalidateRectOptimization(){return this._useInvalidateRectOptimization}set useInvalidateRectOptimization(t){this._useInvalidateRectOptimization=t}invalidateRect(t,i,o,a){if(!!this._useInvalidateRectOptimization)if(!this._invalidatedRectangle)this._invalidatedRectangle=new d.Measure(t,i,o-t+1,a-i+1);else{const l=Math.ceil(Math.max(this._invalidatedRectangle.left+this._invalidatedRectangle.width-1,o)),c=Math.ceil(Math.max(this._invalidatedRectangle.top+this._invalidatedRectangle.height-1,a));this._invalidatedRectangle.left=Math.floor(Math.min(this._invalidatedRectangle.left,t)),this._invalidatedRectangle.top=Math.floor(Math.min(this._invalidatedRectangle.top,i)),this._invalidatedRectangle.width=l-this._invalidatedRectangle.left+1,this._invalidatedRectangle.height=c-this._invalidatedRectangle.top+1}}markAsDirty(){this._isDirty=!0}createStyle(){return new g.Style(this)}addControl(t){return this._rootContainer.addControl(t),this}removeControl(t){return this._rootContainer.removeControl(t),this}moveToNonOverlappedPosition(t,i=1,o=1){let a;if(Array.isArray(t))a=t;else{const l=this.getDescendants(!0);a=t===void 0?l.filter(c=>c.overlapGroup!==void 0):l.filter(c=>c.overlapGroup===t)}a.forEach(l=>{var u;let c=s.Vector2.Zero();const h=new s.Vector2(l.centerX,l.centerY);a.forEach(m=>{if(l!==m&&e._Overlaps(l,m)){const b=h.subtract(new s.Vector2(m.centerX,m.centerY)),P=b.length();P>0&&(c=c.add(b.normalize().scale(o/P)))}}),c.length()>0&&(c=c.normalize().scale(i*((u=l.overlapDeltaMultiplier)!=null?u:1)),l.linkOffsetXInPixels+=c.x,l.linkOffsetYInPixels+=c.y)})}dispose(){const t=this.getScene();!t||(this._rootElement=null,t.onBeforeCameraRenderObservable.remove(this._renderObserver),this._resizeObserver&&t.getEngine().onResizeObservable.remove(this._resizeObserver),this._prePointerObserver&&t.onPrePointerObservable.remove(this._prePointerObserver),this._sceneRenderObserver&&t.onBeforeRenderObservable.remove(this._sceneRenderObserver),this._pointerObserver&&t.onPointerObservable.remove(this._pointerObserver),this._preKeyboardObserver&&t.onPreKeyboardObservable.remove(this._preKeyboardObserver),this._canvasPointerOutObserver&&t.getEngine().onCanvasPointerOutObservable.remove(this._canvasPointerOutObserver),this._canvasBlurObserver&&t.getEngine().onCanvasBlurObservable.remove(this._canvasBlurObserver),this._controlAddedObserver&&this._rootContainer.onControlAddedObservable.remove(this._controlAddedObserver),this._controlRemovedObserver&&this._rootContainer.onControlRemovedObservable.remove(this._controlRemovedObserver),this._layerToDispose&&(this._layerToDispose.texture=null,this._layerToDispose.dispose(),this._layerToDispose=null),this._rootContainer.dispose(),this.onClipboardObservable.clear(),this.onControlPickedObservable.clear(),this.onBeginRenderObservable.clear(),this.onEndRenderObservable.clear(),this.onBeginLayoutObservable.clear(),this.onEndLayoutObservable.clear(),this.onGuiReadyObservable.clear(),super.dispose())}_onResize(){const t=this.getScene();if(!t)return;const i=t.getEngine(),o=this.getSize();let a=i.getRenderWidth()*this._renderScale,l=i.getRenderHeight()*this._renderScale;this._renderAtIdealSize&&(this._idealWidth?(l=l*this._idealWidth/a,a=this._idealWidth):this._idealHeight&&(a=a*this._idealHeight/l,l=this._idealHeight)),(o.width!==a||o.height!==l)&&(this.scaleTo(a,l),this.markAsDirty(),(this._idealWidth||this._idealHeight)&&this._rootContainer._markAllAsDirty()),this.invalidateRect(0,0,o.width-1,o.height-1)}_getGlobalViewport(){const t=this.getSize(),i=this._fullscreenViewport.toGlobal(t.width,t.height),o=Math.round(i.width*(1/this.rootContainer.scaleX)),a=Math.round(i.height*(1/this.rootContainer.scaleY));return i.x+=(i.width-o)/2,i.y+=(i.height-a)/2,i.width=o,i.height=a,i}getProjectedPosition(t,i){const o=this.getProjectedPositionWithZ(t,i);return new s.Vector2(o.x,o.y)}getProjectedPositionWithZ(t,i){const o=this.getScene();if(!o)return s.Vector3.Zero();const a=this._getGlobalViewport(),l=s.Vector3.Project(t,i,o.getTransformMatrix(),a);return new s.Vector3(l.x,l.y,l.z)}_checkUpdate(t,i){if(!(this._layerToDispose&&(t.layerMask&this._layerToDispose.layerMask)==0)){if(this._isFullscreen&&this._linkedControls.length){const o=this.getScene();if(!o)return;const a=this._getGlobalViewport();for(const l of this._linkedControls){if(!l.isVisible)continue;const c=l._linkedMesh;if(!c||c.isDisposed()){s.Tools.SetImmediate(()=>{l.linkWithMesh(null)});continue}const h=c.getBoundingInfo?c.getBoundingInfo().boundingSphere.center:s.Vector3.ZeroReadOnly,u=s.Vector3.Project(h,c.getWorldMatrix(),o.getTransformMatrix(),a);if(u.z<0||u.z>1){l.notRenderable=!0;continue}l.notRenderable=!1,this.useInvalidateRectOptimization&&l.invalidateRect(),l._moveToProjectedPosition(u)}}!this._isDirty&&!this._rootContainer.isDirty||(this._isDirty=!1,this._render(i),i||this.update(this.applyYInversionOnUpdate,this.premulAlpha,e.AllowGPUOptimizations))}}_render(t){var h;const i=this.getSize(),o=i.width,a=i.height,l=this.getContext();if(l.font="18px Arial",l.strokeStyle="white",this.onGuiReadyObservable.hasObservers()&&this._checkGuiIsReady(),this._rootChildrenHaveChanged){const u=(h=this.getScene())==null?void 0:h.activeCamera;u&&(this._rootChildrenHaveChanged=!1,this._checkUpdate(u,!0))}this.onBeginLayoutObservable.notifyObservers(this);const c=new d.Measure(0,0,o,a);this._numLayoutCalls=0,this._rootContainer._layout(c,l),this.onEndLayoutObservable.notifyObservers(this),this._isDirty=!1,!t&&(this._invalidatedRectangle?this._clearMeasure.copyFrom(this._invalidatedRectangle):this._clearMeasure.copyFromFloats(0,0,o,a),l.clearRect(this._clearMeasure.left,this._clearMeasure.top,this._clearMeasure.width,this._clearMeasure.height),this._background&&(l.save(),l.fillStyle=this._background,l.fillRect(this._clearMeasure.left,this._clearMeasure.top,this._clearMeasure.width,this._clearMeasure.height),l.restore()),this.onBeginRenderObservable.notifyObservers(this),this._numRenderCalls=0,this._rootContainer._render(l,this._invalidatedRectangle),this.onEndRenderObservable.notifyObservers(this),this._invalidatedRectangle=null)}_changeCursor(t){this._rootElement&&(this._rootElement.style.cursor=t,this._cursorChanged=!0)}_registerLastControlDown(t,i){this._lastControlDown[i]=t,this.onControlPickedObservable.notifyObservers(t)}_doPicking(t,i,o,a,l,c,h,u){const m=this.getScene();if(!m)return;const b=m.getEngine(),P=this.getSize();if(this._isFullscreen){const B=m.cameraToUseForPointers||m.activeCamera;if(!B)return;const I=B.viewport;t=t*(P.width/(b.getRenderWidth()*I.width)),i=i*(P.height/(b.getRenderHeight()*I.height))}if(this._capturingControl[l]){this._capturingControl[l].isPointerBlocker&&(this._shouldBlockPointer=!0),this._capturingControl[l]._processObservables(a,t,i,o,l,c);return}this._cursorChanged=!1,this._rootContainer._processPicking(t,i,o,a,l,c,h,u)||(m.doNotHandleCursors||this._changeCursor(""),a===s.PointerEventTypes.POINTERMOVE&&this._lastControlOver[l]&&(this._lastControlOver[l]._onPointerOut(this._lastControlOver[l],o),delete this._lastControlOver[l])),!this._cursorChanged&&!m.doNotHandleCursors&&this._changeCursor(""),this._manageFocus()}_cleanControlAfterRemovalFromList(t,i){for(const o in t){if(!Object.prototype.hasOwnProperty.call(t,o))continue;t[o]===i&&delete t[o]}}_cleanControlAfterRemoval(t){this._cleanControlAfterRemovalFromList(this._lastControlDown,t),this._cleanControlAfterRemovalFromList(this._lastControlOver,t)}pick(t,i,o=null){this._isFullscreen&&this._scene&&this._translateToPicking(this._scene,new s.Viewport(0,0,0,0),o,t,i)}_translateToPicking(t,i,o,a=t.pointerX,l=t.pointerY){const c=t.cameraToUseForPointers||t.activeCamera,h=t.getEngine(),u=t.cameraToUseForPointers;if(!c)i.x=0,i.y=0,i.width=h.getRenderWidth(),i.height=h.getRenderHeight();else if(c.rigCameras.length){const P=new s.Viewport(0,0,1,1);c.rigCameras.forEach(B=>{B.viewport.toGlobalToRef(h.getRenderWidth(),h.getRenderHeight(),P);const I=a/h.getHardwareScalingLevel()-P.x,x=l/h.getHardwareScalingLevel()-(h.getRenderHeight()-P.y-P.height);I<0||x<0||a>P.width||l>P.height||(t.cameraToUseForPointers=B,i.x=P.x,i.y=P.y,i.width=P.width,i.height=P.height)})}else c.viewport.toGlobalToRef(h.getRenderWidth(),h.getRenderHeight(),i);const m=a/h.getHardwareScalingLevel()-i.x,b=l/h.getHardwareScalingLevel()-(h.getRenderHeight()-i.y-i.height);if(this._shouldBlockPointer=!1,o){const P=o.event.pointerId||this._defaultMousePointerId;this._doPicking(m,b,o,o.type,P,o.event.button,o.event.deltaX,o.event.deltaY),(this._shouldBlockPointer||this._capturingControl[P])&&(o.skipOnPointerObservable=!0)}else this._doPicking(m,b,null,s.PointerEventTypes.POINTERMOVE,this._defaultMousePointerId,0);t.cameraToUseForPointers=u}attach(){const t=this.getScene();if(!t)return;const i=new s.Viewport(0,0,0,0);this._prePointerObserver=t.onPrePointerObservable.add(o=>{if(!(t.isPointerCaptured(o.event.pointerId)&&o.type===s.PointerEventTypes.POINTERUP&&!this._capturedPointerIds.has(o.event.pointerId))&&!(o.type!==s.PointerEventTypes.POINTERMOVE&&o.type!==s.PointerEventTypes.POINTERUP&&o.type!==s.PointerEventTypes.POINTERDOWN&&o.type!==s.PointerEventTypes.POINTERWHEEL)){if(o.type===s.PointerEventTypes.POINTERMOVE){if(t.isPointerCaptured(o.event.pointerId))return;o.event.pointerId&&(this._defaultMousePointerId=o.event.pointerId)}this._translateToPicking(t,i,o)}}),this._attachPickingToSceneRender(t,()=>this._translateToPicking(t,i,null),!1),this._attachToOnPointerOut(t),this._attachToOnBlur(t)}registerClipboardEvents(){self.addEventListener("copy",this._onClipboardCopy,!1),self.addEventListener("cut",this._onClipboardCut,!1),self.addEventListener("paste",this._onClipboardPaste,!1)}unRegisterClipboardEvents(){self.removeEventListener("copy",this._onClipboardCopy),self.removeEventListener("cut",this._onClipboardCut),self.removeEventListener("paste",this._onClipboardPaste)}_transformUvs(t){const i=this.getTextureMatrix();let o;if(i.isIdentityAs3x2())o=t;else{const a=s.TmpVectors.Matrix[0];i.getRowToRef(0,s.TmpVectors.Vector4[0]),i.getRowToRef(1,s.TmpVectors.Vector4[1]),i.getRowToRef(2,s.TmpVectors.Vector4[2]);const l=s.TmpVectors.Vector4[0],c=s.TmpVectors.Vector4[1],h=s.TmpVectors.Vector4[2];a.setRowFromFloats(0,l.x,l.y,0,0),a.setRowFromFloats(1,c.x,c.y,0,0),a.setRowFromFloats(2,0,0,1,0),a.setRowFromFloats(3,h.x,h.y,0,1),o=s.TmpVectors.Vector2[0],s.Vector2.TransformToRef(t,a,o)}if((this.wrapU===s.Texture.WRAP_ADDRESSMODE||this.wrapU===s.Texture.MIRROR_ADDRESSMODE)&&o.x>1){let a=o.x-Math.trunc(o.x);this.wrapU===s.Texture.MIRROR_ADDRESSMODE&&Math.trunc(o.x)%2==1&&(a=1-a),o.x=a}if((this.wrapV===s.Texture.WRAP_ADDRESSMODE||this.wrapV===s.Texture.MIRROR_ADDRESSMODE)&&o.y>1){let a=o.y-Math.trunc(o.y);this.wrapV===s.Texture.MIRROR_ADDRESSMODE&&Math.trunc(o.x)%2==1&&(a=1-a),o.y=a}return o}attachToMesh(t,i=!0){const o=this.getScene();!o||(this._pointerObserver&&o.onPointerObservable.remove(this._pointerObserver),this._pointerObserver=o.onPointerObservable.add(a=>{if(a.type!==s.PointerEventTypes.POINTERMOVE&&a.type!==s.PointerEventTypes.POINTERUP&&a.type!==s.PointerEventTypes.POINTERDOWN&&a.type!==s.PointerEventTypes.POINTERWHEEL)return;a.type===s.PointerEventTypes.POINTERMOVE&&a.event.pointerId&&(this._defaultMousePointerId=a.event.pointerId);const l=a.event.pointerId||this._defaultMousePointerId;if(a.pickInfo&&a.pickInfo.hit&&a.pickInfo.pickedMesh===t){let c=a.pickInfo.getTextureCoordinates();if(c){c=this._transformUvs(c);const h=this.getSize();this._doPicking(c.x*h.width,(this.applyYInversionOnUpdate?1-c.y:c.y)*h.height,a,a.type,l,a.event.button,a.event.deltaX,a.event.deltaY)}}else if(a.type===s.PointerEventTypes.POINTERUP){if(this._lastControlDown[l]&&this._lastControlDown[l]._forcePointerUp(l),delete this._lastControlDown[l],this.focusedControl){const c=this.focusedControl.keepsFocusWith();let h=!0;if(c)for(const u of c){if(this===u._host)continue;const m=u._host;if(m._lastControlOver[l]&&m._lastControlOver[l].isAscendant(u)){h=!1;break}}h&&(this.focusedControl=null)}}else a.type===s.PointerEventTypes.POINTERMOVE&&(this._lastControlOver[l]&&this._lastControlOver[l]._onPointerOut(this._lastControlOver[l],a,!0),delete this._lastControlOver[l])}),t.enablePointerMoveEvents=i,this._attachPickingToSceneRender(o,()=>{const a=this._defaultMousePointerId,l=o==null?void 0:o.pick(o.pointerX,o.pointerY);if(l&&l.hit&&l.pickedMesh===t){let c=l.getTextureCoordinates();if(c){c=this._transformUvs(c);const h=this.getSize();this._doPicking(c.x*h.width,(this.applyYInversionOnUpdate?1-c.y:c.y)*h.height,null,s.PointerEventTypes.POINTERMOVE,a,0)}}else this._lastControlOver[a]&&this._lastControlOver[a]._onPointerOut(this._lastControlOver[a],null,!0),delete this._lastControlOver[a]},!0),this._attachToOnPointerOut(o),this._attachToOnBlur(o))}moveFocusToControl(t){this.focusedControl=t,this._lastPickedControl=t,this._blockNextFocusCheck=!0}_manageFocus(){if(this._blockNextFocusCheck){this._blockNextFocusCheck=!1,this._lastPickedControl=this._focusedControl;return}if(this._focusedControl&&this._focusedControl!==this._lastPickedControl){if(this._lastPickedControl.isFocusInvisible)return;this.focusedControl=null}}_attachPickingToSceneRender(t,i,o){this._sceneRenderObserver=t.onBeforeRenderObservable.add(()=>{!this.checkPointerEveryFrame||(this._linkedControls.length>0||o)&&i()})}_attachToOnPointerOut(t){this._canvasPointerOutObserver=t.getEngine().onCanvasPointerOutObservable.add(i=>{this._lastControlOver[i.pointerId]&&this._lastControlOver[i.pointerId]._onPointerOut(this._lastControlOver[i.pointerId],null),delete this._lastControlOver[i.pointerId],this._lastControlDown[i.pointerId]&&this._lastControlDown[i.pointerId]!==this._capturingControl[i.pointerId]&&(this._lastControlDown[i.pointerId]._forcePointerUp(i.pointerId),delete this._lastControlDown[i.pointerId])})}_attachToOnBlur(t){this._canvasBlurObserver=t.getEngine().onCanvasBlurObservable.add(()=>{Object.entries(this._lastControlDown).forEach(([,i])=>{i._onCanvasBlur()}),this.focusedControl=null,this._lastControlDown={}})}serializeContent(){const t=this.getSize(),i={root:{},width:t.width,height:t.height};return this._rootContainer.serialize(i.root),i}parseSerializedObject(t,i){if(this._rootContainer=f.Control.Parse(t.root,this),i){const o=t.width,a=t.height;typeof o=="number"&&typeof a=="number"&&o>=0&&a>=0?this.scaleTo(o,a):this.scaleTo(1920,1080)}}clone(t){const i=this.getScene();if(!i)return this;const o=this.getSize(),a=this.serializeContent(),l=new e(t!=null?t:"Clone of "+this.name,o.width,o.height,i,!this.noMipmap,this.samplingMode);return l.parseSerializedObject(a),l}static ParseFromSnippetAsync(t,i,o){return Xt(this,null,function*(){const a=o!=null?o:e.CreateFullscreenUI("ADT from snippet");if(t==="_BLANK")return a;const l=yield e._LoadURLContentAsync(e.SnippetUrl+"/"+t.replace(/#/g,"/"),!0);return a.parseSerializedObject(l,i),a})}parseFromSnippetAsync(t,i){return e.ParseFromSnippetAsync(t,i,this)}static ParseFromFileAsync(t,i,o){return Xt(this,null,function*(){const a=o!=null?o:e.CreateFullscreenUI("ADT from URL"),l=yield e._LoadURLContentAsync(t);return a.parseSerializedObject(l,i),a})}parseFromURLAsync(t,i){return e.ParseFromFileAsync(t,i,this)}static _LoadURLContentAsync(t,i=!1){return t===""?Promise.reject("No URL provided"):new Promise((o,a)=>{const l=new s.WebRequest;l.addEventListener("readystatechange",()=>{if(l.readyState==4)if(l.status==200){let c;if(i){const u=JSON.parse(JSON.parse(l.responseText).jsonPayload);c=u.encodedGui?new TextDecoder("utf-8").decode((0,s.DecodeBase64ToBinary)(u.encodedGui)):u.gui}else c=l.responseText;const h=JSON.parse(c);o(h)}else a("Unable to load")}),l.open("GET",t),l.send()})}static _Overlaps(t,i){return!(t.centerX>i.centerX+i.widthInPixels||t.centerX+t.widthInPixels<i.centerX||t.centerY+t.heightInPixels<i.centerY||t.centerY>i.centerY+i.heightInPixels)}static CreateForMesh(t,i=1024,o=1024,a=!0,l=!1,c,h=this._CreateMaterial){const u=(0,s.RandomGUID)(),m=new e(`AdvancedDynamicTexture for ${t.name} [${u}]`,i,o,t.getScene(),!0,s.Texture.TRILINEAR_SAMPLINGMODE,c);return h(t,u,m,l),m.attachToMesh(t,a),m}static _CreateMaterial(t,i,o,a){const l=(0,s.GetClass)("BABYLON.StandardMaterial");if(!l)throw"StandardMaterial needs to be imported before as it contains a side-effect required by your code.";const c=new l(`AdvancedDynamicTextureMaterial for ${t.name} [${i}]`,t.getScene());c.backFaceCulling=!1,c.diffuseColor=s.Color3.Black(),c.specularColor=s.Color3.Black(),a?(c.diffuseTexture=o,c.emissiveTexture=o,o.hasAlpha=!0):(c.emissiveTexture=o,c.opacityTexture=o),t.material=c}static CreateForMeshTexture(t,i=1024,o=1024,a=!0,l){const c=new e(t.name+" AdvancedDynamicTexture",i,o,t.getScene(),!0,s.Texture.TRILINEAR_SAMPLINGMODE,l);return c.attachToMesh(t,a),c}static CreateFullscreenUI(t,i=!0,o=null,a=s.Texture.BILINEAR_SAMPLINGMODE,l=!1){const c=new e(t,0,0,o,!1,a),h=c.getScene(),u=new s.Layer(t+"_layer",null,h,!i);if(u.texture=c,c._layerToDispose=u,c._isFullscreen=!0,l&&h){const m=1/h.getEngine().getHardwareScalingLevel();c._rootContainer.scaleX=m,c._rootContainer.scaleY=m}return c.attach(),c}scale(t){super.scale(t),this.markAsDirty()}scaleTo(t,i){super.scaleTo(t,i),this.markAsDirty()}_checkGuiIsReady(){this.guiIsReady()&&(this.onGuiReadyObservable.notifyObservers(this),this.onGuiReadyObservable.clear())}guiIsReady(){return this._rootContainer.isReady()}}e.SnippetUrl=s.Constants.SnippetUrl,e.AllowGPUOptimizations=!0},"../../../dev/gui/dist/2D/controls/button.js":(C,v,n)=>{n.r(v),n.d(v,{Button:()=>e});var s=n("../../../dev/gui/dist/2D/controls/rectangle.js"),r=n("../../../dev/gui/dist/2D/controls/control.js"),p=n("../../../dev/gui/dist/2D/controls/textBlock.js"),f=n("../../../dev/gui/dist/2D/controls/image.js"),g=n("core/Misc/observable"),d=n.n(g);class e extends s.Rectangle{get image(){return this._image}get textBlock(){return this._textBlock}constructor(t){super(t);this.name=t,this.delegatePickingToChildren=!1,this.thickness=1,this.isPointerBlocker=!0;let i=null;this.pointerEnterAnimation=()=>{i=this.alpha,this.alpha-=.1},this.pointerOutAnimation=()=>{i!==null&&(this.alpha=i)},this.pointerDownAnimation=()=>{this.scaleX-=.05,this.scaleY-=.05},this.pointerUpAnimation=()=>{this.scaleX+=.05,this.scaleY+=.05}}_getTypeName(){return"Button"}_processPicking(t,i,o,a,l,c,h,u){if(!this._isEnabled||!this.isHitTestVisible||!this.isVisible||this.notRenderable||!super.contains(t,i))return!1;if(this.delegatePickingToChildren){let m=!1;for(let b=this._children.length-1;b>=0;b--){const P=this._children[b];if(P.isEnabled&&P.isHitTestVisible&&P.isVisible&&!P.notRenderable&&P.contains(t,i)){m=!0;break}}if(!m)return!1}return this._processObservables(a,t,i,o,l,c,h,u),!0}_onPointerEnter(t,i){return super._onPointerEnter(t,i)?(!this.isReadOnly&&this.pointerEnterAnimation&&this.pointerEnterAnimation(),!0):!1}_onPointerOut(t,i,o=!1){!this.isReadOnly&&this.pointerOutAnimation&&this.pointerOutAnimation(),super._onPointerOut(t,i,o)}_onPointerDown(t,i,o,a,l){return super._onPointerDown(t,i,o,a,l)?(!this.isReadOnly&&this.pointerDownAnimation&&this.pointerDownAnimation(),!0):!1}_getRectangleFill(t){return this.isEnabled?this._getBackgroundColor(t):this._disabledColor}_onPointerUp(t,i,o,a,l,c){!this.isReadOnly&&this.pointerUpAnimation&&this.pointerUpAnimation(),super._onPointerUp(t,i,o,a,l,c)}serialize(t){super.serialize(t),this._textBlock&&(t.textBlockName=this._textBlock.name),this._image&&(t.imageName=this._image.name)}_parseFromContent(t,i){super._parseFromContent(t,i),t.textBlockName&&(this._textBlock=this.getChildByName(t.textBlockName)),t.imageName&&(this._image=this.getChildByName(t.imageName))}static CreateImageButton(t,i,o){const a=new this(t),l=new p.TextBlock(t+"_button",i);l.textWrapping=!0,l.textHorizontalAlignment=r.Control.HORIZONTAL_ALIGNMENT_CENTER,l.paddingLeft="20%",a.addControl(l);const c=new f.Image(t+"_icon",o);return c.width="20%",c.stretch=f.Image.STRETCH_UNIFORM,c.horizontalAlignment=r.Control.HORIZONTAL_ALIGNMENT_LEFT,a.addControl(c),a._image=c,a._textBlock=l,a}static CreateImageOnlyButton(t,i){const o=new this(t),a=new f.Image(t+"_icon",i);return a.stretch=f.Image.STRETCH_FILL,a.horizontalAlignment=r.Control.HORIZONTAL_ALIGNMENT_LEFT,o.addControl(a),o._image=a,o}static CreateSimpleButton(t,i){const o=new this(t),a=new p.TextBlock(t+"_button",i);return a.textWrapping=!0,a.textHorizontalAlignment=r.Control.HORIZONTAL_ALIGNMENT_CENTER,o.addControl(a),o._textBlock=a,o}static CreateImageWithCenterTextButton(t,i,o){const a=new this(t),l=new f.Image(t+"_icon",o);l.stretch=f.Image.STRETCH_FILL,a.addControl(l);const c=new p.TextBlock(t+"_button",i);return c.textWrapping=!0,c.textHorizontalAlignment=r.Control.HORIZONTAL_ALIGNMENT_CENTER,a.addControl(c),a._image=l,a._textBlock=c,a}}(0,g.RegisterClass)("BABYLON.GUI.Button",e)},"../../../dev/gui/dist/2D/controls/checkbox.js":(C,v,n)=>{n.r(v),n.d(v,{Checkbox:()=>e});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/2D/controls/control.js"),g=n("../../../dev/gui/dist/2D/controls/stackPanel.js"),d=n("../../../dev/gui/dist/2D/controls/textBlock.js");class e extends f.Control{get thickness(){return this._thickness}set thickness(t){this._thickness!==t&&(this._thickness=t,this._markAsDirty())}get checkSizeRatio(){return this._checkSizeRatio}set checkSizeRatio(t){t=Math.max(Math.min(1,t),0),this._checkSizeRatio!==t&&(this._checkSizeRatio=t,this._markAsDirty())}get background(){return this._background}set background(t){this._background!==t&&(this._background=t,this._markAsDirty())}get isChecked(){return this._isChecked}set isChecked(t){this._isChecked!==t&&(this._isChecked=t,this._markAsDirty(),this.onIsCheckedChangedObservable.notifyObservers(t))}constructor(t){super(t);this.name=t,this._isChecked=!1,this._background="black",this._checkSizeRatio=.8,this._thickness=1,this.onIsCheckedChangedObservable=new r.Observable,this.isPointerBlocker=!0}_getTypeName(){return"Checkbox"}_draw(t){t.save(),this._applyStates(t);const i=this._currentMeasure.width-this._thickness,o=this._currentMeasure.height-this._thickness;if((this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur,t.shadowOffsetX=this.shadowOffsetX,t.shadowOffsetY=this.shadowOffsetY),t.fillStyle=this._isEnabled?this._background:this._disabledColor,t.fillRect(this._currentMeasure.left+this._thickness/2,this._currentMeasure.top+this._thickness/2,i,o),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0),this._isChecked){t.fillStyle=this._isEnabled?this.color:this._disabledColorItem;const a=i*this._checkSizeRatio,l=o*this._checkSizeRatio;t.fillRect(this._currentMeasure.left+this._thickness/2+(i-a)/2,this._currentMeasure.top+this._thickness/2+(o-l)/2,a,l)}t.strokeStyle=this.color,t.lineWidth=this._thickness,t.strokeRect(this._currentMeasure.left+this._thickness/2,this._currentMeasure.top+this._thickness/2,i,o),t.restore()}_onPointerDown(t,i,o,a,l){return super._onPointerDown(t,i,o,a,l)?(this.isReadOnly||(this.isChecked=!this.isChecked),!0):!1}static AddCheckBoxWithHeader(t,i){const o=new g.StackPanel;o.isVertical=!1,o.height="30px";const a=new e;a.width="20px",a.height="20px",a.isChecked=!0,a.color="green",a.onIsCheckedChangedObservable.add(i),o.addControl(a);const l=new d.TextBlock;return l.text=t,l.width="180px",l.paddingLeft="5px",l.textHorizontalAlignment=f.Control.HORIZONTAL_ALIGNMENT_LEFT,l.color="white",o.addControl(l),o}}(0,s.__decorate)([(0,r.serialize)()],e.prototype,"thickness",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"checkSizeRatio",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"background",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"isChecked",null),(0,r.RegisterClass)("BABYLON.GUI.Checkbox",e)},"../../../dev/gui/dist/2D/controls/colorpicker.js":(C,v,n)=>{n.r(v),n.d(v,{ColorPicker:()=>i});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/2D/controls/control.js"),g=n("../../../dev/gui/dist/2D/controls/inputText.js"),d=n("../../../dev/gui/dist/2D/controls/rectangle.js"),e=n("../../../dev/gui/dist/2D/controls/button.js"),_=n("../../../dev/gui/dist/2D/controls/grid.js"),t=n("../../../dev/gui/dist/2D/controls/textBlock.js");class i extends f.Control{get value(){return this._value}set value(a){this._value.equals(a)||(this._value.copyFrom(a),this._value.toHSVToRef(this._tmpColor),this._h=this._tmpColor.r,this._s=Math.max(this._tmpColor.g,1e-5),this._v=Math.max(this._tmpColor.b,1e-5),this._markAsDirty(),this._value.r<=i._Epsilon&&(this._value.r=0),this._value.g<=i._Epsilon&&(this._value.g=0),this._value.b<=i._Epsilon&&(this._value.b=0),this._value.r>=1-i._Epsilon&&(this._value.r=1),this._value.g>=1-i._Epsilon&&(this._value.g=1),this._value.b>=1-i._Epsilon&&(this._value.b=1),this.onValueChangedObservable.notifyObservers(this._value))}get width(){return this._width.toString(this._host)}set width(a){this._width.toString(this._host)!==a&&this._width.fromString(a)&&(this._width.getValue(this._host)===0&&(a="1px",this._width.fromString(a)),this._height.fromString(a),this._markAsDirty())}get height(){return this._height.toString(this._host)}set height(a){this._height.toString(this._host)!==a&&this._height.fromString(a)&&(this._height.getValue(this._host)===0&&(a="1px",this._height.fromString(a)),this._width.fromString(a),this._markAsDirty())}get size(){return this.width}set size(a){this.width=a}constructor(a){super(a);this.name=a,this._value=r.Color3.Red(),this._tmpColor=new r.Color3,this._pointerStartedOnSquare=!1,this._pointerStartedOnWheel=!1,this._squareLeft=0,this._squareTop=0,this._squareSize=0,this._h=360,this._s=1,this._v=1,this._lastPointerDownId=-1,this.onValueChangedObservable=new r.Observable,this._pointerIsDown=!1,this.value=new r.Color3(.88,.1,.1),this.size="200px",this.isPointerBlocker=!0}_getTypeName(){return"ColorPicker"}_preMeasure(a){a.width<a.height?this._currentMeasure.height=a.width:this._currentMeasure.width=a.height}_updateSquareProps(){const a=Math.min(this._currentMeasure.width,this._currentMeasure.height)*.5,l=a*.2,h=(a-l)*2/Math.sqrt(2),u=a-h*.5;this._squareLeft=this._currentMeasure.left+u,this._squareTop=this._currentMeasure.top+u,this._squareSize=h}_drawGradientSquare(a,l,c,h,u,m){const b=m.createLinearGradient(l,c,h+l,c);b.addColorStop(0,"#fff"),b.addColorStop(1,"hsl("+a+", 100%, 50%)"),m.fillStyle=b,m.fillRect(l,c,h,u);const P=m.createLinearGradient(l,c,l,u+c);P.addColorStop(0,"rgba(0,0,0,0)"),P.addColorStop(1,"#000"),m.fillStyle=P,m.fillRect(l,c,h,u)}_drawCircle(a,l,c,h){h.beginPath(),h.arc(a,l,c+1,0,2*Math.PI,!1),h.lineWidth=3,h.strokeStyle="#333333",h.stroke(),h.beginPath(),h.arc(a,l,c,0,2*Math.PI,!1),h.lineWidth=3,h.strokeStyle="#ffffff",h.stroke()}_createColorWheelCanvas(a,l){const c=r.EngineStore.LastCreatedEngine;if(!c)throw new Error("Invalid engine. Unable to create a canvas.");const h=c.createCanvas(a*2,a*2),u=h.getContext("2d"),m=u.getImageData(0,0,a*2,a*2),b=m.data,P=this._tmpColor,B=a*a,I=a-l,x=I*I;for(let F=-a;F<a;F++)for(let Q=-a;Q<a;Q++){const it=F*F+Q*Q;if(it>B||it<x)continue;const bt=Math.sqrt(it),Ct=Math.atan2(Q,F);r.Color3.HSVtoRGBToRef(Ct*180/Math.PI+180,bt/a,1,P);const lt=(F+a+(Q+a)*2*a)*4;b[lt]=P.r*255,b[lt+1]=P.g*255,b[lt+2]=P.b*255;let rt=(bt-I)/(a-I),st=.2;const gt=.2,It=.04,E=50,M=150;a<E?st=gt:a>M?st=It:st=(It-gt)*(a-E)/(M-E)+gt,rt=(bt-I)/(a-I),rt<st?b[lt+3]=255*(rt/st):rt>1-st?b[lt+3]=255*(1-(rt-(1-st))/st):b[lt+3]=255}return u.putImageData(m,0,0),h}_draw(a){a.save(),this._applyStates(a);const l=Math.min(this._currentMeasure.width,this._currentMeasure.height)*.5,c=l*.2,h=this._currentMeasure.left,u=this._currentMeasure.top;(!this._colorWheelCanvas||this._colorWheelCanvas.width!=l*2)&&(this._colorWheelCanvas=this._createColorWheelCanvas(l,c)),this._updateSquareProps(),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(a.shadowColor=this.shadowColor,a.shadowBlur=this.shadowBlur,a.shadowOffsetX=this.shadowOffsetX,a.shadowOffsetY=this.shadowOffsetY,a.fillRect(this._squareLeft,this._squareTop,this._squareSize,this._squareSize)),a.drawImage(this._colorWheelCanvas,h,u),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(a.shadowBlur=0,a.shadowOffsetX=0,a.shadowOffsetY=0),this._drawGradientSquare(this._h,this._squareLeft,this._squareTop,this._squareSize,this._squareSize,a);let m=this._squareLeft+this._squareSize*this._s,b=this._squareTop+this._squareSize*(1-this._v);this._drawCircle(m,b,l*.04,a);const P=l-c*.5;m=h+l+Math.cos((this._h-180)*Math.PI/180)*P,b=u+l+Math.sin((this._h-180)*Math.PI/180)*P,this._drawCircle(m,b,c*.35,a),a.restore()}_updateValueFromPointer(a,l){if(this._pointerStartedOnWheel){const c=Math.min(this._currentMeasure.width,this._currentMeasure.height)*.5,h=c+this._currentMeasure.left,u=c+this._currentMeasure.top;this._h=Math.atan2(l-u,a-h)*180/Math.PI+180}else this._pointerStartedOnSquare&&(this._updateSquareProps(),this._s=(a-this._squareLeft)/this._squareSize,this._v=1-(l-this._squareTop)/this._squareSize,this._s=Math.min(this._s,1),this._s=Math.max(this._s,i._Epsilon),this._v=Math.min(this._v,1),this._v=Math.max(this._v,i._Epsilon));r.Color3.HSVtoRGBToRef(this._h,this._s,this._v,this._tmpColor),this.value=this._tmpColor}_isPointOnSquare(a,l){this._updateSquareProps();const c=this._squareLeft,h=this._squareTop,u=this._squareSize;return a>=c&&a<=c+u&&l>=h&&l<=h+u}_isPointOnWheel(a,l){const c=Math.min(this._currentMeasure.width,this._currentMeasure.height)*.5,h=c+this._currentMeasure.left,u=c+this._currentMeasure.top,m=c*.2,b=c-m,P=c*c,B=b*b,I=a-h,x=l-u,F=I*I+x*x;return F<=P&&F>=B}_onPointerDown(a,l,c,h,u){if(!super._onPointerDown(a,l,c,h,u))return!1;if(this.isReadOnly)return!0;this._pointerIsDown=!0,this._pointerStartedOnSquare=!1,this._pointerStartedOnWheel=!1,this._invertTransformMatrix.transformCoordinates(l.x,l.y,this._transformedPosition);const m=this._transformedPosition.x,b=this._transformedPosition.y;return this._isPointOnSquare(m,b)?this._pointerStartedOnSquare=!0:this._isPointOnWheel(m,b)&&(this._pointerStartedOnWheel=!0),this._updateValueFromPointer(m,b),this._host._capturingControl[c]=this,this._lastPointerDownId=c,!0}_onPointerMove(a,l,c,h){if(c==this._lastPointerDownId){if(!this.isReadOnly){this._invertTransformMatrix.transformCoordinates(l.x,l.y,this._transformedPosition);const u=this._transformedPosition.x,m=this._transformedPosition.y;this._pointerIsDown&&this._updateValueFromPointer(u,m)}super._onPointerMove(a,l,c,h)}}_onPointerUp(a,l,c,h,u,m){this._pointerIsDown=!1,delete this._host._capturingControl[c],super._onPointerUp(a,l,c,h,u,m)}_onCanvasBlur(){this._forcePointerUp(),super._onCanvasBlur()}static ShowPickerDialogAsync(a,l){return new Promise(c=>{l.pickerWidth=l.pickerWidth||"640px",l.pickerHeight=l.pickerHeight||"400px",l.headerHeight=l.headerHeight||"35px",l.lastColor=l.lastColor||"#000000",l.swatchLimit=l.swatchLimit||20,l.numSwatchesPerLine=l.numSwatchesPerLine||10;const h=l.swatchLimit/l.numSwatchesPerLine,u=parseFloat(l.pickerWidth)/l.numSwatchesPerLine,m=Math.floor(u*.25),b=m*(l.numSwatchesPerLine+1),P=Math.floor((parseFloat(l.pickerWidth)-b)/l.numSwatchesPerLine),B=P*h+m*(h+1),I=(parseInt(l.pickerHeight)+B+Math.floor(P*.25)).toString()+"px",x="#c0c0c0",F="#535353",Q="#414141",it="515151",bt="#555555",Ct="#454545",lt="#404040",rt=r.Color3.FromHexString("#dddddd"),st=rt.r+rt.g+rt.b,gt="#aaaaaa",It="#ffffff";let E,M;const T=["R","G","B"],D="#454545",O="#f0f0f0";let y,L,z=!1,W,w,A;const k=new _.Grid;if(k.name="Dialog Container",k.width=l.pickerWidth,l.savedColors){k.height=I;const R=parseInt(l.pickerHeight)/parseInt(I);k.addRowDefinition(R,!1),k.addRowDefinition(1-R,!1)}else k.height=l.pickerHeight,k.addRowDefinition(1,!1);if(a.addControl(k),l.savedColors){L=new _.Grid,L.name="Swatch Drawer",L.verticalAlignment=f.Control.VERTICAL_ALIGNMENT_TOP,L.background=F,L.width=l.pickerWidth;const R=l.savedColors.length/l.numSwatchesPerLine;let N;R==0?N=0:N=R+1,L.height=(P*R+N*m).toString()+"px",L.top=Math.floor(P*.25).toString()+"px";for(let S=0;S<Math.ceil(l.savedColors.length/l.numSwatchesPerLine)*2+1;S++)S%2!=0?L.addRowDefinition(P,!0):L.addRowDefinition(m,!0);for(let S=0;S<l.numSwatchesPerLine*2+1;S++)S%2!=0?L.addColumnDefinition(P,!0):L.addColumnDefinition(m,!0);k.addControl(L,1,0)}const U=new _.Grid;U.name="Picker Panel",U.height=l.pickerHeight;const _t=parseInt(l.headerHeight)/parseInt(l.pickerHeight),ht=[_t,1-_t];U.addRowDefinition(ht[0],!1),U.addRowDefinition(ht[1],!1),k.addControl(U,0,0);const J=new d.Rectangle;J.name="Dialogue Header Bar",J.background="#cccccc",J.thickness=0,U.addControl(J,0,0);const H=e.Button.CreateSimpleButton("closeButton","a");H.fontFamily="coreglyphs";const Pt=r.Color3.FromHexString(J.background),ie=new r.Color3(1-Pt.r,1-Pt.g,1-Pt.b);H.color=ie.toHexString(),H.fontSize=Math.floor(parseInt(l.headerHeight)*.6),H.textBlock.textVerticalAlignment=f.Control.VERTICAL_ALIGNMENT_CENTER,H.horizontalAlignment=f.Control.HORIZONTAL_ALIGNMENT_RIGHT,H.height=H.width=l.headerHeight,H.background=J.background,H.thickness=0,H.pointerDownAnimation=()=>{},H.pointerUpAnimation=()=>{H.background=J.background},H.pointerEnterAnimation=()=>{H.color=J.background,H.background="red"},H.pointerOutAnimation=()=>{H.color=ie.toHexString(),H.background=J.background},H.onPointerClickObservable.add(()=>{qt(ut.background)}),U.addControl(H,0,0);const Tt=new _.Grid;Tt.name="Dialogue Body",Tt.background=F;const Ut=[.4375,.5625];Tt.addRowDefinition(1,!1),Tt.addColumnDefinition(Ut[0],!1),Tt.addColumnDefinition(Ut[1],!1),U.addControl(Tt,1,0);const yt=new _.Grid;yt.name="Picker Grid",yt.addRowDefinition(.85,!1),yt.addRowDefinition(.15,!1),Tt.addControl(yt,0,0);const at=new i;at.name="GUI Color Picker",l.pickerHeight<l.pickerWidth?at.width=.89:at.height=.89,at.value=r.Color3.FromHexString(l.lastColor),at.horizontalAlignment=f.Control.HORIZONTAL_ALIGNMENT_CENTER,at.verticalAlignment=f.Control.VERTICAL_ALIGNMENT_CENTER,at.onPointerDownObservable.add(()=>{A=at.name,w="",dt(!1)}),at.onValueChangedObservable.add(function(R){A==at.name&&ft(R,at.name)}),yt.addControl(at,0,0);const Ot=new _.Grid;Ot.name="Dialogue Right Half",Ot.horizontalAlignment=f.Control.HORIZONTAL_ALIGNMENT_LEFT;const Ht=[.514,.486];Ot.addRowDefinition(Ht[0],!1),Ot.addRowDefinition(Ht[1],!1),Tt.addControl(Ot,1,1);const Rt=new _.Grid;Rt.name="Swatches and Buttons";const Gt=[.417,.583];Rt.addRowDefinition(1,!1),Rt.addColumnDefinition(Gt[0],!1),Rt.addColumnDefinition(Gt[1],!1),Ot.addControl(Rt,0,0);const mt=new _.Grid;mt.name="New and Current Swatches";const Wt=[.04,.16,.64,.16];mt.addRowDefinition(Wt[0],!1),mt.addRowDefinition(Wt[1],!1),mt.addRowDefinition(Wt[2],!1),mt.addRowDefinition(Wt[3],!1),Rt.addControl(mt,0,0);const St=new _.Grid;St.name="Active Swatches",St.width=.67,St.addRowDefinition(.5,!1),St.addRowDefinition(.5,!1),mt.addControl(St,2,0);const ae=Math.floor(parseInt(l.pickerWidth)*Ut[1]*Gt[0]*.11),ne=Math.floor(parseInt(l.pickerHeight)*ht[1]*Ht[0]*Wt[1]*.5);let Kt;l.pickerWidth>l.pickerHeight?Kt=ne:Kt=ae;const Vt=new t.TextBlock;Vt.text="new",Vt.name="New Color Label",Vt.color=x,Vt.fontSize=Kt,mt.addControl(Vt,1,0);const Bt=new d.Rectangle;Bt.name="New Color Swatch",Bt.background=l.lastColor,Bt.thickness=0,St.addControl(Bt,0,0);const ut=e.Button.CreateSimpleButton("currentSwatch","");ut.background=l.lastColor,ut.thickness=0,ut.onPointerClickObservable.add(()=>{const R=r.Color3.FromHexString(ut.background);ft(R,ut.name),dt(!1)}),ut.pointerDownAnimation=()=>{},ut.pointerUpAnimation=()=>{},ut.pointerEnterAnimation=()=>{},ut.pointerOutAnimation=()=>{},St.addControl(ut,1,0);const At=new d.Rectangle;At.name="Swatch Outline",At.width=.67,At.thickness=2,At.color=lt,At.isHitTestVisible=!1,mt.addControl(At,2,0);const Qt=new t.TextBlock;Qt.name="Current Color Label",Qt.text="current",Qt.color=x,Qt.fontSize=Kt,mt.addControl(Qt,3,0);const vt=new _.Grid;vt.name="Button Grid",vt.height=.8;const jt=1/3;vt.addRowDefinition(jt,!1),vt.addRowDefinition(jt,!1),vt.addRowDefinition(jt,!1),Rt.addControl(vt,0,1);const Lt=Math.floor(parseInt(l.pickerWidth)*Ut[1]*Gt[1]*.67).toString()+"px",Ft=Math.floor(parseInt(l.pickerHeight)*ht[1]*Ht[0]*(parseFloat(vt.height.toString())/100)*jt*.7).toString()+"px";parseFloat(Lt)>parseFloat(Ft)?E=Math.floor(parseFloat(Ft)*.45):E=Math.floor(parseFloat(Lt)*.11);const q=e.Button.CreateSimpleButton("butOK","OK");q.width=Lt,q.height=Ft,q.verticalAlignment=f.Control.VERTICAL_ALIGNMENT_CENTER,q.thickness=2,q.color=x,q.fontSize=E,q.background=F,q.onPointerEnterObservable.add(()=>{q.background=Q}),q.onPointerOutObservable.add(()=>{q.background=F}),q.pointerDownAnimation=()=>{q.background=it},q.pointerUpAnimation=()=>{q.background=Q},q.onPointerClickObservable.add(()=>{dt(!1),qt(Bt.background)}),vt.addControl(q,0,0);const tt=e.Button.CreateSimpleButton("butCancel","Cancel");tt.width=Lt,tt.height=Ft,tt.verticalAlignment=f.Control.VERTICAL_ALIGNMENT_CENTER,tt.thickness=2,tt.color=x,tt.fontSize=E,tt.background=F,tt.onPointerEnterObservable.add(()=>{tt.background=Q}),tt.onPointerOutObservable.add(()=>{tt.background=F}),tt.pointerDownAnimation=()=>{tt.background=it},tt.pointerUpAnimation=()=>{tt.background=Q},tt.onPointerClickObservable.add(()=>{dt(!1),qt(ut.background)}),vt.addControl(tt,1,0),l.savedColors&&(W=e.Button.CreateSimpleButton("butSave","Save"),W.width=Lt,W.height=Ft,W.verticalAlignment=f.Control.VERTICAL_ALIGNMENT_CENTER,W.thickness=2,W.fontSize=E,l.savedColors.length<l.swatchLimit?(W.color=x,W.background=F):Jt(W,!0),W.onPointerEnterObservable.add(()=>{l.savedColors&&l.savedColors.length<l.swatchLimit&&(W.background=Q)}),W.onPointerOutObservable.add(()=>{l.savedColors&&l.savedColors.length<l.swatchLimit&&(W.background=F)}),W.pointerDownAnimation=()=>{l.savedColors&&l.savedColors.length<l.swatchLimit&&(W.background=it)},W.pointerUpAnimation=()=>{l.savedColors&&l.savedColors.length<l.swatchLimit&&(W.background=Q)},W.onPointerClickObservable.add(()=>{l.savedColors&&(l.savedColors.length==0&&$t(!0),l.savedColors.length<l.swatchLimit&&Zt(Bt.background,W),dt(!1))}),l.savedColors.length>0&&$t(!0),vt.addControl(W,2,0));const Dt=new _.Grid;Dt.name="Dialog Lower Right",Dt.addRowDefinition(.02,!1),Dt.addRowDefinition(.63,!1),Dt.addRowDefinition(.21,!1),Dt.addRowDefinition(.14,!1),Ot.addControl(Dt,1,0);const wt=r.Color3.FromHexString(l.lastColor),et=new _.Grid;et.name="RGB Values",et.width=.82,et.verticalAlignment=f.Control.VERTICAL_ALIGNMENT_CENTER,et.addRowDefinition(1/3,!1),et.addRowDefinition(1/3,!1),et.addRowDefinition(1/3,!1),et.addColumnDefinition(.1,!1),et.addColumnDefinition(.2,!1),et.addColumnDefinition(.7,!1),Dt.addControl(et,1,0);for(let R=0;R<T.length;R++){const N=new t.TextBlock;N.text=T[R],N.color=x,N.fontSize=E,et.addControl(N,R,0)}const X=new g.InputText;X.width=.83,X.height=.72,X.name="rIntField",X.fontSize=E,X.text=(wt.r*255).toString(),X.color=O,X.background=D,X.onFocusObservable.add(()=>{A=X.name,w=X.text,dt(!1)}),X.onBlurObservable.add(()=>{X.text==""&&(X.text="0"),Nt(X,"r"),A==X.name&&(A="")}),X.onTextChangedObservable.add(()=>{A==X.name&&Nt(X,"r")}),et.addControl(X,0,1);const Z=new g.InputText;Z.width=.83,Z.height=.72,Z.name="gIntField",Z.fontSize=E,Z.text=(wt.g*255).toString(),Z.color=O,Z.background=D,Z.onFocusObservable.add(()=>{A=Z.name,w=Z.text,dt(!1)}),Z.onBlurObservable.add(()=>{Z.text==""&&(Z.text="0"),Nt(Z,"g"),A==Z.name&&(A="")}),Z.onTextChangedObservable.add(()=>{A==Z.name&&Nt(Z,"g")}),et.addControl(Z,1,1);const $=new g.InputText;$.width=.83,$.height=.72,$.name="bIntField",$.fontSize=E,$.text=(wt.b*255).toString(),$.color=O,$.background=D,$.onFocusObservable.add(()=>{A=$.name,w=$.text,dt(!1)}),$.onBlurObservable.add(()=>{$.text==""&&($.text="0"),Nt($,"b"),A==$.name&&(A="")}),$.onTextChangedObservable.add(()=>{A==$.name&&Nt($,"b")}),et.addControl($,2,1);const G=new g.InputText;G.width=.95,G.height=.72,G.name="rDecField",G.fontSize=E,G.text=wt.r.toString(),G.color=O,G.background=D,G.onFocusObservable.add(()=>{A=G.name,w=G.text,dt(!1)}),G.onBlurObservable.add(()=>{(parseFloat(G.text)==0||G.text=="")&&(G.text="0",zt(G,"r")),A==G.name&&(A="")}),G.onTextChangedObservable.add(()=>{A==G.name&&zt(G,"r")}),et.addControl(G,0,2);const K=new g.InputText;K.width=.95,K.height=.72,K.name="gDecField",K.fontSize=E,K.text=wt.g.toString(),K.color=O,K.background=D,K.onFocusObservable.add(()=>{A=K.name,w=K.text,dt(!1)}),K.onBlurObservable.add(()=>{(parseFloat(K.text)==0||K.text=="")&&(K.text="0",zt(K,"g")),A==K.name&&(A="")}),K.onTextChangedObservable.add(()=>{A==K.name&&zt(K,"g")}),et.addControl(K,1,2);const j=new g.InputText;j.width=.95,j.height=.72,j.name="bDecField",j.fontSize=E,j.text=wt.b.toString(),j.color=O,j.background=D,j.onFocusObservable.add(()=>{A=j.name,w=j.text,dt(!1)}),j.onBlurObservable.add(()=>{(parseFloat(j.text)==0||j.text=="")&&(j.text="0",zt(j,"b")),A==j.name&&(A="")}),j.onTextChangedObservable.add(()=>{A==j.name&&zt(j,"b")}),et.addControl(j,2,2);const xt=new _.Grid;xt.name="Hex Value",xt.width=.82,xt.addRowDefinition(1,!1),xt.addColumnDefinition(.1,!1),xt.addColumnDefinition(.9,!1),Dt.addControl(xt,2,0);const Yt=new t.TextBlock;Yt.text="#",Yt.color=x,Yt.fontSize=E,xt.addControl(Yt,0,0);const V=new g.InputText;V.width=.96,V.height=.72,V.name="hexField",V.horizontalAlignment=f.Control.HORIZONTAL_ALIGNMENT_CENTER,V.fontSize=E;const le=l.lastColor.split("#");V.text=le[1],V.color=O,V.background=D,V.onFocusObservable.add(()=>{A=V.name,w=V.text,dt(!1)}),V.onBlurObservable.add(()=>{if(V.text.length==3){const R=V.text.split("");V.text=R[0]+R[0]+R[1]+R[1]+R[2]+R[2]}V.text==""&&(V.text="000000",ft(r.Color3.FromHexString(V.text),"b")),A==V.name&&(A="")}),V.onTextChangedObservable.add(()=>{let R=V.text;const N=/[^0-9A-F]/i.test(R);if((V.text.length>6||N)&&A==V.name)V.text=w;else{if(V.text.length<6){const S=6-V.text.length;for(let nt=0;nt<S;nt++)R="0"+R}if(V.text.length==3){const S=V.text.split("");R=S[0]+S[0]+S[1]+S[1]+S[2]+S[2]}R="#"+R,A==V.name&&(w=V.text,ft(r.Color3.FromHexString(R),V.name))}}),xt.addControl(V,0,1),l.savedColors&&l.savedColors.length>0&&Zt("",W);function ft(R,N){A=N;const S=R.toHexString();if(Bt.background=S,X.name!=A&&(X.text=Math.floor(R.r*255).toString()),Z.name!=A&&(Z.text=Math.floor(R.g*255).toString()),$.name!=A&&($.text=Math.floor(R.b*255).toString()),G.name!=A&&(G.text=R.r.toString()),K.name!=A&&(K.text=R.g.toString()),j.name!=A&&(j.text=R.b.toString()),V.name!=A){const nt=S.split("#");V.text=nt[1]}at.name!=A&&(at.value=R)}function Nt(R,N){let S=R.text;if(/[^0-9]/g.test(S)){R.text=w;return}else S!=""&&(Math.floor(parseInt(S))<0?S="0":Math.floor(parseInt(S))>255?S="255":isNaN(parseInt(S))&&(S="0")),A==R.name&&(w=S);if(S!=""){S=parseInt(S).toString(),R.text=S;const Y=r.Color3.FromHexString(Bt.background);A==R.name&&(N=="r"?ft(new r.Color3(parseInt(S)/255,Y.g,Y.b),R.name):N=="g"?ft(new r.Color3(Y.r,parseInt(S)/255,Y.b),R.name):ft(new r.Color3(Y.r,Y.g,parseInt(S)/255),R.name))}}function zt(R,N){let S=R.text;if(/[^0-9.]/g.test(S)){R.text=w;return}else S!=""&&S!="."&&parseFloat(S)!=0&&(parseFloat(S)<0?S="0.0":parseFloat(S)>1?S="1.0":isNaN(parseFloat(S))&&(S="0.0")),A==R.name&&(w=S);S!=""&&S!="."&&parseFloat(S)!=0?(S=parseFloat(S).toString(),R.text=S):S="0.0";const Y=r.Color3.FromHexString(Bt.background);A==R.name&&(N=="r"?ft(new r.Color3(parseFloat(S),Y.g,Y.b),R.name):N=="g"?ft(new r.Color3(Y.r,parseFloat(S),Y.b),R.name):ft(new r.Color3(Y.r,Y.g,parseFloat(S)),R.name))}function _e(R){l.savedColors&&l.savedColors.splice(R,1),l.savedColors&&l.savedColors.length==0&&($t(!1),z=!1)}function he(){if(l.savedColors&&l.savedColors[y]){let R;z?R="b":R="";const N=e.Button.CreateSimpleButton("Swatch_"+y,R);N.fontFamily="coreglyphs";const S=r.Color3.FromHexString(l.savedColors[y]);S.r+S.g+S.b>st?N.color=gt:N.color=It,N.fontSize=Math.floor(P*.7),N.textBlock.verticalAlignment=f.Control.VERTICAL_ALIGNMENT_CENTER,N.height=N.width=P.toString()+"px",N.background=l.savedColors[y],N.thickness=2;const Y=y;return N.pointerDownAnimation=()=>{N.thickness=4},N.pointerUpAnimation=()=>{N.thickness=3},N.pointerEnterAnimation=()=>{N.thickness=3},N.pointerOutAnimation=()=>{N.thickness=2},N.onPointerClickObservable.add(()=>{z?(_e(Y),Zt("",W)):l.savedColors&&ft(r.Color3.FromHexString(l.savedColors[Y]),N.name)}),N}else return null}function dt(R){R!==void 0&&(z=R);let N;if(z){for(let S=0;S<L.children.length;S++)N=L.children[S],N.textBlock.text="b";M!==void 0&&(M.textBlock.text="Done")}else{for(let S=0;S<L.children.length;S++)N=L.children[S],N.textBlock.text="";M!==void 0&&(M.textBlock.text="Edit")}}function Zt(R,N){if(l.savedColors){R!=""&&l.savedColors.push(R),y=0,L.clearControls();const S=Math.ceil(l.savedColors.length/l.numSwatchesPerLine);let nt;if(S==0?nt=0:nt=S+1,L.rowCount!=S+nt){const Y=L.rowCount;for(let pt=0;pt<Y;pt++)L.removeRowDefinition(0);for(let pt=0;pt<S+nt;pt++)pt%2?L.addRowDefinition(P,!0):L.addRowDefinition(m,!0)}L.height=(P*S+nt*m).toString()+"px";for(let Y=1,pt=1;Y<S+nt;Y+=2,pt++){let te;l.savedColors.length>pt*l.numSwatchesPerLine?te=l.numSwatchesPerLine:te=l.savedColors.length-(pt-1)*l.numSwatchesPerLine;const de=Math.min(Math.max(te,0),l.numSwatchesPerLine);for(let ee=0,se=1;ee<de;ee++){if(ee>l.numSwatchesPerLine)continue;const oe=he();if(oe!=null)L.addControl(oe,Y,se),se+=2,y++;else continue}}l.savedColors.length>=l.swatchLimit?Jt(N,!0):Jt(N,!1)}}function $t(R){R?(M=e.Button.CreateSimpleButton("butEdit","Edit"),M.width=Lt,M.height=Ft,M.left=Math.floor(parseInt(Lt)*.1).toString()+"px",M.top=(parseFloat(M.left)*-1).toString()+"px",M.verticalAlignment=f.Control.VERTICAL_ALIGNMENT_BOTTOM,M.horizontalAlignment=f.Control.HORIZONTAL_ALIGNMENT_LEFT,M.thickness=2,M.color=x,M.fontSize=E,M.background=F,M.onPointerEnterObservable.add(()=>{M.background=Q}),M.onPointerOutObservable.add(()=>{M.background=F}),M.pointerDownAnimation=()=>{M.background=it},M.pointerUpAnimation=()=>{M.background=Q},M.onPointerClickObservable.add(()=>{z?z=!1:z=!0,dt()}),yt.addControl(M,1,0)):yt.removeControl(M)}function Jt(R,N){N?(R.color=bt,R.background=Ct):(R.color=x,R.background=F)}function qt(R){l.savedColors&&l.savedColors.length>0?c({savedColors:l.savedColors,pickedColor:R}):c({pickedColor:R}),a.removeControl(k)}})}}i._Epsilon=1e-6,(0,s.__decorate)([(0,r.serialize)()],i.prototype,"value",null),(0,s.__decorate)([(0,r.serialize)()],i.prototype,"width",null),(0,s.__decorate)([(0,r.serialize)()],i.prototype,"height",null),(0,s.__decorate)([(0,r.serialize)()],i.prototype,"size",null),(0,r.RegisterClass)("BABYLON.GUI.ColorPicker",i)},"../../../dev/gui/dist/2D/controls/container.js":(C,v,n)=>{n.r(v),n.d(v,{Container:()=>e});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/2D/controls/control.js"),g=n("../../../dev/gui/dist/2D/measure.js"),d=n("../../../dev/gui/dist/2D/math2D.js");class e extends f.Control{get renderToIntermediateTexture(){return this._renderToIntermediateTexture}set renderToIntermediateTexture(t){this._renderToIntermediateTexture!==t&&(this._renderToIntermediateTexture=t,this._markAsDirty())}get adaptHeightToChildren(){return this._adaptHeightToChildren}set adaptHeightToChildren(t){this._adaptHeightToChildren!==t&&(this._adaptHeightToChildren=t,t&&(this.height="100%"),this._markAsDirty())}get adaptWidthToChildren(){return this._adaptWidthToChildren}set adaptWidthToChildren(t){this._adaptWidthToChildren!==t&&(this._adaptWidthToChildren=t,t&&(this.width="100%"),this._markAsDirty())}get background(){return this._background}set background(t){this._background!==t&&(this._background=t,this._markAsDirty())}get backgroundGradient(){return this._backgroundGradient}set backgroundGradient(t){this._backgroundGradient!==t&&(this._backgroundGradient=t,this._markAsDirty())}get children(){return this._children}get isReadOnly(){return this._isReadOnly}set isReadOnly(t){this._isReadOnly=t;for(const i of this._children)i.isReadOnly=t}constructor(t){super(t);this.name=t,this._children=new Array,this._measureForChildren=g.Measure.Empty(),this._background="",this._backgroundGradient=null,this._adaptWidthToChildren=!1,this._adaptHeightToChildren=!1,this._renderToIntermediateTexture=!1,this._intermediateTexture=null,this.logLayoutCycleErrors=!1,this.maxLayoutCycle=3,this.onControlAddedObservable=new r.Observable,this.onControlRemovedObservable=new r.Observable,this._inverseTransformMatrix=d.Matrix2D.Identity(),this._inverseMeasure=new g.Measure(0,0,0,0)}_getTypeName(){return"Container"}_flagDescendantsAsMatrixDirty(){for(const t of this.children)t._isClipped=!1,t._markMatrixAsDirty()}getChildByName(t){for(const i of this.children)if(i.name===t)return i;return null}getChildByType(t,i){for(const o of this.children)if(o.typeName===i)return o;return null}containsControl(t){return this.children.indexOf(t)!==-1}addControl(t){return t?this._children.indexOf(t)!==-1?this:(t._link(this._host),t._markAllAsDirty(),this._reOrderControl(t),this._markAsDirty(),this.onControlAddedObservable.notifyObservers(t),this):this}clearControls(){const t=this.children.slice();for(const i of t)this.removeControl(i);return this}removeControl(t){const i=this._children.indexOf(t);return i!==-1&&(this._children.splice(i,1),t.parent=null),t.linkWithMesh(null),this._host&&this._host._cleanControlAfterRemoval(t),this._markAsDirty(),this.onControlRemovedObservable.notifyObservers(t),this}_reOrderControl(t){const i=t.linkedMesh;this.removeControl(t);let o=!1;for(let a=0;a<this._children.length;a++)if(this._children[a].zIndex>t.zIndex){this._children.splice(a,0,t),o=!0;break}o||this._children.push(t),t.parent=this,i&&t.linkWithMesh(i),this._markAsDirty()}_offsetLeft(t){super._offsetLeft(t);for(const i of this._children)i._offsetLeft(t)}_offsetTop(t){super._offsetTop(t);for(const i of this._children)i._offsetTop(t)}_markAllAsDirty(){super._markAllAsDirty();for(let t=0;t<this._children.length;t++)this._children[t]._markAllAsDirty()}_getBackgroundColor(t){return this._backgroundGradient?this._backgroundGradient.getCanvasGradient(t):this._background}_localDraw(t){(this._background||this._backgroundGradient)&&(t.save(),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur,t.shadowOffsetX=this.shadowOffsetX,t.shadowOffsetY=this.shadowOffsetY),t.fillStyle=this._getBackgroundColor(t),t.fillRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height),t.restore())}_link(t){super._link(t);for(const i of this._children)i._link(t)}_beforeLayout(){}_processMeasures(t,i){(this._isDirty||!this._cachedParentMeasure.isEqualsTo(t))&&(super._processMeasures(t,i),this._evaluateClippingState(t),this._renderToIntermediateTexture&&(this._intermediateTexture&&this._host.getScene()!=this._intermediateTexture.getScene()&&(this._intermediateTexture.dispose(),this._intermediateTexture=null),this._intermediateTexture?this._intermediateTexture.scaleTo(this._currentMeasure.width,this._currentMeasure.height):(this._intermediateTexture=new r.DynamicTexture("",{width:this._currentMeasure.width,height:this._currentMeasure.height},this._host.getScene(),!1,r.Texture.NEAREST_SAMPLINGMODE,r.Constants.TEXTUREFORMAT_RGBA,!1),this._intermediateTexture.hasAlpha=!0)))}_layout(t,i){var a,l;if(!this.isDirty&&(!this.isVisible||this.notRenderable))return!1;this.host._numLayoutCalls++,this._isDirty&&this._currentMeasure.transformToRef(this._transformMatrix,this._prevCurrentMeasureTransformedIntoGlobalSpace);let o=0;i.save(),this._applyStates(i),this._beforeLayout();do{let c=-1,h=-1;if(this._rebuildLayout=!1,this._processMeasures(t,i),!this._isClipped){for(const u of this._children)u._tempParentMeasure.copyFrom(this._measureForChildren),u._layout(this._measureForChildren,i)&&u.isVisible&&!u.notRenderable&&(this.adaptWidthToChildren&&u._width.isPixel&&(c=Math.max(c,u._currentMeasure.width+u._paddingLeftInPixels+u._paddingRightInPixels)),this.adaptHeightToChildren&&u._height.isPixel&&(h=Math.max(h,u._currentMeasure.height+u._paddingTopInPixels+u._paddingBottomInPixels)));this.adaptWidthToChildren&&c>=0&&(c+=this.paddingLeftInPixels+this.paddingRightInPixels,this.width!==c+"px"&&((a=this.parent)==null||a._markAsDirty(),this.width=c+"px",this._width.ignoreAdaptiveScaling=!0,this._rebuildLayout=!0)),this.adaptHeightToChildren&&h>=0&&(h+=this.paddingTopInPixels+this.paddingBottomInPixels,this.height!==h+"px"&&((l=this.parent)==null||l._markAsDirty(),this.height=h+"px",this._height.ignoreAdaptiveScaling=!0,this._rebuildLayout=!0)),this._postMeasure()}o++}while(this._rebuildLayout&&o<this.maxLayoutCycle);return o>=3&&this.logLayoutCycleErrors&&r.Logger.Error(`Layout cycle detected in GUI (Container name=${this.name}, uniqueId=${this.uniqueId})`),i.restore(),this._isDirty&&(this.invalidateRect(),this._isDirty=!1),!0}_postMeasure(){}_draw(t,i){const o=this._renderToIntermediateTexture&&this._intermediateTexture,a=o?this._intermediateTexture.getContext():t;o&&(a.save(),a.translate(-this._currentMeasure.left,-this._currentMeasure.top),i?(this._transformMatrix.invertToRef(this._inverseTransformMatrix),i.transformToRef(this._inverseTransformMatrix,this._inverseMeasure),a.clearRect(this._inverseMeasure.left,this._inverseMeasure.top,this._inverseMeasure.width,this._inverseMeasure.height)):a.clearRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height)),this._localDraw(a),t.save(),this.clipChildren&&this._clipForChildren(a);for(const l of this._children)i&&!l._intersectsRect(i)||l._render(a,i);o&&(a.restore(),t.save(),t.globalAlpha=this.alpha,t.drawImage(a.canvas,this._currentMeasure.left,this._currentMeasure.top),t.restore()),t.restore()}getDescendantsToRef(t,i=!1,o){if(!!this.children)for(let a=0;a<this.children.length;a++){const l=this.children[a];(!o||o(l))&&t.push(l),i||l.getDescendantsToRef(t,!1,o)}}_processPicking(t,i,o,a,l,c,h,u){if(!this._isEnabled||!this.isVisible||this.notRenderable)return!1;const m=super.contains(t,i);if(!m&&this.clipChildren)return!1;for(let b=this._children.length-1;b>=0;b--){const P=this._children[b];if(P._processPicking(t,i,o,a,l,c,h,u))return P.hoverCursor&&this._host._changeCursor(P.hoverCursor),!0}return!m||!this.isHitTestVisible?!1:this._processObservables(a,t,i,o,l,c,h,u)}_additionalProcessing(t,i){super._additionalProcessing(t,i),this._measureForChildren.copyFrom(this._currentMeasure)}serialize(t){if(super.serialize(t),this.backgroundGradient&&(t.backgroundGradient={},this.backgroundGradient.serialize(t.backgroundGradient)),!!this.children.length){t.children=[];for(const i of this.children){const o={};i.serialize(o),t.children.push(o)}}}dispose(){var t;super.dispose();for(let i=this.children.length-1;i>=0;i--)this.children[i].dispose();(t=this._intermediateTexture)==null||t.dispose()}_parseFromContent(t,i){var o;if(super._parseFromContent(t,i),this._link(i),t.backgroundGradient){const a=r.Tools.Instantiate("BABYLON.GUI."+t.backgroundGradient.className);this._backgroundGradient=new a,(o=this._backgroundGradient)==null||o.parse(t.backgroundGradient)}if(!!t.children)for(const a of t.children)this.addControl(f.Control.Parse(a,i))}isReady(){for(const t of this.children)if(!t.isReady())return!1;return!0}}(0,s.__decorate)([(0,r.serialize)()],e.prototype,"renderToIntermediateTexture",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"maxLayoutCycle",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"adaptHeightToChildren",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"adaptWidthToChildren",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"background",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"backgroundGradient",null),(0,r.RegisterClass)("BABYLON.GUI.Container",e)},"../../../dev/gui/dist/2D/controls/control.js":(C,v,n)=>{n.r(v),n.d(v,{Control:()=>e});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/2D/valueAndUnit.js"),g=n("../../../dev/gui/dist/2D/measure.js"),d=n("../../../dev/gui/dist/2D/math2D.js");class e{get isReadOnly(){return this._isReadOnly}set isReadOnly(t){this._isReadOnly=t}get transformedMeasure(){return this._evaluatedMeasure}set clipChildren(t){this._clipChildren=t}get clipChildren(){return this._clipChildren}set clipContent(t){this._clipContent=t}get clipContent(){return this._clipContent}get shadowOffsetX(){return this._shadowOffsetX}set shadowOffsetX(t){this._shadowOffsetX!==t&&(this._shadowOffsetX=t,this._markAsDirty())}get shadowOffsetY(){return this._shadowOffsetY}set shadowOffsetY(t){this._shadowOffsetY!==t&&(this._shadowOffsetY=t,this._markAsDirty())}get shadowBlur(){return this._shadowBlur}set shadowBlur(t){this._shadowBlur!==t&&(this._previousShadowBlur=this._shadowBlur,this._shadowBlur=t,this._markAsDirty())}get shadowColor(){return this._shadowColor}set shadowColor(t){this._shadowColor!==t&&(this._shadowColor=t,this._markAsDirty())}get typeName(){return this._getTypeName()}getClassName(){return this._getTypeName()}set accessibilityTag(t){this._accessibilityTag=t,this.onAccessibilityTagChangedObservable.notifyObservers(t)}get accessibilityTag(){return this._accessibilityTag}get host(){return this._host}get fontOffset(){return this._fontOffset}set fontOffset(t){this._fontOffset=t}get alpha(){return this._alpha}set alpha(t){this._alpha!==t&&(this._alphaSet=!0,this._alpha=t,this._markAsDirty())}get highlightLineWidth(){return this._highlightLineWidth}set highlightLineWidth(t){this._highlightLineWidth!==t&&(this._highlightLineWidth=t,this._markAsDirty())}get isHighlighted(){return this._isHighlighted}set isHighlighted(t){this._isHighlighted!==t&&(this._isHighlighted=t,this._markAsDirty())}get highlightColor(){return this._highlightColor}set highlightColor(t){this._highlightColor!==t&&(this._highlightColor=t,this._markAsDirty())}get scaleX(){return this._scaleX}set scaleX(t){this._scaleX!==t&&(this._scaleX=t,this._markAsDirty(),this._markMatrixAsDirty())}get scaleY(){return this._scaleY}set scaleY(t){this._scaleY!==t&&(this._scaleY=t,this._markAsDirty(),this._markMatrixAsDirty())}get rotation(){return this._rotation}set rotation(t){this._rotation!==t&&(this._rotation=t,this._markAsDirty(),this._markMatrixAsDirty())}get transformCenterY(){return this._transformCenterY}set transformCenterY(t){this._transformCenterY!==t&&(this._transformCenterY=t,this._markAsDirty(),this._markMatrixAsDirty())}get transformCenterX(){return this._transformCenterX}set transformCenterX(t){this._transformCenterX!==t&&(this._transformCenterX=t,this._markAsDirty(),this._markMatrixAsDirty())}get horizontalAlignment(){return this._horizontalAlignment}set horizontalAlignment(t){this._horizontalAlignment!==t&&(this._horizontalAlignment=t,this._markAsDirty())}get verticalAlignment(){return this._verticalAlignment}set verticalAlignment(t){this._verticalAlignment!==t&&(this._verticalAlignment=t,this._markAsDirty())}set fixedRatio(t){this._fixedRatio!==t&&(this._fixedRatio=t,this._markAsDirty())}get fixedRatio(){return this._fixedRatio}set fixedRatioMasterIsWidth(t){this._fixedRatioMasterIsWidth!==t&&(this._fixedRatioMasterIsWidth=t,this._markAsDirty())}get fixedRatioMasterIsWidth(){return this._fixedRatioMasterIsWidth}get width(){return this._width.toString(this._host)}set width(t){this._fixedRatioMasterIsWidth=!0,this._width.toString(this._host)!==t&&this._width.fromString(t)&&this._markAsDirty()}get widthInPixels(){return this._width.getValueInPixel(this._host,this._cachedParentMeasure.width)}set widthInPixels(t){isNaN(t)||(this._fixedRatioMasterIsWidth=!0,this.width=t+"px")}get height(){return this._height.toString(this._host)}set height(t){this._fixedRatioMasterIsWidth=!1,this._height.toString(this._host)!==t&&this._height.fromString(t)&&this._markAsDirty()}get heightInPixels(){return this._height.getValueInPixel(this._host,this._cachedParentMeasure.height)}set heightInPixels(t){isNaN(t)||(this._fixedRatioMasterIsWidth=!1,this.height=t+"px")}get fontFamily(){return this._fontFamily}set fontFamily(t){this._fontFamily!==t&&(this._fontFamily=t,this._resetFontCache())}get fontStyle(){return this._fontStyle}set fontStyle(t){this._fontStyle!==t&&(this._fontStyle=t,this._resetFontCache())}get fontWeight(){return this._fontWeight}set fontWeight(t){this._fontWeight!==t&&(this._fontWeight=t,this._resetFontCache())}get style(){return this._style}set style(t){this._style&&(this._style.onChangedObservable.remove(this._styleObserver),this._styleObserver=null),this._style=t,this._style&&(this._styleObserver=this._style.onChangedObservable.add(()=>{this._markAsDirty(),this._resetFontCache()})),this._markAsDirty(),this._resetFontCache()}get _isFontSizeInPercentage(){return this._fontSize.isPercentage}get fontSizeInPixels(){const t=this._style?this._style._fontSize:this._fontSize;return t.isPixel?t.getValue(this._host):t.getValueInPixel(this._host,this._tempParentMeasure.height||this._cachedParentMeasure.height)}set fontSizeInPixels(t){isNaN(t)||(this.fontSize=t+"px")}get fontSize(){return this._fontSize.toString(this._host)}set fontSize(t){this._fontSize.toString(this._host)!==t&&this._fontSize.fromString(t)&&(this._markAsDirty(),this._resetFontCache())}get color(){return this._color}set color(t){this._color!==t&&(this._color=t,this._markAsDirty())}get gradient(){return this._gradient}set gradient(t){this._gradient!==t&&(this._gradient=t,this._markAsDirty())}get zIndex(){return this._zIndex}set zIndex(t){this.zIndex!==t&&(this._zIndex=t,this.parent&&this.parent._reOrderControl(this))}get notRenderable(){return this._doNotRender}set notRenderable(t){this._doNotRender!==t&&(this._doNotRender=t,this._markAsDirty())}get isVisible(){return this._isVisible}set isVisible(t){this._isVisible!==t&&(this._isVisible=t,this._markAsDirty(!0),this.onIsVisibleChangedObservable.notifyObservers(t))}get isDirty(){return this._isDirty}get linkedMesh(){return this._linkedMesh}get descendantsOnlyPadding(){return this._descendantsOnlyPadding}set descendantsOnlyPadding(t){this._descendantsOnlyPadding!==t&&(this._descendantsOnlyPadding=t,this._markAsDirty())}get paddingLeft(){return this._paddingLeft.toString(this._host)}set paddingLeft(t){this._paddingLeft.fromString(t)&&this._markAsDirty()}get paddingLeftInPixels(){return this._paddingLeft.getValueInPixel(this._host,this._cachedParentMeasure.width)}set paddingLeftInPixels(t){isNaN(t)||(this.paddingLeft=t+"px")}get _paddingLeftInPixels(){return this._descendantsOnlyPadding?0:this.paddingLeftInPixels}get paddingRight(){return this._paddingRight.toString(this._host)}set paddingRight(t){this._paddingRight.fromString(t)&&this._markAsDirty()}get paddingRightInPixels(){return this._paddingRight.getValueInPixel(this._host,this._cachedParentMeasure.width)}set paddingRightInPixels(t){isNaN(t)||(this.paddingRight=t+"px")}get _paddingRightInPixels(){return this._descendantsOnlyPadding?0:this.paddingRightInPixels}get paddingTop(){return this._paddingTop.toString(this._host)}set paddingTop(t){this._paddingTop.fromString(t)&&this._markAsDirty()}get paddingTopInPixels(){return this._paddingTop.getValueInPixel(this._host,this._cachedParentMeasure.height)}set paddingTopInPixels(t){isNaN(t)||(this.paddingTop=t+"px")}get _paddingTopInPixels(){return this._descendantsOnlyPadding?0:this.paddingTopInPixels}get paddingBottom(){return this._paddingBottom.toString(this._host)}set paddingBottom(t){this._paddingBottom.fromString(t)&&this._markAsDirty()}get paddingBottomInPixels(){return this._paddingBottom.getValueInPixel(this._host,this._cachedParentMeasure.height)}set paddingBottomInPixels(t){isNaN(t)||(this.paddingBottom=t+"px")}get _paddingBottomInPixels(){return this._descendantsOnlyPadding?0:this.paddingBottomInPixels}get left(){return this._left.toString(this._host)}set left(t){this._left.fromString(t)&&this._markAsDirty()}get leftInPixels(){return this._left.getValueInPixel(this._host,this._cachedParentMeasure.width)}set leftInPixels(t){isNaN(t)||(this.left=t+"px")}get top(){return this._top.toString(this._host)}set top(t){this._top.fromString(t)&&this._markAsDirty()}get topInPixels(){return this._top.getValueInPixel(this._host,this._cachedParentMeasure.height)}set topInPixels(t){isNaN(t)||(this.top=t+"px")}get linkOffsetX(){return this._linkOffsetX.toString(this._host)}set linkOffsetX(t){this._linkOffsetX.fromString(t)&&this._markAsDirty()}get linkOffsetXInPixels(){return this._linkOffsetX.getValueInPixel(this._host,this._cachedParentMeasure.width)}set linkOffsetXInPixels(t){isNaN(t)||(this.linkOffsetX=t+"px")}get linkOffsetY(){return this._linkOffsetY.toString(this._host)}set linkOffsetY(t){this._linkOffsetY.fromString(t)&&this._markAsDirty()}get linkOffsetYInPixels(){return this._linkOffsetY.getValueInPixel(this._host,this._cachedParentMeasure.height)}set linkOffsetYInPixels(t){isNaN(t)||(this.linkOffsetY=t+"px")}get centerX(){return this._currentMeasure.left+this._currentMeasure.width/2}get centerY(){return this._currentMeasure.top+this._currentMeasure.height/2}get isEnabled(){return this._isEnabled}set isEnabled(t){if(this._isEnabled===t)return;this._isEnabled=t,this._markAsDirty();const i=o=>{if(!!o.host){for(const a in o.host._lastControlOver)o===this.host._lastControlOver[a]&&(o._onPointerOut(o,null,!0),delete o.host._lastControlOver[a]);o.children!==void 0&&o.children.forEach(i)}};i(this)}get disabledColor(){return this._disabledColor}set disabledColor(t){this._disabledColor!==t&&(this._disabledColor=t,this._markAsDirty())}get disabledColorItem(){return this._disabledColorItem}set disabledColorItem(t){this._disabledColorItem!==t&&(this._disabledColorItem=t,this._markAsDirty())}constructor(t){this.name=t,this._alpha=1,this._alphaSet=!1,this._zIndex=0,this._currentMeasure=g.Measure.Empty(),this._tempPaddingMeasure=g.Measure.Empty(),this._fontFamily="Arial",this._fontStyle="",this._fontWeight="",this._fontSize=new f.ValueAndUnit(18,f.ValueAndUnit.UNITMODE_PIXEL,!1),this._width=new f.ValueAndUnit(1,f.ValueAndUnit.UNITMODE_PERCENTAGE,!1),this._height=new f.ValueAndUnit(1,f.ValueAndUnit.UNITMODE_PERCENTAGE,!1),this._color="",this._style=null,this._horizontalAlignment=e.HORIZONTAL_ALIGNMENT_CENTER,this._verticalAlignment=e.VERTICAL_ALIGNMENT_CENTER,this._isDirty=!0,this._wasDirty=!1,this._tempParentMeasure=g.Measure.Empty(),this._prevCurrentMeasureTransformedIntoGlobalSpace=g.Measure.Empty(),this._cachedParentMeasure=g.Measure.Empty(),this._descendantsOnlyPadding=!1,this._paddingLeft=new f.ValueAndUnit(0),this._paddingRight=new f.ValueAndUnit(0),this._paddingTop=new f.ValueAndUnit(0),this._paddingBottom=new f.ValueAndUnit(0),this._left=new f.ValueAndUnit(0),this._top=new f.ValueAndUnit(0),this._scaleX=1,this._scaleY=1,this._rotation=0,this._transformCenterX=.5,this._transformCenterY=.5,this._transformMatrix=d.Matrix2D.Identity(),this._invertTransformMatrix=d.Matrix2D.Identity(),this._transformedPosition=r.Vector2.Zero(),this._isMatrixDirty=!0,this._isVisible=!0,this._isHighlighted=!1,this._highlightColor="#4affff",this._highlightLineWidth=2,this._fontSet=!1,this._dummyVector2=r.Vector2.Zero(),this._downCount=0,this._enterCount=-1,this._doNotRender=!1,this._downPointerIds={},this._evaluatedMeasure=new g.Measure(0,0,0,0),this._evaluatedParentMeasure=new g.Measure(0,0,0,0),this._isEnabled=!0,this._disabledColor="#9a9a9a",this._disabledColorItem="#6a6a6a",this._isReadOnly=!1,this._gradient=null,this._rebuildLayout=!1,this._customData={},this._isClipped=!1,this._automaticSize=!1,this.metadata=null,this.isHitTestVisible=!0,this.isPointerBlocker=!1,this.isFocusInvisible=!1,this._clipChildren=!0,this._clipContent=!0,this.useBitmapCache=!1,this._shadowOffsetX=0,this._shadowOffsetY=0,this._shadowBlur=0,this._previousShadowBlur=0,this._shadowColor="black",this.hoverCursor="",this._linkOffsetX=new f.ValueAndUnit(0),this._linkOffsetY=new f.ValueAndUnit(0),this._accessibilityTag=null,this.onAccessibilityTagChangedObservable=new r.Observable,this.onWheelObservable=new r.Observable,this.onPointerMoveObservable=new r.Observable,this.onPointerOutObservable=new r.Observable,this.onPointerDownObservable=new r.Observable,this.onPointerUpObservable=new r.Observable,this.onPointerClickObservable=new r.Observable,this.onPointerEnterObservable=new r.Observable,this.onDirtyObservable=new r.Observable,this.onBeforeDrawObservable=new r.Observable,this.onAfterDrawObservable=new r.Observable,this.onDisposeObservable=new r.Observable,this.onIsVisibleChangedObservable=new r.Observable,this._fixedRatio=0,this._fixedRatioMasterIsWidth=!0,this.animations=null,this._tmpMeasureA=new g.Measure(0,0,0,0)}_getTypeName(){return"Control"}getAscendantOfClass(t){return this.parent?this.parent.getClassName()===t?this.parent:this.parent.getAscendantOfClass(t):null}markAsDirty(t=!1){this._markAsDirty(t)}markAllAsDirty(){this._markAllAsDirty()}_resetFontCache(){this._fontSet=!0,this._markAsDirty()}isAscendant(t){return this.parent?this.parent===t?!0:this.parent.isAscendant(t):!1}getLocalCoordinates(t){const i=r.Vector2.Zero();return this.getLocalCoordinatesToRef(t,i),i}getLocalCoordinatesToRef(t,i){return i.x=t.x-this._currentMeasure.left,i.y=t.y-this._currentMeasure.top,this}getParentLocalCoordinates(t){const i=r.Vector2.Zero();return i.x=t.x-this._cachedParentMeasure.left,i.y=t.y-this._cachedParentMeasure.top,i}moveToVector3(t,i){if(!this._host||this.parent!==this._host._rootContainer){r.Tools.Error("Cannot move a control to a vector3 if the control is not at root level");return}this.horizontalAlignment=e.HORIZONTAL_ALIGNMENT_LEFT,this.verticalAlignment=e.VERTICAL_ALIGNMENT_TOP;const o=this._host._getGlobalViewport(),a=r.Vector3.Project(t,r.Matrix.IdentityReadOnly,i.getTransformMatrix(),o);if(this._moveToProjectedPosition(a),a.z<0||a.z>1){this.notRenderable=!0;return}this.notRenderable=!1}getDescendantsToRef(t,i=!1,o){}getDescendants(t,i){const o=new Array;return this.getDescendantsToRef(o,t,i),o}linkWithMesh(t){if(!this._host||this.parent&&this.parent!==this._host._rootContainer){t&&r.Tools.Error("Cannot link a control to a mesh if the control is not at root level");return}const i=this._host._linkedControls.indexOf(this);if(i!==-1){this._linkedMesh=t,t||this._host._linkedControls.splice(i,1);return}else if(!t)return;this.horizontalAlignment=e.HORIZONTAL_ALIGNMENT_LEFT,this.verticalAlignment=e.VERTICAL_ALIGNMENT_TOP,this._linkedMesh=t,this._host._linkedControls.push(this)}setPadding(t,i,o,a){const l=t,c=i!=null?i:l,h=o!=null?o:l,u=a!=null?a:c;this.paddingTop=l,this.paddingRight=c,this.paddingBottom=h,this.paddingLeft=u}setPaddingInPixels(t,i,o,a){const l=t,c=i!=null?i:l,h=o!=null?o:l,u=a!=null?a:c;this.paddingTopInPixels=l,this.paddingRightInPixels=c,this.paddingBottomInPixels=h,this.paddingLeftInPixels=u}_moveToProjectedPosition(t){var u;const i=this._left.getValue(this._host),o=this._top.getValue(this._host),a=(u=this.parent)==null?void 0:u._currentMeasure;a&&this._processMeasures(a,this._host.getContext());let l=t.x+this._linkOffsetX.getValue(this._host)-this._currentMeasure.width/2,c=t.y+this._linkOffsetY.getValue(this._host)-this._currentMeasure.height/2;const h=this._left.ignoreAdaptiveScaling&&this._top.ignoreAdaptiveScaling;h&&(Math.abs(l-i)<.5&&(l=i),Math.abs(c-o)<.5&&(c=o)),!(!h&&i===l&&o===c)&&(this.left=l+"px",this.top=c+"px",this._left.ignoreAdaptiveScaling=!0,this._top.ignoreAdaptiveScaling=!0,this._markAsDirty())}_offsetLeft(t){this._isDirty=!0,this._currentMeasure.left+=t}_offsetTop(t){this._isDirty=!0,this._currentMeasure.top+=t}_markMatrixAsDirty(){this._isMatrixDirty=!0,this._flagDescendantsAsMatrixDirty()}_flagDescendantsAsMatrixDirty(){}_intersectsRect(t,i){return this._transform(i),!(this._evaluatedMeasure.left>=t.left+t.width||this._evaluatedMeasure.top>=t.top+t.height||this._evaluatedMeasure.left+this._evaluatedMeasure.width<=t.left||this._evaluatedMeasure.top+this._evaluatedMeasure.height<=t.top)}_computeAdditionnalOffsetX(){return 0}_computeAdditionnalOffsetY(){return 0}invalidateRect(){if(this._transform(),this.host&&this.host.useInvalidateRectOptimization){this._currentMeasure.transformToRef(this._transformMatrix,this._tmpMeasureA),g.Measure.CombineToRef(this._tmpMeasureA,this._prevCurrentMeasureTransformedIntoGlobalSpace,this._tmpMeasureA);const t=this.shadowOffsetX,i=this.shadowOffsetY,o=Math.max(this._previousShadowBlur,this.shadowBlur),a=Math.min(Math.min(t,0)-o*2,0),l=Math.max(Math.max(t,0)+o*2,0),c=Math.min(Math.min(i,0)-o*2,0),h=Math.max(Math.max(i,0)+o*2,0),u=this._computeAdditionnalOffsetX(),m=this._computeAdditionnalOffsetY();this.host.invalidateRect(Math.floor(this._tmpMeasureA.left+a-u),Math.floor(this._tmpMeasureA.top+c-m),Math.ceil(this._tmpMeasureA.left+this._tmpMeasureA.width+l+u),Math.ceil(this._tmpMeasureA.top+this._tmpMeasureA.height+h+m))}}_markAsDirty(t=!1){!this._isVisible&&!t||(this._isDirty=!0,this._markMatrixAsDirty(),this._host&&this._host.markAsDirty())}_markAllAsDirty(){this._markAsDirty(),this._font&&this._prepareFont()}_link(t){this._host=t,this._host&&(this.uniqueId=this._host.getScene().getUniqueId())}_transform(t){if(!this._isMatrixDirty&&this._scaleX===1&&this._scaleY===1&&this._rotation===0)return;const i=this._currentMeasure.width*this._transformCenterX+this._currentMeasure.left,o=this._currentMeasure.height*this._transformCenterY+this._currentMeasure.top;t&&(t.translate(i,o),t.rotate(this._rotation),t.scale(this._scaleX,this._scaleY),t.translate(-i,-o)),(this._isMatrixDirty||this._cachedOffsetX!==i||this._cachedOffsetY!==o)&&(this._cachedOffsetX=i,this._cachedOffsetY=o,this._isMatrixDirty=!1,this._flagDescendantsAsMatrixDirty(),d.Matrix2D.ComposeToRef(-i,-o,this._rotation,this._scaleX,this._scaleY,this.parent?this.parent._transformMatrix:null,this._transformMatrix),this._transformMatrix.invertToRef(this._invertTransformMatrix),this._currentMeasure.transformToRef(this._transformMatrix,this._evaluatedMeasure))}_renderHighlight(t){!this.isHighlighted||(t.save(),t.strokeStyle=this._highlightColor,t.lineWidth=this._highlightLineWidth,this._renderHighlightSpecific(t),t.restore())}_renderHighlightSpecific(t){t.strokeRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height)}_getColor(t){return this.gradient?this.gradient.getCanvasGradient(t):this.color}_applyStates(t){this._isFontSizeInPercentage&&(this._fontSet=!0),this._host&&this._host.useSmallestIdeal&&!this._font&&(this._fontSet=!0),this._fontSet&&(this._prepareFont(),this._fontSet=!1),this._font&&(t.font=this._font),(this._color||this.gradient)&&(t.fillStyle=this._getColor(t)),e.AllowAlphaInheritance?t.globalAlpha*=this._alpha:this._alphaSet&&(t.globalAlpha=this.parent&&!this.parent.renderToIntermediateTexture?this.parent.alpha*this._alpha:this._alpha)}_layout(t,i){if(!this.isDirty&&(!this.isVisible||this.notRenderable))return!1;if(this._isDirty||!this._cachedParentMeasure.isEqualsTo(t)){this.host._numLayoutCalls++,this._currentMeasure.addAndTransformToRef(this._transformMatrix,-this._paddingLeftInPixels|0,-this._paddingTopInPixels|0,this._paddingRightInPixels|0,this._paddingBottomInPixels|0,this._prevCurrentMeasureTransformedIntoGlobalSpace),i.save(),this._applyStates(i);let o=0;do this._rebuildLayout=!1,this._processMeasures(t,i),o++;while(this._rebuildLayout&&o<3);o>=3&&r.Logger.Error(`Layout cycle detected in GUI (Control name=${this.name}, uniqueId=${this.uniqueId})`),i.restore(),this.invalidateRect(),this._evaluateClippingState(t)}return this._wasDirty=this._isDirty,this._isDirty=!1,!0}_processMeasures(t,i){this._tempPaddingMeasure.copyFrom(t),this.parent&&this.parent.descendantsOnlyPadding&&(this._tempPaddingMeasure.left+=this.parent.paddingLeftInPixels,this._tempPaddingMeasure.top+=this.parent.paddingTopInPixels,this._tempPaddingMeasure.width-=this.parent.paddingLeftInPixels+this.parent.paddingRightInPixels,this._tempPaddingMeasure.height-=this.parent.paddingTopInPixels+this.parent.paddingBottomInPixels),this._currentMeasure.copyFrom(this._tempPaddingMeasure),this._preMeasure(this._tempPaddingMeasure,i),this._measure(),this._computeAlignment(this._tempPaddingMeasure,i),this._currentMeasure.left=this._currentMeasure.left|0,this._currentMeasure.top=this._currentMeasure.top|0,this._currentMeasure.width=this._currentMeasure.width|0,this._currentMeasure.height=this._currentMeasure.height|0,this._additionalProcessing(this._tempPaddingMeasure,i),this._cachedParentMeasure.copyFrom(this._tempPaddingMeasure),this._currentMeasure.transformToRef(this._transformMatrix,this._evaluatedMeasure),this.onDirtyObservable.hasObservers()&&this.onDirtyObservable.notifyObservers(this)}_evaluateClippingState(t){if(this._transform(),this._currentMeasure.transformToRef(this._transformMatrix,this._evaluatedMeasure),this.parent&&this.parent.clipChildren){if(t.transformToRef(this.parent._transformMatrix,this._evaluatedParentMeasure),this._evaluatedMeasure.left>this._evaluatedParentMeasure.left+this._evaluatedParentMeasure.width){this._isClipped=!0;return}if(this._evaluatedMeasure.left+this._evaluatedMeasure.width<this._evaluatedParentMeasure.left){this._isClipped=!0;return}if(this._evaluatedMeasure.top>this._evaluatedParentMeasure.top+this._evaluatedParentMeasure.height){this._isClipped=!0;return}if(this._evaluatedMeasure.top+this._evaluatedMeasure.height<this._evaluatedParentMeasure.top){this._isClipped=!0;return}}this._isClipped=!1}_measure(){this._width.isPixel?this._currentMeasure.width=this._width.getValue(this._host):this._currentMeasure.width*=this._width.getValue(this._host),this._height.isPixel?this._currentMeasure.height=this._height.getValue(this._host):this._currentMeasure.height*=this._height.getValue(this._host),this._fixedRatio!==0&&(this._fixedRatioMasterIsWidth?this._currentMeasure.height=this._currentMeasure.width*this._fixedRatio:this._currentMeasure.width=this._currentMeasure.height*this._fixedRatio)}_computeAlignment(t,i){const o=this._currentMeasure.width,a=this._currentMeasure.height,l=t.width,c=t.height;let h=0,u=0;switch(this.horizontalAlignment){case e.HORIZONTAL_ALIGNMENT_LEFT:h=0;break;case e.HORIZONTAL_ALIGNMENT_RIGHT:h=l-o;break;case e.HORIZONTAL_ALIGNMENT_CENTER:h=(l-o)/2;break}switch(this.verticalAlignment){case e.VERTICAL_ALIGNMENT_TOP:u=0;break;case e.VERTICAL_ALIGNMENT_BOTTOM:u=c-a;break;case e.VERTICAL_ALIGNMENT_CENTER:u=(c-a)/2;break}this.descendantsOnlyPadding||(this._paddingLeft.isPixel?(this._currentMeasure.left+=this._paddingLeft.getValue(this._host),this._currentMeasure.width-=this._paddingLeft.getValue(this._host)):(this._currentMeasure.left+=l*this._paddingLeft.getValue(this._host),this._currentMeasure.width-=l*this._paddingLeft.getValue(this._host)),this._paddingRight.isPixel?this._currentMeasure.width-=this._paddingRight.getValue(this._host):this._currentMeasure.width-=l*this._paddingRight.getValue(this._host),this._paddingTop.isPixel?(this._currentMeasure.top+=this._paddingTop.getValue(this._host),this._currentMeasure.height-=this._paddingTop.getValue(this._host)):(this._currentMeasure.top+=c*this._paddingTop.getValue(this._host),this._currentMeasure.height-=c*this._paddingTop.getValue(this._host)),this._paddingBottom.isPixel?this._currentMeasure.height-=this._paddingBottom.getValue(this._host):this._currentMeasure.height-=c*this._paddingBottom.getValue(this._host)),this._left.isPixel?this._currentMeasure.left+=this._left.getValue(this._host):this._currentMeasure.left+=l*this._left.getValue(this._host),this._top.isPixel?this._currentMeasure.top+=this._top.getValue(this._host):this._currentMeasure.top+=c*this._top.getValue(this._host),this._currentMeasure.left+=h,this._currentMeasure.top+=u}_preMeasure(t,i){}_additionalProcessing(t,i){}_clipForChildren(t){}_clip(t,i){if(t.beginPath(),e._ClipMeasure.copyFrom(this._currentMeasure),i){i.transformToRef(this._invertTransformMatrix,this._tmpMeasureA);const o=new g.Measure(0,0,0,0);o.left=Math.max(this._tmpMeasureA.left,this._currentMeasure.left),o.top=Math.max(this._tmpMeasureA.top,this._currentMeasure.top),o.width=Math.min(this._tmpMeasureA.left+this._tmpMeasureA.width,this._currentMeasure.left+this._currentMeasure.width)-o.left,o.height=Math.min(this._tmpMeasureA.top+this._tmpMeasureA.height,this._currentMeasure.top+this._currentMeasure.height)-o.top,e._ClipMeasure.copyFrom(o)}if(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY){const o=this.shadowOffsetX,a=this.shadowOffsetY,l=this.shadowBlur,c=Math.min(Math.min(o,0)-l*2,0),h=Math.max(Math.max(o,0)+l*2,0),u=Math.min(Math.min(a,0)-l*2,0),m=Math.max(Math.max(a,0)+l*2,0);t.rect(e._ClipMeasure.left+c,e._ClipMeasure.top+u,e._ClipMeasure.width+h-c,e._ClipMeasure.height+m-u)}else t.rect(e._ClipMeasure.left,e._ClipMeasure.top,e._ClipMeasure.width,e._ClipMeasure.height);t.clip()}_render(t,i){return!this.isVisible||this.notRenderable||this._isClipped?(this._isDirty=!1,!1):(this.host._numRenderCalls++,t.save(),this._applyStates(t),this._transform(t),this.clipContent&&this._clip(t,i),this.onBeforeDrawObservable.hasObservers()&&this.onBeforeDrawObservable.notifyObservers(this),this.useBitmapCache&&!this._wasDirty&&this._cacheData?t.putImageData(this._cacheData,this._currentMeasure.left,this._currentMeasure.top):this._draw(t,i),this.useBitmapCache&&this._wasDirty&&(this._cacheData=t.getImageData(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height)),this._renderHighlight(t),this.onAfterDrawObservable.hasObservers()&&this.onAfterDrawObservable.notifyObservers(this),t.restore(),!0)}_draw(t,i){}contains(t,i){return this._invertTransformMatrix.transformCoordinates(t,i,this._transformedPosition),t=this._transformedPosition.x,i=this._transformedPosition.y,t<this._currentMeasure.left||t>this._currentMeasure.left+this._currentMeasure.width||i<this._currentMeasure.top||i>this._currentMeasure.top+this._currentMeasure.height?!1:(this.isPointerBlocker&&(this._host._shouldBlockPointer=!0),!0)}_processPicking(t,i,o,a,l,c,h,u){return!this._isEnabled||!this.isHitTestVisible||!this.isVisible||this._doNotRender||!this.contains(t,i)?!1:(this._processObservables(a,t,i,o,l,c,h,u),!0)}_onPointerMove(t,i,o,a){this.onPointerMoveObservable.notifyObservers(i,-1,t,this,a)&&this.parent!=null&&!this.isPointerBlocker&&this.parent._onPointerMove(t,i,o,a)}_onPointerEnter(t,i){return!this._isEnabled||this._enterCount>0?!1:(this._enterCount===-1&&(this._enterCount=0),this._enterCount++,this.onPointerEnterObservable.notifyObservers(this,-1,t,this,i)&&this.parent!=null&&!this.isPointerBlocker&&this.parent._onPointerEnter(t,i),!0)}_onPointerOut(t,i,o=!1){if(!o&&(!this._isEnabled||t===this))return;this._enterCount=0;let a=!0;t.isAscendant(this)||(a=this.onPointerOutObservable.notifyObservers(this,-1,t,this,i)),a&&this.parent!=null&&!this.isPointerBlocker&&this.parent._onPointerOut(t,i,o)}_onPointerDown(t,i,o,a,l){return this._onPointerEnter(this,l),this._downCount!==0?!1:(this._downCount++,this._downPointerIds[o]=!0,this.onPointerDownObservable.notifyObservers(new d.Vector2WithInfo(i,a),-1,t,this,l)&&this.parent!=null&&!this.isPointerBlocker&&this.parent._onPointerDown(t,i,o,a,l),l&&this.uniqueId!==this._host.rootContainer.uniqueId&&this._host._capturedPointerIds.add(l.event.pointerId),!0)}_onPointerUp(t,i,o,a,l,c){if(!this._isEnabled)return;this._downCount=0,delete this._downPointerIds[o];let h=l;l&&(this._enterCount>0||this._enterCount===-1)&&(h=this.onPointerClickObservable.notifyObservers(new d.Vector2WithInfo(i,a),-1,t,this,c)),this.onPointerUpObservable.notifyObservers(new d.Vector2WithInfo(i,a),-1,t,this,c)&&this.parent!=null&&!this.isPointerBlocker&&this.parent._onPointerUp(t,i,o,a,h,c),c&&this.uniqueId!==this._host.rootContainer.uniqueId&&this._host._capturedPointerIds.delete(c.event.pointerId)}_forcePointerUp(t=null){if(t!==null)this._onPointerUp(this,r.Vector2.Zero(),t,0,!0);else for(const i in this._downPointerIds)this._onPointerUp(this,r.Vector2.Zero(),+i,0,!0)}_onWheelScroll(t,i){if(!this._isEnabled)return;this.onWheelObservable.notifyObservers(new r.Vector2(t,i))&&this.parent!=null&&this.parent._onWheelScroll(t,i)}_onCanvasBlur(){}_processObservables(t,i,o,a,l,c,h,u){if(!this._isEnabled)return!1;if(this._dummyVector2.copyFromFloats(i,o),t===r.PointerEventTypes.POINTERMOVE){this._onPointerMove(this,this._dummyVector2,l,a);const m=this._host._lastControlOver[l];return m&&m!==this&&m._onPointerOut(this,a),m!==this&&this._onPointerEnter(this,a),this._host._lastControlOver[l]=this,!0}return t===r.PointerEventTypes.POINTERDOWN?(this._onPointerDown(this,this._dummyVector2,l,c,a),this._host._registerLastControlDown(this,l),this._host._lastPickedControl=this,!0):t===r.PointerEventTypes.POINTERUP?(this._host._lastControlDown[l]&&this._host._lastControlDown[l]._onPointerUp(this,this._dummyVector2,l,c,!0,a),delete this._host._lastControlDown[l],!0):t===r.PointerEventTypes.POINTERWHEEL&&this._host._lastControlOver[l]?(this._host._lastControlOver[l]._onWheelScroll(h,u),!0):!1}_prepareFont(){!this._font&&!this._fontSet||(this._style?this._font=this._style.fontStyle+" "+this._style.fontWeight+" "+this.fontSizeInPixels+"px "+this._style.fontFamily:this._font=this._fontStyle+" "+this._fontWeight+" "+this.fontSizeInPixels+"px "+this._fontFamily,this._fontOffset=e._GetFontOffset(this._font),this.getDescendants().forEach(t=>t._markAllAsDirty()))}clone(t){const i={};this.serialize(i);const o=r.Tools.Instantiate("BABYLON.GUI."+i.className),a=new o;return a.parse(i,t),a}parse(t,i){return r.SerializationHelper.Parse(()=>this,t,null),this.name=t.name,this._parseFromContent(t,i!=null?i:this._host),this}serialize(t){r.SerializationHelper.Serialize(this,t),t.name=this.name,t.className=this.getClassName(),this._prepareFont(),this._font&&(t.fontFamily=this._fontFamily,t.fontSize=this.fontSize,t.fontWeight=this.fontWeight,t.fontStyle=this.fontStyle),this._gradient&&(t.gradient={},this._gradient.serialize(t.gradient)),r.SerializationHelper.AppendSerializedAnimations(this,t)}_parseFromContent(t,i){var o,a;if(t.fontFamily&&(this.fontFamily=t.fontFamily),t.fontSize&&(this.fontSize=t.fontSize),t.fontWeight&&(this.fontWeight=t.fontWeight),t.fontStyle&&(this.fontStyle=t.fontStyle),t.gradient){const l=r.Tools.Instantiate("BABYLON.GUI."+t.gradient.className);this._gradient=new l,(o=this._gradient)==null||o.parse(t.gradient)}if(t.animations){this.animations=[];for(let l=0;l<t.animations.length;l++){const c=t.animations[l],h=(0,r.GetClass)("BABYLON.Animation");h&&this.animations.push(h.Parse(c))}t.autoAnimate&&this._host&&this._host.getScene()&&this._host.getScene().beginAnimation(this,t.autoAnimateFrom,t.autoAnimateTo,t.autoAnimateLoop,t.autoAnimateSpeed||1)}this.fixedRatioMasterIsWidth=(a=t.fixedRatioMasterIsWidth)!=null?a:this.fixedRatioMasterIsWidth}dispose(){this.onDirtyObservable.clear(),this.onBeforeDrawObservable.clear(),this.onAfterDrawObservable.clear(),this.onPointerDownObservable.clear(),this.onPointerEnterObservable.clear(),this.onPointerMoveObservable.clear(),this.onPointerOutObservable.clear(),this.onPointerUpObservable.clear(),this.onPointerClickObservable.clear(),this.onWheelObservable.clear(),this._styleObserver&&this._style&&(this._style.onChangedObservable.remove(this._styleObserver),this._styleObserver=null),this.parent&&(this.parent.removeControl(this),this.parent=null),this._host&&this._host._linkedControls.indexOf(this)>-1&&this.linkWithMesh(null),this.onDisposeObservable.notifyObservers(this),this.onDisposeObservable.clear()}static get HORIZONTAL_ALIGNMENT_LEFT(){return e._HORIZONTAL_ALIGNMENT_LEFT}static get HORIZONTAL_ALIGNMENT_RIGHT(){return e._HORIZONTAL_ALIGNMENT_RIGHT}static get HORIZONTAL_ALIGNMENT_CENTER(){return e._HORIZONTAL_ALIGNMENT_CENTER}static get VERTICAL_ALIGNMENT_TOP(){return e._VERTICAL_ALIGNMENT_TOP}static get VERTICAL_ALIGNMENT_BOTTOM(){return e._VERTICAL_ALIGNMENT_BOTTOM}static get VERTICAL_ALIGNMENT_CENTER(){return e._VERTICAL_ALIGNMENT_CENTER}static _GetFontOffset(t){if(e._FontHeightSizes[t])return e._FontHeightSizes[t];const i=r.EngineStore.LastCreatedEngine;if(!i)throw new Error("Invalid engine. Unable to create a canvas.");const o=i.getFontOffset(t);return e._FontHeightSizes[t]=o,o}static Parse(t,i){const o=r.Tools.Instantiate("BABYLON.GUI."+t.className),a=r.SerializationHelper.Parse(()=>new o,t,null);return a.name=t.name,a._parseFromContent(t,i),a}static drawEllipse(t,i,o,a,l){l.translate(t,i),l.scale(o,a),l.beginPath(),l.arc(0,0,1,0,2*Math.PI),l.closePath(),l.scale(1/o,1/a),l.translate(-t,-i)}isReady(){return!0}}e.AllowAlphaInheritance=!1,e._ClipMeasure=new g.Measure(0,0,0,0),e._HORIZONTAL_ALIGNMENT_LEFT=0,e._HORIZONTAL_ALIGNMENT_RIGHT=1,e._HORIZONTAL_ALIGNMENT_CENTER=2,e._VERTICAL_ALIGNMENT_TOP=0,e._VERTICAL_ALIGNMENT_BOTTOM=1,e._VERTICAL_ALIGNMENT_CENTER=2,e._FontHeightSizes={},e.AddHeader=()=>{},(0,s.__decorate)([(0,r.serialize)()],e.prototype,"metadata",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"isHitTestVisible",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"isPointerBlocker",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"isFocusInvisible",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"clipChildren",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"clipContent",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"useBitmapCache",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"shadowOffsetX",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"shadowOffsetY",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"shadowBlur",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"shadowColor",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"hoverCursor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"fontOffset",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"alpha",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"scaleX",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"scaleY",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rotation",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"transformCenterY",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"transformCenterX",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"horizontalAlignment",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"verticalAlignment",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"fixedRatio",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"fixedRatioMasterIsWidth",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"width",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"height",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"style",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"color",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"gradient",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"zIndex",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"notRenderable",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"isVisible",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"descendantsOnlyPadding",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"paddingLeft",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"paddingRight",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"paddingTop",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"paddingBottom",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"left",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"top",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"linkOffsetX",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"linkOffsetY",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"isEnabled",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"disabledColor",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"disabledColorItem",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"overlapGroup",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"overlapDeltaMultiplier",void 0),(0,r.RegisterClass)("BABYLON.GUI.Control",e)},"../../../dev/gui/dist/2D/controls/displayGrid.js":(C,v,n)=>{n.r(v),n.d(v,{DisplayGrid:()=>g});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("../../../dev/gui/dist/2D/controls/control.js"),p=n("core/Misc/observable"),f=n.n(p);class g extends r.Control{get displayMinorLines(){return this._displayMinorLines}set displayMinorLines(e){this._displayMinorLines!==e&&(this._displayMinorLines=e,this._markAsDirty())}get displayMajorLines(){return this._displayMajorLines}set displayMajorLines(e){this._displayMajorLines!==e&&(this._displayMajorLines=e,this._markAsDirty())}get background(){return this._background}set background(e){this._background!==e&&(this._background=e,this._markAsDirty())}get cellWidth(){return this._cellWidth}set cellWidth(e){this._cellWidth=e,this._markAsDirty()}get cellHeight(){return this._cellHeight}set cellHeight(e){this._cellHeight=e,this._markAsDirty()}get minorLineTickness(){return this._minorLineTickness}set minorLineTickness(e){this._minorLineTickness=e,this._markAsDirty()}get minorLineColor(){return this._minorLineColor}set minorLineColor(e){this._minorLineColor=e,this._markAsDirty()}get majorLineTickness(){return this._majorLineTickness}set majorLineTickness(e){this._majorLineTickness=e,this._markAsDirty()}get majorLineColor(){return this._majorLineColor}set majorLineColor(e){this._majorLineColor=e,this._markAsDirty()}get majorLineFrequency(){return this._majorLineFrequency}set majorLineFrequency(e){this._majorLineFrequency=e,this._markAsDirty()}constructor(e){super(e);this.name=e,this._cellWidth=20,this._cellHeight=20,this._minorLineTickness=1,this._minorLineColor="DarkGray",this._majorLineTickness=2,this._majorLineColor="White",this._majorLineFrequency=5,this._background="Black",this._displayMajorLines=!0,this._displayMinorLines=!0}_draw(e){if(e.save(),this._applyStates(e),this._isEnabled){this._background&&(e.fillStyle=this._background,e.fillRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height));const _=this._currentMeasure.width/this._cellWidth,t=this._currentMeasure.height/this._cellHeight,i=this._currentMeasure.left+this._currentMeasure.width/2,o=this._currentMeasure.top+this._currentMeasure.height/2;if(this._displayMinorLines){e.strokeStyle=this._minorLineColor,e.lineWidth=this._minorLineTickness;for(let a=-_/2+1;a<_/2;a++){const l=i+a*this.cellWidth;e.beginPath(),e.moveTo(l,this._currentMeasure.top),e.lineTo(l,this._currentMeasure.top+this._currentMeasure.height),e.stroke()}for(let a=-t/2+1;a<t/2;a++){const l=o+a*this.cellHeight;e.beginPath(),e.moveTo(this._currentMeasure.left,l),e.lineTo(this._currentMeasure.left+this._currentMeasure.width,l),e.stroke()}}if(this._displayMajorLines){e.strokeStyle=this._majorLineColor,e.lineWidth=this._majorLineTickness;for(let a=-_/2+this._majorLineFrequency;a<_/2;a+=this._majorLineFrequency){const l=i+a*this.cellWidth;e.beginPath(),e.moveTo(l,this._currentMeasure.top),e.lineTo(l,this._currentMeasure.top+this._currentMeasure.height),e.stroke()}for(let a=-t/2+this._majorLineFrequency;a<t/2;a+=this._majorLineFrequency){const l=o+a*this.cellHeight;e.moveTo(this._currentMeasure.left,l),e.lineTo(this._currentMeasure.left+this._currentMeasure.width,l),e.closePath(),e.stroke()}}}e.restore()}_getTypeName(){return"DisplayGrid"}}(0,s.__decorate)([(0,p.serialize)()],g.prototype,"displayMinorLines",null),(0,s.__decorate)([(0,p.serialize)()],g.prototype,"displayMajorLines",null),(0,s.__decorate)([(0,p.serialize)()],g.prototype,"background",null),(0,s.__decorate)([(0,p.serialize)()],g.prototype,"cellWidth",null),(0,s.__decorate)([(0,p.serialize)()],g.prototype,"cellHeight",null),(0,s.__decorate)([(0,p.serialize)()],g.prototype,"minorLineTickness",null),(0,s.__decorate)([(0,p.serialize)()],g.prototype,"minorLineColor",null),(0,s.__decorate)([(0,p.serialize)()],g.prototype,"majorLineTickness",null),(0,s.__decorate)([(0,p.serialize)()],g.prototype,"majorLineColor",null),(0,s.__decorate)([(0,p.serialize)()],g.prototype,"majorLineFrequency",null),(0,p.RegisterClass)("BABYLON.GUI.DisplayGrid",g)},"../../../dev/gui/dist/2D/controls/ellipse.js":(C,v,n)=>{n.r(v),n.d(v,{Ellipse:()=>d});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("../../../dev/gui/dist/2D/controls/container.js"),p=n("../../../dev/gui/dist/2D/controls/control.js"),f=n("core/Misc/observable"),g=n.n(f);class d extends r.Container{get thickness(){return this._thickness}set thickness(_){this._thickness!==_&&(this._thickness=_,this._markAsDirty())}constructor(_){super(_);this.name=_,this._thickness=1}_getTypeName(){return"Ellipse"}_localDraw(_){_.save(),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(_.shadowColor=this.shadowColor,_.shadowBlur=this.shadowBlur,_.shadowOffsetX=this.shadowOffsetX,_.shadowOffsetY=this.shadowOffsetY),p.Control.drawEllipse(this._currentMeasure.left+this._currentMeasure.width/2,this._currentMeasure.top+this._currentMeasure.height/2,this._currentMeasure.width/2-this._thickness/2,this._currentMeasure.height/2-this._thickness/2,_),(this._backgroundGradient||this._background)&&(_.fillStyle=this._getBackgroundColor(_),_.fill()),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(_.shadowBlur=0,_.shadowOffsetX=0,_.shadowOffsetY=0),this._thickness&&(this.color&&(_.strokeStyle=this.color),_.lineWidth=this._thickness,_.stroke()),_.restore()}_additionalProcessing(_,t){super._additionalProcessing(_,t),this._measureForChildren.width-=2*this._thickness,this._measureForChildren.height-=2*this._thickness,this._measureForChildren.left+=this._thickness,this._measureForChildren.top+=this._thickness}_clipForChildren(_){p.Control.drawEllipse(this._currentMeasure.left+this._currentMeasure.width/2,this._currentMeasure.top+this._currentMeasure.height/2,this._currentMeasure.width/2,this._currentMeasure.height/2,_),_.clip()}_renderHighlightSpecific(_){p.Control.drawEllipse(this._currentMeasure.left+this._currentMeasure.width/2,this._currentMeasure.top+this._currentMeasure.height/2,this._currentMeasure.width/2-this._highlightLineWidth/2,this._currentMeasure.height/2-this._highlightLineWidth/2,_),_.stroke()}}(0,s.__decorate)([(0,f.serialize)()],d.prototype,"thickness",null),(0,f.RegisterClass)("BABYLON.GUI.Ellipse",d)},"../../../dev/gui/dist/2D/controls/focusableButton.js":(C,v,n)=>{n.r(v),n.d(v,{FocusableButton:()=>f});var s=n("../../../dev/gui/dist/2D/controls/button.js"),r=n("core/Misc/observable"),p=n.n(r);class f extends s.Button{constructor(d){super(d);this.name=d,this.focusedColor=null,this._isFocused=!1,this._unfocusedColor=null,this.onFocusObservable=new r.Observable,this.onBlurObservable=new r.Observable,this.onKeyboardEventProcessedObservable=new r.Observable,this._unfocusedColor=this.color}onBlur(){this._isFocused&&(this._isFocused=!1,this.focusedColor&&this._unfocusedColor!=null&&(this.color=this._unfocusedColor),this.onBlurObservable.notifyObservers(this))}onFocus(){this._isFocused=!0,this.focusedColor&&(this._unfocusedColor=this.color,this.color=this.focusedColor),this.onFocusObservable.notifyObservers(this)}keepsFocusWith(){return null}focus(){this._host.moveFocusToControl(this)}blur(){this._host.focusedControl=null}processKeyboard(d){this.onKeyboardEventProcessedObservable.notifyObservers(d,-1,this)}_onPointerDown(d,e,_,t,i){return this.isReadOnly||this.focus(),super._onPointerDown(d,e,_,t,i)}displose(){super.dispose(),this.onBlurObservable.clear(),this.onFocusObservable.clear(),this.onKeyboardEventProcessedObservable.clear()}}(0,r.RegisterClass)("BABYLON.GUI.FocusableButton",f)},"../../../dev/gui/dist/2D/controls/focusableControl.js":(C,v,n)=>{n.r(v)},"../../../dev/gui/dist/2D/controls/gradient/BaseGradient.js":(C,v,n)=>{n.r(v),n.d(v,{BaseGradient:()=>s});class s{constructor(){this._colorStops=[],this._gradientDirty=!0}_addColorStopsToCanvasGradient(){for(const p of this._colorStops)this._canvasGradient.addColorStop(p.offset,p.color)}getCanvasGradient(p){return(this._gradientDirty||this._context!==p)&&(this._context=p,this._canvasGradient=this._createCanvasGradient(p),this._addColorStopsToCanvasGradient(),this._gradientDirty=!1),this._canvasGradient}addColorStop(p,f){this._colorStops.push({offset:p,color:f}),this._gradientDirty=!0}removeColorStop(p){this._colorStops=this._colorStops.filter(f=>f.offset!==p),this._gradientDirty=!0}clearColorStops(){this._colorStops=[],this._gradientDirty=!0}get colorStops(){return this._colorStops}getClassName(){return"BaseGradient"}serialize(p){p.colorStops=this._colorStops,p.className=this.getClassName()}parse(p){this._colorStops=p.colorStops}}},"../../../dev/gui/dist/2D/controls/gradient/LinearGradient.js":(C,v,n)=>{n.r(v),n.d(v,{LinearGradient:()=>f});var s=n("../../../dev/gui/dist/2D/controls/gradient/BaseGradient.js"),r=n("core/Misc/observable"),p=n.n(r);class f extends s.BaseGradient{constructor(d,e,_,t){super();this._x0=d!=null?d:0,this._y0=e!=null?e:0,this._x1=_!=null?_:0,this._y1=t!=null?t:0}_createCanvasGradient(d){return d.createLinearGradient(this._x0,this._y0,this._x1,this._y1)}get x0(){return this._x0}get x1(){return this._x1}get y0(){return this._y0}get y1(){return this._y1}getClassName(){return"LinearGradient"}serialize(d){super.serialize(d),d.x0=this._x0,d.y0=this._y0,d.x1=this._x1,d.y1=this._y1}parse(d){super.parse(d),this._x0=d.x0,this._y0=d.y0,this._x1=d.x1,this._y1=d.y1}}(0,r.RegisterClass)("BABYLON.GUI.LinearGradient",f)},"../../../dev/gui/dist/2D/controls/gradient/RadialGradient.js":(C,v,n)=>{n.r(v),n.d(v,{RadialGradient:()=>f});var s=n("../../../dev/gui/dist/2D/controls/gradient/BaseGradient.js"),r=n("core/Misc/observable"),p=n.n(r);class f extends s.BaseGradient{constructor(d,e,_,t,i,o){super();this._x0=d!=null?d:0,this._y0=e!=null?e:0,this._r0=_!=null?_:0,this._x1=t!=null?t:0,this._y1=i!=null?i:0,this._r1=o!=null?o:0}_createCanvasGradient(d){return d.createRadialGradient(this._x0,this._y0,this._r0,this._x1,this._y1,this._r1)}get x0(){return this._x0}get x1(){return this._x1}get y0(){return this._y0}get y1(){return this._y1}get r0(){return this._r0}get r1(){return this._r1}getClassName(){return"RadialGradient"}serialize(d){super.serialize(d),d.x0=this._x0,d.y0=this._y0,d.r0=this._r0,d.x1=this._x1,d.y1=this._y1,d.r1=this._r1}parse(d){super.parse(d),this._x0=d.x0,this._y0=d.y0,this._r0=d.r0,this._x1=d.x1,this._y1=d.y1,this._r1=d.r1}}(0,r.RegisterClass)("BABYLON.GUI.RadialGradient",f)},"../../../dev/gui/dist/2D/controls/grid.js":(C,v,n)=>{n.r(v),n.d(v,{Grid:()=>e});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("../../../dev/gui/dist/2D/controls/container.js"),p=n("../../../dev/gui/dist/2D/valueAndUnit.js"),f=n("../../../dev/gui/dist/2D/controls/control.js"),g=n("core/Misc/observable"),d=n.n(g);class e extends r.Container{set clipContent(t){this._clipContent=t;for(const i in this._cells)this._cells[i].clipContent=t}get clipContent(){return this._clipContent}set clipChildren(t){this._clipChildren=t;for(const i in this._cells)this._cells[i].clipChildren=t}get clipChildren(){return this._clipChildren}get columnCount(){return this._columnDefinitions.length}get rowCount(){return this._rowDefinitions.length}get children(){return this._childControls}get cells(){return this._cells}getRowDefinition(t){return t<0||t>=this._rowDefinitions.length?null:this._rowDefinitions[t]}getColumnDefinition(t){return t<0||t>=this._columnDefinitions.length?null:this._columnDefinitions[t]}addRowDefinition(t,i=!1){return this._rowDefinitions.push(new p.ValueAndUnit(t,i?p.ValueAndUnit.UNITMODE_PIXEL:p.ValueAndUnit.UNITMODE_PERCENTAGE)),this._rowDefinitionObservers.push(this._rowDefinitions[this.rowCount-1].onChangedObservable.add(()=>this._markAsDirty())),this._markAsDirty(),this}addColumnDefinition(t,i=!1){return this._columnDefinitions.push(new p.ValueAndUnit(t,i?p.ValueAndUnit.UNITMODE_PIXEL:p.ValueAndUnit.UNITMODE_PERCENTAGE)),this._columnDefinitionObservers.push(this._columnDefinitions[this.columnCount-1].onChangedObservable.add(()=>this._markAsDirty())),this._markAsDirty(),this}setRowDefinition(t,i,o=!1){if(t<0||t>=this._rowDefinitions.length)return this;const a=this._rowDefinitions[t];return a&&a.isPixel===o&&a.value===i?this:(this._rowDefinitions[t].onChangedObservable.remove(this._rowDefinitionObservers[t]),this._rowDefinitions[t]=new p.ValueAndUnit(i,o?p.ValueAndUnit.UNITMODE_PIXEL:p.ValueAndUnit.UNITMODE_PERCENTAGE),this._rowDefinitionObservers[t]=this._rowDefinitions[t].onChangedObservable.add(()=>this._markAsDirty()),this._markAsDirty(),this)}setColumnDefinition(t,i,o=!1){if(t<0||t>=this._columnDefinitions.length)return this;const a=this._columnDefinitions[t];return a&&a.isPixel===o&&a.value===i?this:(this._columnDefinitions[t].onChangedObservable.remove(this._columnDefinitionObservers[t]),this._columnDefinitions[t]=new p.ValueAndUnit(i,o?p.ValueAndUnit.UNITMODE_PIXEL:p.ValueAndUnit.UNITMODE_PERCENTAGE),this._columnDefinitionObservers[t]=this._columnDefinitions[t].onChangedObservable.add(()=>this._markAsDirty()),this._markAsDirty(),this)}getChildrenAt(t,i){const o=this._cells[`${t}:${i}`];return o?o.children:null}getChildCellInfo(t){return t._tag}_removeCell(t,i){if(!!t){super.removeControl(t);for(const o of t.children){const a=this._childControls.indexOf(o);a!==-1&&this._childControls.splice(a,1)}delete this._cells[i]}}_offsetCell(t,i){if(!!this._cells[i]){this._cells[t]=this._cells[i];for(const o of this._cells[t].children)o._tag=t;delete this._cells[i]}}removeColumnDefinition(t){if(t<0||t>=this._columnDefinitions.length)return this;for(let i=0;i<this._rowDefinitions.length;i++){const o=`${i}:${t}`,a=this._cells[o];this._removeCell(a,o)}for(let i=0;i<this._rowDefinitions.length;i++)for(let o=t+1;o<this._columnDefinitions.length;o++){const a=`${i}:${o-1}`,l=`${i}:${o}`;this._offsetCell(a,l)}return this._columnDefinitions[t].onChangedObservable.remove(this._columnDefinitionObservers[t]),this._columnDefinitions.splice(t,1),this._columnDefinitionObservers.splice(t,1),this._markAsDirty(),this}removeRowDefinition(t){if(t<0||t>=this._rowDefinitions.length)return this;for(let i=0;i<this._columnDefinitions.length;i++){const o=`${t}:${i}`,a=this._cells[o];this._removeCell(a,o)}for(let i=0;i<this._columnDefinitions.length;i++)for(let o=t+1;o<this._rowDefinitions.length;o++){const a=`${o-1}:${i}`,l=`${o}:${i}`;this._offsetCell(a,l)}return this._rowDefinitions[t].onChangedObservable.remove(this._rowDefinitionObservers[t]),this._rowDefinitions.splice(t,1),this._rowDefinitionObservers.splice(t,1),this._markAsDirty(),this}addControl(t,i=0,o=0){if(this._rowDefinitions.length===0&&this.addRowDefinition(1,!1),this._columnDefinitions.length===0&&this.addColumnDefinition(1,!1),this._childControls.indexOf(t)!==-1)return g.Tools.Warn(`Control (Name:${t.name}, UniqueId:${t.uniqueId}) is already associated with this grid. You must remove it before reattaching it`),this;const a=Math.min(i,this._rowDefinitions.length-1),l=Math.min(o,this._columnDefinitions.length-1),c=`${a}:${l}`;let h=this._cells[c];return h||(h=new r.Container(c),this._cells[c]=h,h.horizontalAlignment=f.Control.HORIZONTAL_ALIGNMENT_LEFT,h.verticalAlignment=f.Control.VERTICAL_ALIGNMENT_TOP,h.clipContent=this.clipContent,h.clipChildren=this.clipChildren,super.addControl(h)),h.addControl(t),this._childControls.push(t),t._tag=c,t.parent=this,this._markAsDirty(),this}removeControl(t){const i=this._childControls.indexOf(t);i!==-1&&this._childControls.splice(i,1);const o=this._cells[t._tag];return o&&(o.removeControl(t),t._tag=null),this._markAsDirty(),this}constructor(t){super(t);this.name=t,this._rowDefinitions=new Array,this._rowDefinitionObservers=[],this._columnDefinitions=new Array,this._columnDefinitionObservers=[],this._cells={},this._childControls=new Array}_getTypeName(){return"Grid"}_getGridDefinitions(t){const i=[],o=[],a=[],l=[];let c=this._currentMeasure.width,h=0,u=this._currentMeasure.height,m=0,b=0;for(const I of this._rowDefinitions){if(I.isPixel){const x=I.getValue(this._host);u-=x,o[b]=x}else m+=I.value;b++}let P=0;b=0;for(const I of this._rowDefinitions){if(l.push(P),I.isPixel)P+=I.getValue(this._host);else{const x=Math.round(I.value/m*u);P+=x,o[b]=x}b++}b=0;for(const I of this._columnDefinitions){if(I.isPixel){const x=I.getValue(this._host);c-=x,i[b]=x}else h+=I.value;b++}let B=0;b=0;for(const I of this._columnDefinitions){if(a.push(B),I.isPixel)B+=I.getValue(this._host);else{const x=Math.round(I.value/h*c);B+=x,i[b]=x}b++}t(a,l,i,o)}_additionalProcessing(t,i){this._getGridDefinitions((o,a,l,c)=>{for(const h in this._cells){if(!Object.prototype.hasOwnProperty.call(this._cells,h))continue;const u=h.split(":"),m=parseInt(u[0]),b=parseInt(u[1]),P=this._cells[h];P.leftInPixels=o[b],P.topInPixels=a[m],P.widthInPixels=l[b],P.heightInPixels=c[m],P._left.ignoreAdaptiveScaling=!0,P._top.ignoreAdaptiveScaling=!0,P._width.ignoreAdaptiveScaling=!0,P._height.ignoreAdaptiveScaling=!0}}),super._additionalProcessing(t,i)}_flagDescendantsAsMatrixDirty(){for(const t in this._cells){if(!Object.prototype.hasOwnProperty.call(this._cells,t))continue;this._cells[t]._markMatrixAsDirty()}}_renderHighlightSpecific(t){super._renderHighlightSpecific(t),this._getGridDefinitions((i,o,a,l)=>{for(let c=0;c<i.length;c++){const h=this._currentMeasure.left+i[c]+a[c];t.beginPath(),t.moveTo(h,this._currentMeasure.top),t.lineTo(h,this._currentMeasure.top+this._currentMeasure.height),t.stroke()}for(let c=0;c<o.length;c++){const h=this._currentMeasure.top+o[c]+l[c];t.beginPath(),t.moveTo(this._currentMeasure.left,h),t.lineTo(this._currentMeasure.left+this._currentMeasure.width,h),t.stroke()}}),t.restore()}dispose(){super.dispose();for(const t of this._childControls)t.dispose();for(let t=0;t<this._rowDefinitions.length;t++)this._rowDefinitions[t].onChangedObservable.remove(this._rowDefinitionObservers[t]);for(let t=0;t<this._columnDefinitions.length;t++)this._columnDefinitions[t].onChangedObservable.remove(this._columnDefinitionObservers[t]);this._rowDefinitionObservers.length=0,this._rowDefinitions.length=0,this._columnDefinitionObservers.length=0,this._columnDefinitions.length=0,this._cells={},this._childControls.length=0}serialize(t){super.serialize(t),t.columnCount=this.columnCount,t.rowCount=this.rowCount,t.columns=[],t.rows=[],t.tags=[];for(let i=0;i<this.columnCount;++i){const o=this.getColumnDefinition(i),a={value:o==null?void 0:o.getValue(this.host),unit:o==null?void 0:o.unit};t.columns.push(a)}for(let i=0;i<this.rowCount;++i){const o=this.getRowDefinition(i),a={value:o==null?void 0:o.getValue(this.host),unit:o==null?void 0:o.unit};t.rows.push(a)}this.children.forEach(i=>{t.tags.push(i._tag)})}_parseFromContent(t,i){super._parseFromContent(t,i);const o=[];this.children.forEach(a=>{o.push(a)}),this.removeRowDefinition(0),this.removeColumnDefinition(0);for(let a=0;a<t.columnCount;++a){const l=t.columns[a].value,c=t.columns[a].unit;this.addColumnDefinition(l,c===1)}for(let a=0;a<t.rowCount;++a){const l=t.rows[a].value,c=t.rows[a].unit;this.addRowDefinition(l,c===1)}for(let a=0;a<o.length;++a){const l=t.tags[a];let c=parseInt(l.substring(0,l.search(":")));isNaN(c)&&(c=0);let h=parseInt(l.substring(l.search(":")+1));isNaN(h)&&(h=0),this.addControl(o[a],c,h)}}}(0,s.__decorate)([(0,g.serialize)()],e.prototype,"clipContent",null),(0,g.RegisterClass)("BABYLON.GUI.Grid",e)},"../../../dev/gui/dist/2D/controls/image.js":(C,v,n)=>{n.r(v),n.d(v,{Image:()=>g});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/2D/controls/control.js");class g extends f.Control{get isLoaded(){return this._loaded}isReady(){return this.isLoaded}get detectPointerOnOpaqueOnly(){return this._detectPointerOnOpaqueOnly}set detectPointerOnOpaqueOnly(e){this._detectPointerOnOpaqueOnly!==e&&(this._detectPointerOnOpaqueOnly=e)}get sliceLeft(){return this._sliceLeft}set sliceLeft(e){this._sliceLeft!==e&&(this._sliceLeft=e,this._markAsDirty())}get sliceRight(){return this._sliceRight}set sliceRight(e){this._sliceRight!==e&&(this._sliceRight=e,this._markAsDirty())}get sliceTop(){return this._sliceTop}set sliceTop(e){this._sliceTop!==e&&(this._sliceTop=e,this._markAsDirty())}get sliceBottom(){return this._sliceBottom}set sliceBottom(e){this._sliceBottom!==e&&(this._sliceBottom=e,this._markAsDirty())}get sourceLeft(){return this._sourceLeft}set sourceLeft(e){this._sourceLeft!==e&&(this._sourceLeft=e,this._markAsDirty())}get sourceTop(){return this._sourceTop}set sourceTop(e){this._sourceTop!==e&&(this._sourceTop=e,this._markAsDirty())}get sourceWidth(){return this._sourceWidth}set sourceWidth(e){this._sourceWidth!==e&&(this._sourceWidth=e,this._markAsDirty())}get sourceHeight(){return this._sourceHeight}set sourceHeight(e){this._sourceHeight!==e&&(this._sourceHeight=e,this._markAsDirty())}get imageWidth(){return this._imageWidth}get imageHeight(){return this._imageHeight}get populateNinePatchSlicesFromImage(){return this._populateNinePatchSlicesFromImage}set populateNinePatchSlicesFromImage(e){this._populateNinePatchSlicesFromImage!==e&&(this._populateNinePatchSlicesFromImage=e,this._populateNinePatchSlicesFromImage&&this._loaded&&this._extractNinePatchSliceDataFromImage())}get isSVG(){return this._isSVG}get svgAttributesComputationCompleted(){return this._svgAttributesComputationCompleted}get autoScale(){return this._autoScale}set autoScale(e){this._autoScale!==e&&(this._autoScale=e,e&&this._loaded&&this.synchronizeSizeWithContent())}get stretch(){return this._stretch}set stretch(e){this._stretch!==e&&(this._stretch=e,this._markAsDirty())}_rotate90(e,_=!1){var u,m;const t=this._domImage.width,i=this._domImage.height,o=((m=(u=this._host)==null?void 0:u.getScene())==null?void 0:m.getEngine())||r.EngineStore.LastCreatedEngine;if(!o)throw new Error("Invalid engine. Unable to create a canvas.");const a=o.createCanvas(i,t),l=a.getContext("2d");l.translate(a.width/2,a.height/2),l.rotate(e*Math.PI/2),l.drawImage(this._domImage,0,0,t,i,-t/2,-i/2,t,i);const c=a.toDataURL("image/jpg"),h=new g(this.name+"rotated",c);return _&&(h._stretch=this._stretch,h._autoScale=this._autoScale,h._cellId=this._cellId,h._cellWidth=e%1?this._cellHeight:this._cellWidth,h._cellHeight=e%1?this._cellWidth:this._cellHeight),this._handleRotationForSVGImage(this,h,e),this._imageDataCache.data=null,h}_handleRotationForSVGImage(e,_,t){!e._isSVG||(e._svgAttributesComputationCompleted?(this._rotate90SourceProperties(e,_,t),this._markAsDirty()):e.onSVGAttributesComputedObservable.addOnce(()=>{this._rotate90SourceProperties(e,_,t),this._markAsDirty()}))}_rotate90SourceProperties(e,_,t){let i=e.sourceLeft,o=e.sourceTop,a=e.domImage.width,l=e.domImage.height,c=i,h=o,u=e.sourceWidth,m=e.sourceHeight;if(t!=0){const b=t<0?-1:1;t=t%4;for(let P=0;P<Math.abs(t);++P)c=-(o-l/2)*b+l/2,h=(i-a/2)*b+a/2,[u,m]=[m,u],t<0?h-=m:c-=u,i=c,o=h,[a,l]=[l,a]}_.sourceLeft=c,_.sourceTop=h,_.sourceWidth=u,_.sourceHeight=m}_extractNinePatchSliceDataFromImage(){var a,l;const e=this._domImage.width,_=this._domImage.height;if(!this._workingCanvas){const c=((l=(a=this._host)==null?void 0:a.getScene())==null?void 0:l.getEngine())||r.EngineStore.LastCreatedEngine;if(!c)throw new Error("Invalid engine. Unable to create a canvas.");this._workingCanvas=c.createCanvas(e,_)}const i=this._workingCanvas.getContext("2d");i.drawImage(this._domImage,0,0,e,_);const o=i.getImageData(0,0,e,_);this._sliceLeft=-1,this._sliceRight=-1;for(let c=0;c<e;c++){const h=o.data[c*4+3];if(h>127&&this._sliceLeft===-1){this._sliceLeft=c;continue}if(h<127&&this._sliceLeft>-1){this._sliceRight=c;break}}this._sliceTop=-1,this._sliceBottom=-1;for(let c=0;c<_;c++){const h=o.data[c*e*4+3];if(h>127&&this._sliceTop===-1){this._sliceTop=c;continue}if(h<127&&this._sliceTop>-1){this._sliceBottom=c;break}}}set domImage(e){this._domImage=e,this._loaded=!1,this._imageDataCache.data=null,this._domImage.width?this._onImageLoaded():this._domImage.onload=()=>{this._onImageLoaded()}}get domImage(){return this._domImage}_onImageLoaded(){this._imageDataCache.data=null,this._imageWidth=this._domImage.width,this._imageHeight=this._domImage.height,this._loaded=!0,this._populateNinePatchSlicesFromImage&&this._extractNinePatchSliceDataFromImage(),this._autoScale&&this.synchronizeSizeWithContent(),this.onImageLoadedObservable.notifyObservers(this),this._markAsDirty()}get source(){return this._source}static ResetImageCache(){g.SourceImgCache.clear()}_removeCacheUsage(e){const _=e&&g.SourceImgCache.get(e);_&&(_.timesUsed-=1,_.timesUsed===0&&g.SourceImgCache.delete(e))}set source(e){var t,i;if(this._source===e)return;this._removeCacheUsage(this._source),this._loaded=!1,this._source=e,this._imageDataCache.data=null,e&&(e=this._svgCheck(e));const _=((i=(t=this._host)==null?void 0:t.getScene())==null?void 0:i.getEngine())||r.EngineStore.LastCreatedEngine;if(!_)throw new Error("Invalid engine. Unable to create a canvas.");if(e&&g.SourceImgCache.has(e)){const o=g.SourceImgCache.get(e);this._domImage=o.img,o.timesUsed+=1,o.loaded?this._onImageLoaded():o.waitingForLoadCallback.push(this._onImageLoaded.bind(this));return}this._domImage=_.createCanvasImage(),e&&g.SourceImgCache.set(e,{img:this._domImage,timesUsed:1,loaded:!1,waitingForLoadCallback:[this._onImageLoaded.bind(this)]}),this._domImage.onload=()=>{if(e){const o=g.SourceImgCache.get(e);if(o){o.loaded=!0;for(const a of o.waitingForLoadCallback)a();o.waitingForLoadCallback.length=0;return}}this._onImageLoaded()},e&&(r.Tools.SetCorsBehavior(e,this._domImage),r.Tools.SetReferrerPolicyBehavior(this.referrerPolicy,this._domImage),this._domImage.src=e)}_svgCheck(e){if(window.SVGSVGElement&&e.search(/.svg#/gi)!==-1&&e.indexOf("#")===e.lastIndexOf("#")){this._isSVG=!0;const _=e.split("#")[0],t=e.split("#")[1],i=document.body.querySelector('object[data="'+_+'"]');if(i){const o=i.contentDocument;if(o&&o.documentElement){const a=o.documentElement.getAttribute("viewBox"),l=Number(o.documentElement.getAttribute("width")),c=Number(o.documentElement.getAttribute("height"));if(o.getElementById(t)&&a&&l&&c)return this._getSVGAttribs(i,t),e}i.addEventListener("load",()=>{this._getSVGAttribs(i,t)})}else{const o=document.createElement("object");o.data=_,o.type="image/svg+xml",o.width="0%",o.height="0%",document.body.appendChild(o),o.onload=()=>{const a=document.body.querySelector('object[data="'+_+'"]');a&&this._getSVGAttribs(a,t)}}return _}else return e}_getSVGAttribs(e,_){const t=e.contentDocument;if(t&&t.documentElement){const i=t.documentElement.getAttribute("viewBox"),o=Number(t.documentElement.getAttribute("width")),a=Number(t.documentElement.getAttribute("height")),l=t.getElementById(_);if(i&&o&&a&&l){const c=Number(i.split(" ")[2]),h=Number(i.split(" ")[3]),u=l.getBBox();let m=1,b=1,P=0,B=0;const I=l.transform.baseVal.consolidate().matrix;l.transform&&l.transform.baseVal.consolidate()&&(m=I.a,b=I.d,P=I.e,B=I.f),this.sourceLeft=(m*u.x+P)*o/c,this.sourceTop=(b*u.y+B)*a/h,this.sourceWidth=u.width*m*(o/c),this.sourceHeight=u.height*b*(a/h),this._svgAttributesComputationCompleted=!0,this.onSVGAttributesComputedObservable.notifyObservers(this)}}}get cellWidth(){return this._cellWidth}set cellWidth(e){this._cellWidth!==e&&(this._cellWidth=e,this._markAsDirty())}get cellHeight(){return this._cellHeight}set cellHeight(e){this._cellHeight!==e&&(this._cellHeight=e,this._markAsDirty())}get cellId(){return this._cellId}set cellId(e){this._cellId!==e&&(this._cellId=e,this._markAsDirty())}constructor(e,_=null){super(e);this.name=e,this._workingCanvas=null,this._loaded=!1,this._stretch=g.STRETCH_FILL,this._autoScale=!1,this._sourceLeft=0,this._sourceTop=0,this._sourceWidth=0,this._sourceHeight=0,this._svgAttributesComputationCompleted=!1,this._isSVG=!1,this._cellWidth=0,this._cellHeight=0,this._cellId=-1,this._populateNinePatchSlicesFromImage=!1,this._imageDataCache={data:null,key:""},this.onImageLoadedObservable=new r.Observable,this.onSVGAttributesComputedObservable=new r.Observable,this.source=_}contains(e,_){if(!super.contains(e,_))return!1;if(!this._detectPointerOnOpaqueOnly||!this._workingCanvas)return!0;const t=this._currentMeasure.width|0,i=this._currentMeasure.height|0,o=t+"_"+i;let a=this._imageDataCache.data;if(!a||this._imageDataCache.key!==o){const h=this._workingCanvas.getContext("2d");this._imageDataCache.data=a=h.getImageData(0,0,t,i).data,this._imageDataCache.key=o}return e=e-this._currentMeasure.left|0,_=_-this._currentMeasure.top|0,a[(e+_*t)*4+3]>0}_getTypeName(){return"Image"}synchronizeSizeWithContent(){!this._loaded||(this.width=this._domImage.width+"px",this.height=this._domImage.height+"px")}_processMeasures(e,_){if(this._loaded)switch(this._stretch){case g.STRETCH_NONE:break;case g.STRETCH_FILL:break;case g.STRETCH_UNIFORM:break;case g.STRETCH_NINE_PATCH:break;case g.STRETCH_EXTEND:this._autoScale&&this.synchronizeSizeWithContent(),this.parent&&this.parent.parent&&(this.parent.adaptWidthToChildren=!0,this.parent.adaptHeightToChildren=!0);break}super._processMeasures(e,_)}_prepareWorkingCanvasForOpaqueDetection(){var o,a;if(!this._detectPointerOnOpaqueOnly)return;const e=this._currentMeasure.width,_=this._currentMeasure.height;if(!this._workingCanvas){const l=((a=(o=this._host)==null?void 0:o.getScene())==null?void 0:a.getEngine())||r.EngineStore.LastCreatedEngine;if(!l)throw new Error("Invalid engine. Unable to create a canvas.");this._workingCanvas=l.createCanvas(e,_)}this._workingCanvas.getContext("2d").clearRect(0,0,e,_)}_drawImage(e,_,t,i,o,a,l,c,h){if(e.drawImage(this._domImage,_,t,i,o,a,l,c,h),!this._detectPointerOnOpaqueOnly)return;e=this._workingCanvas.getContext("2d"),e.drawImage(this._domImage,_,t,i,o,a-this._currentMeasure.left,l-this._currentMeasure.top,c,h)}_draw(e){e.save(),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(e.shadowColor=this.shadowColor,e.shadowBlur=this.shadowBlur,e.shadowOffsetX=this.shadowOffsetX,e.shadowOffsetY=this.shadowOffsetY);let _,t,i,o;if(this.cellId==-1)_=this._sourceLeft,t=this._sourceTop,i=this._sourceWidth?this._sourceWidth:this._imageWidth,o=this._sourceHeight?this._sourceHeight:this._imageHeight;else{const a=this._domImage.naturalWidth/this.cellWidth,l=this.cellId/a>>0,c=this.cellId%a;_=this.cellWidth*c,t=this.cellHeight*l,i=this.cellWidth,o=this.cellHeight}if(this._prepareWorkingCanvasForOpaqueDetection(),this._applyStates(e),this._loaded)switch(this._stretch){case g.STRETCH_NONE:this._drawImage(e,_,t,i,o,this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height);break;case g.STRETCH_FILL:this._drawImage(e,_,t,i,o,this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height);break;case g.STRETCH_UNIFORM:{const a=this._currentMeasure.width/i,l=this._currentMeasure.height/o,c=Math.min(a,l),h=(this._currentMeasure.width-i*c)/2,u=(this._currentMeasure.height-o*c)/2;this._drawImage(e,_,t,i,o,this._currentMeasure.left+h,this._currentMeasure.top+u,i*c,o*c);break}case g.STRETCH_EXTEND:this._drawImage(e,_,t,i,o,this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height);break;case g.STRETCH_NINE_PATCH:this._renderNinePatch(e);break}e.restore()}_renderNinePatch(e){const _=this._sliceLeft,t=this._sliceTop,i=this._imageHeight-this._sliceBottom,o=this._imageWidth-this._sliceRight,a=this._sliceRight-this._sliceLeft,l=this._sliceBottom-this._sliceTop,c=this._currentMeasure.width-o-_+2,h=this._currentMeasure.height-i-t+2,u=this._currentMeasure.left+_-1,m=this._currentMeasure.top+t-1,b=this._currentMeasure.left+this._currentMeasure.width-o,P=this._currentMeasure.top+this._currentMeasure.height-i;this._drawImage(e,0,0,_,t,this._currentMeasure.left,this._currentMeasure.top,_,t),e.clearRect(u,this._currentMeasure.top,c,t),this._drawImage(e,this._sliceLeft,0,a,t,u,this._currentMeasure.top,c,t),e.clearRect(b,this._currentMeasure.top,o,t),this._drawImage(e,this._sliceRight,0,o,t,b,this._currentMeasure.top,o,t),e.clearRect(this._currentMeasure.left,m,_,h),this._drawImage(e,0,this._sliceTop,_,l,this._currentMeasure.left,m,_,h),e.clearRect(u,m,c,h),this._drawImage(e,this._sliceLeft,this._sliceTop,a,l,u,m,c,h),e.clearRect(b,m,o,h),this._drawImage(e,this._sliceRight,this._sliceTop,o,l,b,m,o,h),e.clearRect(this._currentMeasure.left,P,_,i),this._drawImage(e,0,this._sliceBottom,_,i,this._currentMeasure.left,P,_,i),e.clearRect(u,P,c,i),this._drawImage(e,this.sliceLeft,this._sliceBottom,a,i,u,P,c,i),e.clearRect(b,P,o,i),this._drawImage(e,this._sliceRight,this._sliceBottom,o,i,b,P,o,i)}dispose(){super.dispose(),this.onImageLoadedObservable.clear(),this.onSVGAttributesComputedObservable.clear(),this._removeCacheUsage(this._source)}}g.SourceImgCache=new Map,g.STRETCH_NONE=0,g.STRETCH_FILL=1,g.STRETCH_UNIFORM=2,g.STRETCH_EXTEND=3,g.STRETCH_NINE_PATCH=4,(0,s.__decorate)([(0,r.serialize)()],g.prototype,"detectPointerOnOpaqueOnly",null),(0,s.__decorate)([(0,r.serialize)()],g.prototype,"sliceLeft",null),(0,s.__decorate)([(0,r.serialize)()],g.prototype,"sliceRight",null),(0,s.__decorate)([(0,r.serialize)()],g.prototype,"sliceTop",null),(0,s.__decorate)([(0,r.serialize)()],g.prototype,"sliceBottom",null),(0,s.__decorate)([(0,r.serialize)()],g.prototype,"sourceLeft",null),(0,s.__decorate)([(0,r.serialize)()],g.prototype,"sourceTop",null),(0,s.__decorate)([(0,r.serialize)()],g.prototype,"sourceWidth",null),(0,s.__decorate)([(0,r.serialize)()],g.prototype,"sourceHeight",null),(0,s.__decorate)([(0,r.serialize)()],g.prototype,"populateNinePatchSlicesFromImage",null),(0,s.__decorate)([(0,r.serialize)()],g.prototype,"autoScale",null),(0,s.__decorate)([(0,r.serialize)()],g.prototype,"stretch",null),(0,s.__decorate)([(0,r.serialize)()],g.prototype,"source",null),(0,s.__decorate)([(0,r.serialize)()],g.prototype,"cellWidth",null),(0,s.__decorate)([(0,r.serialize)()],g.prototype,"cellHeight",null),(0,s.__decorate)([(0,r.serialize)()],g.prototype,"cellId",null),(0,r.RegisterClass)("BABYLON.GUI.Image",g)},"../../../dev/gui/dist/2D/controls/index.js":(C,v,n)=>{n.r(v),n.d(v,{BaseGradient:()=>It.BaseGradient,BaseSlider:()=>bt.BaseSlider,Button:()=>s.Button,Checkbox:()=>r.Checkbox,CheckboxGroup:()=>b.CheckboxGroup,ColorPicker:()=>p.ColorPicker,Container:()=>f.Container,Control:()=>g.Control,DisplayGrid:()=>it.DisplayGrid,Ellipse:()=>d.Ellipse,FocusableButton:()=>e.FocusableButton,Grid:()=>t.Grid,Image:()=>i.Image,ImageBasedSlider:()=>lt.ImageBasedSlider,ImageScrollBar:()=>st.ImageScrollBar,InputPassword:()=>l.InputPassword,InputText:()=>o.InputText,InputTextArea:()=>a.InputTextArea,KeyPropertySet:()=>F.KeyPropertySet,Line:()=>c.Line,LinearGradient:()=>E.LinearGradient,MultiLine:()=>h.MultiLine,RadialGradient:()=>M.RadialGradient,RadioButton:()=>u.RadioButton,RadioGroup:()=>b.RadioGroup,Rectangle:()=>Q.Rectangle,ScrollBar:()=>rt.ScrollBar,ScrollViewer:()=>P.ScrollViewer,SelectionPanel:()=>b.SelectionPanel,SelectorGroup:()=>b.SelectorGroup,Slider:()=>Ct.Slider,SliderGroup:()=>b.SliderGroup,StackPanel:()=>m.StackPanel,TextBlock:()=>B.TextBlock,TextWrapper:()=>I.TextWrapper,TextWrapping:()=>B.TextWrapping,ToggleButton:()=>x.ToggleButton,VirtualKeyboard:()=>F.VirtualKeyboard,name:()=>gt.name});var s=n("../../../dev/gui/dist/2D/controls/button.js"),r=n("../../../dev/gui/dist/2D/controls/checkbox.js"),p=n("../../../dev/gui/dist/2D/controls/colorpicker.js"),f=n("../../../dev/gui/dist/2D/controls/container.js"),g=n("../../../dev/gui/dist/2D/controls/control.js"),d=n("../../../dev/gui/dist/2D/controls/ellipse.js"),e=n("../../../dev/gui/dist/2D/controls/focusableButton.js"),_=n("../../../dev/gui/dist/2D/controls/focusableControl.js"),t=n("../../../dev/gui/dist/2D/controls/grid.js"),i=n("../../../dev/gui/dist/2D/controls/image.js"),o=n("../../../dev/gui/dist/2D/controls/inputText.js"),a=n("../../../dev/gui/dist/2D/controls/inputTextArea.js"),l=n("../../../dev/gui/dist/2D/controls/inputPassword.js"),c=n("../../../dev/gui/dist/2D/controls/line.js"),h=n("../../../dev/gui/dist/2D/controls/multiLine.js"),u=n("../../../dev/gui/dist/2D/controls/radioButton.js"),m=n("../../../dev/gui/dist/2D/controls/stackPanel.js"),b=n("../../../dev/gui/dist/2D/controls/selector.js"),P=n("../../../dev/gui/dist/2D/controls/scrollViewers/scrollViewer.js"),B=n("../../../dev/gui/dist/2D/controls/textBlock.js"),I=n("../../../dev/gui/dist/2D/controls/textWrapper.js"),x=n("../../../dev/gui/dist/2D/controls/toggleButton.js"),F=n("../../../dev/gui/dist/2D/controls/virtualKeyboard.js"),Q=n("../../../dev/gui/dist/2D/controls/rectangle.js"),it=n("../../../dev/gui/dist/2D/controls/displayGrid.js"),bt=n("../../../dev/gui/dist/2D/controls/sliders/baseSlider.js"),Ct=n("../../../dev/gui/dist/2D/controls/sliders/slider.js"),lt=n("../../../dev/gui/dist/2D/controls/sliders/imageBasedSlider.js"),rt=n("../../../dev/gui/dist/2D/controls/sliders/scrollBar.js"),st=n("../../../dev/gui/dist/2D/controls/sliders/imageScrollBar.js"),gt=n("../../../dev/gui/dist/2D/controls/statics.js"),It=n("../../../dev/gui/dist/2D/controls/gradient/BaseGradient.js"),E=n("../../../dev/gui/dist/2D/controls/gradient/LinearGradient.js"),M=n("../../../dev/gui/dist/2D/controls/gradient/RadialGradient.js")},"../../../dev/gui/dist/2D/controls/inputPassword.js":(C,v,n)=>{n.r(v),n.d(v,{InputPassword:()=>g});var s=n("../../../dev/gui/dist/2D/controls/inputText.js"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/2D/controls/textWrapper.js");class g extends s.InputText{_getTypeName(){return"InputPassword"}_beforeRenderText(e){const _=new f.TextWrapper;let t="";for(let i=0;i<e.length;i++)t+="\u2022";return _.text=t,_}}(0,r.RegisterClass)("BABYLON.GUI.InputPassword",g)},"../../../dev/gui/dist/2D/controls/inputText.js":(C,v,n)=>{n.r(v),n.d(v,{InputText:()=>e});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/2D/controls/control.js"),g=n("../../../dev/gui/dist/2D/valueAndUnit.js"),d=n("../../../dev/gui/dist/2D/controls/textWrapper.js");class e extends f.Control{get maxWidth(){return this._maxWidth.toString(this._host)}get maxWidthInPixels(){return this._maxWidth.getValueInPixel(this._host,this._cachedParentMeasure.width)}set maxWidth(t){this._maxWidth.toString(this._host)!==t&&this._maxWidth.fromString(t)&&this._markAsDirty()}get highligherOpacity(){return this._highligherOpacity}set highligherOpacity(t){this._highligherOpacity!==t&&(this._highligherOpacity=t,this._markAsDirty())}get onFocusSelectAll(){return this._onFocusSelectAll}set onFocusSelectAll(t){this._onFocusSelectAll!==t&&(this._onFocusSelectAll=t,this._markAsDirty())}get textHighlightColor(){return this._textHighlightColor}set textHighlightColor(t){this._textHighlightColor!==t&&(this._textHighlightColor=t,this._markAsDirty())}get margin(){return this._margin.toString(this._host)}get marginInPixels(){return this._margin.getValueInPixel(this._host,this._cachedParentMeasure.width)}set margin(t){this._margin.toString(this._host)!==t&&this._margin.fromString(t)&&this._markAsDirty()}get autoStretchWidth(){return this._autoStretchWidth}set autoStretchWidth(t){this._autoStretchWidth!==t&&(this._autoStretchWidth=t,this._markAsDirty())}get thickness(){return this._thickness}set thickness(t){this._thickness!==t&&(this._thickness=t,this._markAsDirty())}get focusedBackground(){return this._focusedBackground}set focusedBackground(t){this._focusedBackground!==t&&(this._focusedBackground=t,this._markAsDirty())}get focusedColor(){return this._focusedColor}set focusedColor(t){this._focusedColor!==t&&(this._focusedColor=t,this._markAsDirty())}get background(){return this._background}set background(t){this._background!==t&&(this._background=t,this._markAsDirty())}get placeholderColor(){return this._placeholderColor}set placeholderColor(t){this._placeholderColor!==t&&(this._placeholderColor=t,this._markAsDirty())}get placeholderText(){return this._placeholderText}set placeholderText(t){this._placeholderText!==t&&(this._placeholderText=t,this._markAsDirty())}get deadKey(){return this._deadKey}set deadKey(t){this._deadKey=t}get highlightedText(){return this._highlightedText}set highlightedText(t){this._highlightedText!==t&&(this._highlightedText=t,this._markAsDirty())}get addKey(){return this._addKey}set addKey(t){this._addKey=t}get currentKey(){return this._currentKey}set currentKey(t){this._currentKey=t}get text(){return this._textWrapper.text}set text(t){const i=t.toString();this._textWrapper||(this._textWrapper=new d.TextWrapper),this._textWrapper.text!==i&&(this._textWrapper.text=i,this._textHasChanged())}_textHasChanged(){this._markAsDirty(),this.onTextChangedObservable.notifyObservers(this)}get width(){return this._width.toString(this._host)}set width(t){this._width.toString(this._host)!==t&&(this._width.fromString(t)&&this._markAsDirty(),this.autoStretchWidth=!1)}constructor(t,i=""){super(t);this.name=t,this._placeholderText="",this._background="#222222",this._focusedBackground="#000000",this._focusedColor="white",this._placeholderColor="gray",this._thickness=1,this._margin=new g.ValueAndUnit(10,g.ValueAndUnit.UNITMODE_PIXEL),this._autoStretchWidth=!0,this._maxWidth=new g.ValueAndUnit(1,g.ValueAndUnit.UNITMODE_PERCENTAGE,!1),this._isFocused=!1,this._blinkIsEven=!1,this._cursorOffset=0,this._deadKey=!1,this._addKey=!0,this._currentKey="",this._isTextHighlightOn=!1,this._textHighlightColor="#d5e0ff",this._highligherOpacity=.4,this._highlightedText="",this._startHighlightIndex=0,this._endHighlightIndex=0,this._cursorIndex=-1,this._onFocusSelectAll=!1,this._isPointerDown=!1,this.promptMessage="Please enter text:",this.disableMobilePrompt=!1,this.onTextChangedObservable=new r.Observable,this.onBeforeKeyAddObservable=new r.Observable,this.onFocusObservable=new r.Observable,this.onBlurObservable=new r.Observable,this.onTextHighlightObservable=new r.Observable,this.onTextCopyObservable=new r.Observable,this.onTextCutObservable=new r.Observable,this.onTextPasteObservable=new r.Observable,this.onKeyboardEventProcessedObservable=new r.Observable,this.text=i,this.isPointerBlocker=!0}onBlur(){this._isFocused=!1,this._scrollLeft=null,this._cursorOffset=0,clearTimeout(this._blinkTimeout),this._markAsDirty(),this.onBlurObservable.notifyObservers(this),this._host.unRegisterClipboardEvents(),this._onClipboardObserver&&this._host.onClipboardObservable.remove(this._onClipboardObserver);const t=this._host.getScene();this._onPointerDblTapObserver&&t&&t.onPointerObservable.remove(this._onPointerDblTapObserver)}onFocus(){if(!this._isEnabled)return;if(this._scrollLeft=null,this._isFocused=!0,this._blinkIsEven=!1,this._cursorOffset=0,this._markAsDirty(),this.onFocusObservable.notifyObservers(this),this._focusedBy==="touch"&&!this.disableMobilePrompt){const i=prompt(this.promptMessage);i!==null&&(this.text=i),this._host.focusedControl=null;return}this._host.registerClipboardEvents(),this._onClipboardObserver=this._host.onClipboardObservable.add(i=>{switch(i.type){case r.ClipboardEventTypes.COPY:this._onCopyText(i.event),this.onTextCopyObservable.notifyObservers(this);break;case r.ClipboardEventTypes.CUT:this._onCutText(i.event),this.onTextCutObservable.notifyObservers(this);break;case r.ClipboardEventTypes.PASTE:this._onPasteText(i.event),this.onTextPasteObservable.notifyObservers(this);break;default:return}});const t=this._host.getScene();t&&(this._onPointerDblTapObserver=t.onPointerObservable.add(i=>{!this._isFocused||i.type===r.PointerEventTypes.POINTERDOUBLETAP&&this._processDblClick(i)})),this._onFocusSelectAll&&this._selectAllText()}focus(){this._host.moveFocusToControl(this)}blur(){this._host.focusedControl=null}_getTypeName(){return"InputText"}keepsFocusWith(){return this._connectedVirtualKeyboard?[this._connectedVirtualKeyboard]:null}processKey(t,i,o){var a;if(!this.isReadOnly&&!(o&&(o.ctrlKey||o.metaKey)&&(t===67||t===86||t===88))){if(o&&(o.ctrlKey||o.metaKey)&&t===65){this._selectAllText(),o.preventDefault();return}switch(t){case 32:i=" ";break;case 191:o&&o.preventDefault();break;case 8:if(this._textWrapper.text&&this._textWrapper.length>0){if(this.isTextHighlightOn){this._textWrapper.removePart(this._startHighlightIndex,this._endHighlightIndex),this._textHasChanged(),this.isTextHighlightOn=!1,this._cursorOffset=this._textWrapper.length-this._startHighlightIndex,this._blinkIsEven=!1,o&&o.preventDefault();return}if(this._cursorOffset===0)this.text=this._textWrapper.substr(0,this._textWrapper.length-1);else{const l=this._textWrapper.length-this._cursorOffset;l>0&&(this._textWrapper.removePart(l-1,l),this._textHasChanged())}}o&&o.preventDefault();return;case 46:if(this.isTextHighlightOn){this._textWrapper.removePart(this._startHighlightIndex,this._endHighlightIndex),this._textHasChanged(),this.isTextHighlightOn=!1,this._cursorOffset=this._textWrapper.length-this._startHighlightIndex,o&&o.preventDefault();return}if(this._textWrapper.text&&this._textWrapper.length>0&&this._cursorOffset>0){const l=this._textWrapper.length-this._cursorOffset;this._textWrapper.removePart(l,l+1),this._textHasChanged(),this._cursorOffset--}o&&o.preventDefault();return;case 13:this._host.focusedControl=null,this.isTextHighlightOn=!1;return;case 35:this._cursorOffset=0,this._blinkIsEven=!1,this.isTextHighlightOn=!1,this._markAsDirty();return;case 36:this._cursorOffset=this._textWrapper.length,this._blinkIsEven=!1,this.isTextHighlightOn=!1,this._markAsDirty();return;case 37:if(this._cursorOffset++,this._cursorOffset>this._textWrapper.length&&(this._cursorOffset=this._textWrapper.length),o&&o.shiftKey){if(this._blinkIsEven=!1,o.ctrlKey||o.metaKey){if(!this.isTextHighlightOn){if(this._textWrapper.length===this._cursorOffset)return;this._endHighlightIndex=this._textWrapper.length-this._cursorOffset+1}this._startHighlightIndex=0,this._cursorIndex=this._textWrapper.length-this._endHighlightIndex,this._cursorOffset=this._textWrapper.length,this.isTextHighlightOn=!0,this._markAsDirty();return}this.isTextHighlightOn?this._cursorIndex===-1&&(this._cursorIndex=this._textWrapper.length-this._endHighlightIndex,this._cursorOffset=this._startHighlightIndex===0?this._textWrapper.length:this._textWrapper.length-this._startHighlightIndex+1):(this.isTextHighlightOn=!0,this._cursorIndex=this._cursorOffset>=this._textWrapper.length?this._textWrapper.length:this._cursorOffset-1),this._cursorIndex<this._cursorOffset?(this._endHighlightIndex=this._textWrapper.length-this._cursorIndex,this._startHighlightIndex=this._textWrapper.length-this._cursorOffset):this._cursorIndex>this._cursorOffset?(this._endHighlightIndex=this._textWrapper.length-this._cursorOffset,this._startHighlightIndex=this._textWrapper.length-this._cursorIndex):this.isTextHighlightOn=!1,this._markAsDirty();return}this.isTextHighlightOn&&(this._cursorOffset=this._textWrapper.length-this._startHighlightIndex,this.isTextHighlightOn=!1),o&&(o.ctrlKey||o.metaKey)&&(this._cursorOffset=this._textWrapper.length,o.preventDefault()),this._blinkIsEven=!1,this.isTextHighlightOn=!1,this._cursorIndex=-1,this._markAsDirty();return;case 39:if(this._cursorOffset--,this._cursorOffset<0&&(this._cursorOffset=0),o&&o.shiftKey){if(this._blinkIsEven=!1,o.ctrlKey||o.metaKey){if(!this.isTextHighlightOn){if(this._cursorOffset===0)return;this._startHighlightIndex=this._textWrapper.length-this._cursorOffset-1}this._endHighlightIndex=this._textWrapper.length,this.isTextHighlightOn=!0,this._cursorIndex=this._textWrapper.length-this._startHighlightIndex,this._cursorOffset=0,this._markAsDirty();return}this.isTextHighlightOn?this._cursorIndex===-1&&(this._cursorIndex=this._textWrapper.length-this._startHighlightIndex,this._cursorOffset=this._textWrapper.length===this._endHighlightIndex?0:this._textWrapper.length-this._endHighlightIndex-1):(this.isTextHighlightOn=!0,this._cursorIndex=this._cursorOffset<=0?0:this._cursorOffset+1),this._cursorIndex<this._cursorOffset?(this._endHighlightIndex=this._textWrapper.length-this._cursorIndex,this._startHighlightIndex=this._textWrapper.length-this._cursorOffset):this._cursorIndex>this._cursorOffset?(this._endHighlightIndex=this._textWrapper.length-this._cursorOffset,this._startHighlightIndex=this._textWrapper.length-this._cursorIndex):this.isTextHighlightOn=!1,this._markAsDirty();return}this.isTextHighlightOn&&(this._cursorOffset=this._textWrapper.length-this._endHighlightIndex,this.isTextHighlightOn=!1),o&&(o.ctrlKey||o.metaKey)&&(this._cursorOffset=0,o.preventDefault()),this._blinkIsEven=!1,this.isTextHighlightOn=!1,this._cursorIndex=-1,this._markAsDirty();return}if(t===32&&(i=(a=o==null?void 0:o.key)!=null?a:" "),this._deadKey=i==="Dead",i&&(t===-1||t===32||t===34||t===39||t>47&&t<64||t>64&&t<91||t>159&&t<193||t>218&&t<223||t>95&&t<112)&&(this._currentKey=i,this.onBeforeKeyAddObservable.notifyObservers(this),i=this._currentKey,this._addKey&&!this._deadKey))if(this.isTextHighlightOn)this._textWrapper.removePart(this._startHighlightIndex,this._endHighlightIndex,i),this._textHasChanged(),this._cursorOffset=this._textWrapper.length-(this._startHighlightIndex+1),this.isTextHighlightOn=!1,this._blinkIsEven=!1,this._markAsDirty();else if(this._cursorOffset===0)this.text+=this._deadKey&&(o==null?void 0:o.key)?o.key:i;else{const l=this._textWrapper.length-this._cursorOffset;this._textWrapper.removePart(l,l,i),this._textHasChanged()}}}_updateValueFromCursorIndex(t){if(this._blinkIsEven=!1,this._cursorIndex===-1)this._cursorIndex=t;else if(this._cursorIndex<this._cursorOffset)this._endHighlightIndex=this._textWrapper.length-this._cursorIndex,this._startHighlightIndex=this._textWrapper.length-this._cursorOffset;else if(this._cursorIndex>this._cursorOffset)this._endHighlightIndex=this._textWrapper.length-this._cursorOffset,this._startHighlightIndex=this._textWrapper.length-this._cursorIndex;else{this.isTextHighlightOn=!1,this._markAsDirty();return}this.isTextHighlightOn=!0,this._markAsDirty()}_processDblClick(t){this._startHighlightIndex=this._textWrapper.length-this._cursorOffset,this._endHighlightIndex=this._startHighlightIndex;let i,o;do o=this._endHighlightIndex<this._textWrapper.length&&this._textWrapper.isWord(this._endHighlightIndex)?++this._endHighlightIndex:0,i=this._startHighlightIndex>0&&this._textWrapper.isWord(this._startHighlightIndex-1)?--this._startHighlightIndex:0;while(i||o);this._cursorOffset=this._textWrapper.length-this._startHighlightIndex,this.isTextHighlightOn=!0,this._clickedCoordinate=null,this._blinkIsEven=!0,this._cursorIndex=-1,this._markAsDirty()}_selectAllText(){this._blinkIsEven=!0,this.isTextHighlightOn=!0,this._startHighlightIndex=0,this._endHighlightIndex=this._textWrapper.length,this._cursorOffset=this._textWrapper.length,this._cursorIndex=-1,this._markAsDirty()}processKeyboard(t){this.processKey(t.keyCode,t.key,t),this.onKeyboardEventProcessedObservable.notifyObservers(t)}_onCopyText(t){this.isTextHighlightOn=!1;try{t.clipboardData&&t.clipboardData.setData("text/plain",this._highlightedText)}catch(i){}this._host.clipboardData=this._highlightedText}_onCutText(t){if(!!this._highlightedText){this._textWrapper.removePart(this._startHighlightIndex,this._endHighlightIndex),this._textHasChanged(),this.isTextHighlightOn=!1,this._cursorOffset=this._textWrapper.length-this._startHighlightIndex;try{t.clipboardData&&t.clipboardData.setData("text/plain",this._highlightedText)}catch(i){}this._host.clipboardData=this._highlightedText,this._highlightedText=""}}_onPasteText(t){let i="";t.clipboardData&&t.clipboardData.types.indexOf("text/plain")!==-1?i=t.clipboardData.getData("text/plain"):i=this._host.clipboardData;const o=this._textWrapper.length-this._cursorOffset;this._textWrapper.removePart(o,o,i),this._textHasChanged()}_draw(t){t.save(),this._applyStates(t),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur,t.shadowOffsetX=this.shadowOffsetX,t.shadowOffsetY=this.shadowOffsetY),this._isFocused?this._focusedBackground&&(t.fillStyle=this._isEnabled?this._focusedBackground:this._disabledColor,t.fillRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height)):this._background&&(t.fillStyle=this._isEnabled?this._background:this._disabledColor,t.fillRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height)),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0),(!this._fontOffset||this._wasDirty)&&(this._fontOffset=f.Control._GetFontOffset(t.font));const i=this._currentMeasure.left+this._margin.getValueInPixel(this._host,this._tempParentMeasure.width);this.color&&(t.fillStyle=this.color);let o=this._beforeRenderText(this._textWrapper);!this._isFocused&&!this._textWrapper.text&&this._placeholderText&&(o=new d.TextWrapper,o.text=this._placeholderText,this._placeholderColor&&(t.fillStyle=this._placeholderColor)),this._textWidth=t.measureText(o.text).width;const a=this._margin.getValueInPixel(this._host,this._tempParentMeasure.width)*2;this._autoStretchWidth&&(this.width=Math.min(this._maxWidth.getValueInPixel(this._host,this._tempParentMeasure.width),this._textWidth+a)+"px",this._autoStretchWidth=!0);const l=this._fontOffset.ascent+(this._currentMeasure.height-this._fontOffset.height)/2,c=this._width.getValueInPixel(this._host,this._tempParentMeasure.width)-a;if(t.save(),t.beginPath(),t.rect(i,this._currentMeasure.top+(this._currentMeasure.height-this._fontOffset.height)/2,c+2,this._currentMeasure.height),t.clip(),this._isFocused&&this._textWidth>c){const h=i-this._textWidth+c;this._scrollLeft||(this._scrollLeft=h)}else this._scrollLeft=i;if(t.fillText(o.text,this._scrollLeft,this._currentMeasure.top+l),this._isFocused){if(this._clickedCoordinate){const u=this._scrollLeft+this._textWidth-this._clickedCoordinate;let m=0;this._cursorOffset=0;let b=0;do this._cursorOffset&&(b=Math.abs(u-m)),this._cursorOffset++,m=t.measureText(o.substr(o.length-this._cursorOffset,this._cursorOffset)).width;while(m<u&&o.length>=this._cursorOffset);Math.abs(u-m)>b&&this._cursorOffset--,this._blinkIsEven=!1,this._clickedCoordinate=null}if(!this._blinkIsEven){const h=o.substr(o.length-this._cursorOffset),u=t.measureText(h).width;let m=this._scrollLeft+this._textWidth-u;m<i?(this._scrollLeft+=i-m,m=i,this._markAsDirty()):m>i+c&&(this._scrollLeft+=i+c-m,m=i+c,this._markAsDirty()),this.isTextHighlightOn||t.fillRect(m,this._currentMeasure.top+(this._currentMeasure.height-this._fontOffset.height)/2,2,this._fontOffset.height)}if(clearTimeout(this._blinkTimeout),this._blinkTimeout=setTimeout(()=>{this._blinkIsEven=!this._blinkIsEven,this._markAsDirty()},500),this.isTextHighlightOn){clearTimeout(this._blinkTimeout);const h=t.measureText(o.substring(this._startHighlightIndex)).width;let u=this._scrollLeft+this._textWidth-h;this._highlightedText=o.substring(this._startHighlightIndex,this._endHighlightIndex);let m=t.measureText(o.substring(this._startHighlightIndex,this._endHighlightIndex)).width;u<i&&(m=m-(i-u),m||(m=t.measureText(o.charAt(o.length-this._cursorOffset)).width),u=i),t.globalAlpha=this._highligherOpacity,t.fillStyle=this._textHighlightColor,t.fillRect(u,this._currentMeasure.top+(this._currentMeasure.height-this._fontOffset.height)/2,m,this._fontOffset.height),t.globalAlpha=1}}t.restore(),this._thickness&&(this._isFocused?this.focusedColor&&(t.strokeStyle=this.focusedColor):this.color&&(t.strokeStyle=this.color),t.lineWidth=this._thickness,t.strokeRect(this._currentMeasure.left+this._thickness/2,this._currentMeasure.top+this._thickness/2,this._currentMeasure.width-this._thickness,this._currentMeasure.height-this._thickness)),t.restore()}_onPointerDown(t,i,o,a,l){return super._onPointerDown(t,i,o,a,l)?this.isReadOnly?!0:(this._clickedCoordinate=i.x,this.isTextHighlightOn=!1,this._highlightedText="",this._cursorIndex=-1,this._isPointerDown=!0,this._host._capturingControl[o]=this,this._focusedBy=l.event.pointerType,this._host.focusedControl===this?(clearTimeout(this._blinkTimeout),this._markAsDirty(),!0):this._isEnabled?(this._host.focusedControl=this,!0):!1):!1}_onPointerMove(t,i,o,a){this._host.focusedControl===this&&this._isPointerDown&&!this.isReadOnly&&(this._clickedCoordinate=i.x,this._markAsDirty(),this._updateValueFromCursorIndex(this._cursorOffset)),super._onPointerMove(t,i,o,a)}_onPointerUp(t,i,o,a,l){this._isPointerDown=!1,delete this._host._capturingControl[o],super._onPointerUp(t,i,o,a,l)}_beforeRenderText(t){return t}set isTextHighlightOn(t){this._isTextHighlightOn!==t&&(t&&this.onTextHighlightObservable.notifyObservers(this),this._isTextHighlightOn=t)}get isTextHighlightOn(){return this._isTextHighlightOn}dispose(){super.dispose(),this.onBlurObservable.clear(),this.onFocusObservable.clear(),this.onTextChangedObservable.clear(),this.onTextCopyObservable.clear(),this.onTextCutObservable.clear(),this.onTextPasteObservable.clear(),this.onTextHighlightObservable.clear(),this.onKeyboardEventProcessedObservable.clear()}}(0,s.__decorate)([(0,r.serialize)()],e.prototype,"promptMessage",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"disableMobilePrompt",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"maxWidth",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"highligherOpacity",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"onFocusSelectAll",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"textHighlightColor",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"margin",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"autoStretchWidth",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"thickness",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"focusedBackground",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"focusedColor",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"background",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"placeholderColor",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"placeholderText",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"deadKey",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"text",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"width",null),(0,r.RegisterClass)("BABYLON.GUI.InputText",e)},"../../../dev/gui/dist/2D/controls/inputTextArea.js":(C,v,n)=>{n.r(v),n.d(v,{InputTextArea:()=>e});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/2D/controls/control.js"),g=n("../../../dev/gui/dist/2D/valueAndUnit.js"),d=n("../../../dev/gui/dist/2D/controls/inputText.js");class e extends d.InputText{get outlineWidth(){return this._outlineWidth}set outlineWidth(t){this._outlineWidth!==t&&(this._outlineWidth=t,this._markAsDirty())}get outlineColor(){return this._outlineColor}set outlineColor(t){this._outlineColor!==t&&(this._outlineColor=t,this._markAsDirty())}get autoStretchHeight(){return this._autoStretchHeight}set autoStretchHeight(t){this._autoStretchHeight!==t&&(this._autoStretchHeight=t,this._markAsDirty())}set height(t){this.fixedRatioMasterIsWidth=!1,this._height.toString(this._host)!==t&&(this._height.fromString(t)&&this._markAsDirty(),this._autoStretchHeight=!1)}get maxHeight(){return this._maxHeight.toString(this._host)}get maxHeightInPixels(){return this._maxHeight.getValueInPixel(this._host,this._cachedParentMeasure.height)}set maxHeight(t){this._maxHeight.toString(this._host)!==t&&this._maxHeight.fromString(t)&&this._markAsDirty()}constructor(t,i=""){super(t);this.name=t,this._textHorizontalAlignment=f.Control.HORIZONTAL_ALIGNMENT_LEFT,this._textVerticalAlignment=f.Control.VERTICAL_ALIGNMENT_TOP,this._lineSpacing=new g.ValueAndUnit(0),this._outlineWidth=0,this._outlineColor="white",this._maxHeight=new g.ValueAndUnit(1,g.ValueAndUnit.UNITMODE_PERCENTAGE,!1),this.onLinesReadyObservable=new r.Observable,this.text=i,this.isPointerBlocker=!0,this.onLinesReadyObservable.add(()=>this._updateCursorPosition()),this._highlightCursorInfo={initialStartIndex:-1,initialRelativeStartIndex:-1,initialLineIndex:-1},this._cursorInfo={globalStartIndex:0,globalEndIndex:0,relativeEndIndex:0,relativeStartIndex:0,currentLineIndex:0}}_getTypeName(){return"InputTextArea"}processKeyboard(t){this.alternativeProcessKey(t.code,t.key,t),this.onKeyboardEventProcessedObservable.notifyObservers(t)}alternativeProcessKey(t,i,o){if(!(o&&(o.ctrlKey||o.metaKey)&&(t==="KeyC"||t==="KeyV"||t==="KeyX"))){switch(t){case"KeyA":if(o&&(o.ctrlKey||o.metaKey)){this._selectAllText(),o.preventDefault();return}break;case"Period":o&&o.shiftKey&&o.preventDefault();break;case"Backspace":!this._isTextHighlightOn&&this._cursorInfo.globalStartIndex>0&&(this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex,this._cursorInfo.globalStartIndex--),this._textWrapper.removePart(this._cursorInfo.globalStartIndex,this._cursorInfo.globalEndIndex),this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex,o&&o.preventDefault(),this._blinkIsEven=!1,this._isTextHighlightOn=!1,this._textHasChanged();break;case"Delete":!this._isTextHighlightOn&&this._cursorInfo.globalEndIndex<this.text.length&&(this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex+1),this._textWrapper.removePart(this._cursorInfo.globalStartIndex,this._cursorInfo.globalEndIndex),this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex,o&&o.preventDefault(),this._blinkIsEven=!1,this._isTextHighlightOn=!1,this._textHasChanged();break;case"Enter":this._textWrapper.removePart(this._cursorInfo.globalStartIndex,this._cursorInfo.globalEndIndex,`
`),this._cursorInfo.globalStartIndex++,this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex,this._blinkIsEven=!1,this._isTextHighlightOn=!1,this._textHasChanged();return;case"End":this._cursorInfo.globalStartIndex=this.text.length,this._blinkIsEven=!1,this._isTextHighlightOn=!1,this._markAsDirty();return;case"Home":this._cursorInfo.globalStartIndex=0,this._blinkIsEven=!1,this._isTextHighlightOn=!1,this._markAsDirty();return;case"ArrowLeft":if(this._markAsDirty(),o&&o.shiftKey){(o.ctrlKey||o.metaKey)&&(this._cursorInfo.globalStartIndex-=this._cursorInfo.relativeStartIndex,this._cursorInfo.globalEndIndex=this._highlightCursorInfo.initialStartIndex),this._isTextHighlightOn?this._cursorInfo.globalEndIndex>this._highlightCursorInfo.initialStartIndex?this._cursorInfo.globalEndIndex--:this._cursorInfo.globalStartIndex--:(this._highlightCursorInfo.initialLineIndex=this._cursorInfo.currentLineIndex,this._highlightCursorInfo.initialStartIndex=this._cursorInfo.globalStartIndex,this._highlightCursorInfo.initialRelativeStartIndex=this._cursorInfo.relativeStartIndex,this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex,this._cursorInfo.globalStartIndex--,this._isTextHighlightOn=!0),this._blinkIsEven=!0,o.preventDefault();return}this._isTextHighlightOn?this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex:o&&(o.ctrlKey||o.metaKey)?(this._cursorInfo.globalStartIndex-=this._cursorInfo.relativeStartIndex,o.preventDefault()):this._cursorInfo.globalStartIndex>0&&this._cursorInfo.globalStartIndex--,this._blinkIsEven=!1,this._isTextHighlightOn=!1;return;case"ArrowRight":if(this._markAsDirty(),o&&o.shiftKey){if(o.ctrlKey||o.metaKey){const a=this._lines[this._cursorInfo.currentLineIndex].text.length-this._cursorInfo.relativeEndIndex-1;this._cursorInfo.globalEndIndex+=a,this._cursorInfo.globalStartIndex=this._highlightCursorInfo.initialStartIndex}this._isTextHighlightOn?this._cursorInfo.globalStartIndex<this._highlightCursorInfo.initialStartIndex?this._cursorInfo.globalStartIndex++:this._cursorInfo.globalEndIndex++:(this._highlightCursorInfo.initialLineIndex=this._cursorInfo.currentLineIndex,this._highlightCursorInfo.initialStartIndex=this._cursorInfo.globalStartIndex,this._highlightCursorInfo.initialRelativeStartIndex=this._cursorInfo.relativeStartIndex,this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex,this._cursorInfo.globalEndIndex++,this._isTextHighlightOn=!0),this._blinkIsEven=!0,o.preventDefault();return}if(this._isTextHighlightOn)this._cursorInfo.globalStartIndex=this._cursorInfo.globalEndIndex;else if(o&&(o.ctrlKey||o.metaKey)){const a=this._lines[this._cursorInfo.currentLineIndex].text.length-this._cursorInfo.relativeEndIndex;this._cursorInfo.globalStartIndex+=a}else this._cursorInfo.globalStartIndex<this.text.length&&this._cursorInfo.globalStartIndex++;this._blinkIsEven=!1,this._isTextHighlightOn=!1;return;case"ArrowUp":if(this._blinkIsEven=!1,o&&(o.shiftKey?(this._isTextHighlightOn||(this._highlightCursorInfo.initialLineIndex=this._cursorInfo.currentLineIndex,this._highlightCursorInfo.initialStartIndex=this._cursorInfo.globalStartIndex,this._highlightCursorInfo.initialRelativeStartIndex=this._cursorInfo.relativeStartIndex),this._isTextHighlightOn=!0,this._blinkIsEven=!0):this._isTextHighlightOn=!1,o.preventDefault()),this._cursorInfo.currentLineIndex===0)this._cursorInfo.globalStartIndex=0;else{const a=this._lines[this._cursorInfo.currentLineIndex],l=this._lines[this._cursorInfo.currentLineIndex-1];let c=0,h=0;!this._isTextHighlightOn||this._cursorInfo.currentLineIndex<this._highlightCursorInfo.initialLineIndex?(c=this._cursorInfo.globalStartIndex,h=this._cursorInfo.relativeStartIndex):(c=this._cursorInfo.globalEndIndex,h=this._cursorInfo.relativeEndIndex);const u=a.text.substr(0,h),m=this._contextForBreakLines.measureText(u).width;let b=0,P=0;c-=h,c-=l.text.length+l.lineEnding.length;let B=0;for(;b<m&&B<l.text.length;)c++,B++,P=Math.abs(m-b),b=this._contextForBreakLines.measureText(l.text.substr(0,B)).width;Math.abs(m-b)>P&&B>0&&c--,this._isTextHighlightOn?this._cursorInfo.currentLineIndex<=this._highlightCursorInfo.initialLineIndex?(this._cursorInfo.globalStartIndex=c,this._cursorInfo.globalEndIndex=this._highlightCursorInfo.initialStartIndex,this._cursorInfo.relativeEndIndex=this._highlightCursorInfo.initialRelativeStartIndex):this._cursorInfo.globalEndIndex=c:this._cursorInfo.globalStartIndex=c}this._markAsDirty();return;case"ArrowDown":if(this._blinkIsEven=!1,o&&(o.shiftKey?(this._isTextHighlightOn||(this._highlightCursorInfo.initialLineIndex=this._cursorInfo.currentLineIndex,this._highlightCursorInfo.initialStartIndex=this._cursorInfo.globalStartIndex,this._highlightCursorInfo.initialRelativeStartIndex=this._cursorInfo.relativeStartIndex),this._isTextHighlightOn=!0,this._blinkIsEven=!0):this._isTextHighlightOn=!1,o.preventDefault()),this._cursorInfo.currentLineIndex===this._lines.length-1)this._cursorInfo.globalStartIndex=this.text.length;else{const a=this._lines[this._cursorInfo.currentLineIndex],l=this._lines[this._cursorInfo.currentLineIndex+1];let c=0,h=0;!this._isTextHighlightOn||this._cursorInfo.currentLineIndex<this._highlightCursorInfo.initialLineIndex?(c=this._cursorInfo.globalStartIndex,h=this._cursorInfo.relativeStartIndex):(c=this._cursorInfo.globalEndIndex,h=this._cursorInfo.relativeEndIndex);const u=a.text.substr(0,h),m=this._contextForBreakLines.measureText(u).width;let b=0,P=0;c+=a.text.length-h+a.lineEnding.length;let B=0;for(;b<m&&B<l.text.length;)c++,B++,P=Math.abs(m-b),b=this._contextForBreakLines.measureText(l.text.substr(0,B)).width;Math.abs(m-b)>P&&B>0&&c--,this._isTextHighlightOn?this._cursorInfo.currentLineIndex<this._highlightCursorInfo.initialLineIndex?(this._cursorInfo.globalStartIndex=c,this._cursorInfo.globalStartIndex>this._cursorInfo.globalEndIndex&&(this._cursorInfo.globalEndIndex+=this._cursorInfo.globalStartIndex,this._cursorInfo.globalStartIndex=this._cursorInfo.globalEndIndex-this._cursorInfo.globalStartIndex,this._cursorInfo.globalEndIndex-=this._cursorInfo.globalStartIndex)):(this._cursorInfo.globalEndIndex=c,this._cursorInfo.globalStartIndex=this._highlightCursorInfo.initialStartIndex):this._cursorInfo.globalStartIndex=c}this._markAsDirty();return}(i==null?void 0:i.length)===1&&(o==null||o.preventDefault(),this._currentKey=i,this.onBeforeKeyAddObservable.notifyObservers(this),i=this._currentKey,this._addKey&&(this._isTextHighlightOn=!1,this._blinkIsEven=!1,this._textWrapper.removePart(this._cursorInfo.globalStartIndex,this._cursorInfo.globalEndIndex,i),this._cursorInfo.globalStartIndex+=i.length,this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex,this._textHasChanged()))}}_parseLineWordWrap(t="",i,o){const a=[],l=t.split(" ");let c=0;for(let h=0;h<l.length;h++){const u=h>0?t+" "+l[h]:l[0],b=o.measureText(u).width;if(b>i){h>0&&(c=o.measureText(t).width,a.push({text:t,width:c,lineEnding:" "})),t=l[h];let P="";t.split("").map(B=>{o.measureText(P+B).width>i&&(a.push({text:P,width:o.measureText(P).width,lineEnding:`
`}),P=""),P+=B}),t=P,c=o.measureText(t).width}else c=b,t=u}return a.push({text:t,width:c,lineEnding:" "}),a}_breakLines(t,i){const o=[],a=this.text.split(`
`);if(this.clipContent)for(const l of a)o.push(...this._parseLineWordWrap(l,t,i));else for(const l of a)o.push(this._parseLine(l,i));return o[o.length-1].lineEnding=`
`,o}_parseLine(t="",i){return{text:t,width:i.measureText(t).width,lineEnding:" "}}_preMeasure(t,i){(!this._fontOffset||this._wasDirty)&&(this._fontOffset=f.Control._GetFontOffset(i.font));let o=this._beforeRenderText(this._textWrapper).text;!this._isFocused&&!this.text&&this._placeholderText&&(o=this._placeholderText,this._placeholderColor&&(i.fillStyle=this._placeholderColor)),this._textWidth=i.measureText(o).width;const a=this._margin.getValueInPixel(this._host,t.width)*2;if(this._autoStretchWidth){const c=o.split(`
`).reduce((u,m)=>{const b=i.measureText(m).width,P=i.measureText(u).width;return b>P?m:u},""),h=i.measureText(c).width;this.width=Math.min(this._maxWidth.getValueInPixel(this._host,t.width),h+a)+"px",this.autoStretchWidth=!0}if(this._availableWidth=this._width.getValueInPixel(this._host,t.width)-a,this._lines=this._breakLines(this._availableWidth,i),this._contextForBreakLines=i,this._autoStretchHeight){const c=this._lines.length*this._fontOffset.height+this._margin.getValueInPixel(this._host,t.height)*2;this.height=Math.min(this._maxHeight.getValueInPixel(this._host,t.height),c)+"px",this._autoStretchHeight=!0}if(this._availableHeight=this._height.getValueInPixel(this._host,t.height)-a,this._isFocused){this._cursorInfo.currentLineIndex=0;let l=this._lines[this._cursorInfo.currentLineIndex].text.length+this._lines[this._cursorInfo.currentLineIndex].lineEnding.length,c=0;for(;c+l<=this._cursorInfo.globalStartIndex;)c+=l,this._cursorInfo.currentLineIndex<this._lines.length-1&&(this._cursorInfo.currentLineIndex++,l=this._lines[this._cursorInfo.currentLineIndex].text.length+this._lines[this._cursorInfo.currentLineIndex].lineEnding.length)}}_computeScroll(){if(this._clipTextLeft=this._currentMeasure.left+this._margin.getValueInPixel(this._host,this._cachedParentMeasure.width),this._clipTextTop=this._currentMeasure.top+this._margin.getValueInPixel(this._host,this._cachedParentMeasure.height),this._isFocused&&this._lines[this._cursorInfo.currentLineIndex].width>this._availableWidth){const t=this._clipTextLeft-this._lines[this._cursorInfo.currentLineIndex].width+this._availableWidth;this._scrollLeft||(this._scrollLeft=t)}else this._scrollLeft=this._clipTextLeft;if(this._isFocused&&!this._autoStretchHeight){const t=(this._cursorInfo.currentLineIndex+1)*this._fontOffset.height,i=this._clipTextTop-t;this._scrollTop||(this._scrollTop=i)}else this._scrollTop=this._clipTextTop}_additionalProcessing(){this.highlightedText="",this.onLinesReadyObservable.notifyObservers(this)}_drawText(t,i,o,a){const l=this._currentMeasure.width;let c=this._scrollLeft;switch(this._textHorizontalAlignment){case f.Control.HORIZONTAL_ALIGNMENT_LEFT:c+=0;break;case f.Control.HORIZONTAL_ALIGNMENT_RIGHT:c+=l-i;break;case f.Control.HORIZONTAL_ALIGNMENT_CENTER:c+=(l-i)/2;break}(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(a.shadowColor=this.shadowColor,a.shadowBlur=this.shadowBlur,a.shadowOffsetX=this.shadowOffsetX,a.shadowOffsetY=this.shadowOffsetY),this.outlineWidth&&a.strokeText(t,this._currentMeasure.left+c,o),a.fillText(t,c,o)}_onCopyText(t){this._isTextHighlightOn=!1;try{t.clipboardData&&t.clipboardData.setData("text/plain",this._highlightedText)}catch(i){}this._host.clipboardData=this._highlightedText}_onCutText(t){if(!!this._highlightedText){try{t.clipboardData&&t.clipboardData.setData("text/plain",this._highlightedText)}catch(i){}this._host.clipboardData=this._highlightedText,this._textWrapper.removePart(this._cursorInfo.globalStartIndex,this._cursorInfo.globalEndIndex),this._textHasChanged()}}_onPasteText(t){let i="";t.clipboardData&&t.clipboardData.types.indexOf("text/plain")!==-1?i=t.clipboardData.getData("text/plain"):i=this._host.clipboardData,this._isTextHighlightOn=!1,this._textWrapper.removePart(this._cursorInfo.globalStartIndex,this._cursorInfo.globalEndIndex,i);const o=i.length-(this._cursorInfo.globalEndIndex-this._cursorInfo.globalStartIndex);this._cursorInfo.globalStartIndex+=o,this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex,this._textHasChanged()}_draw(t){var l,c;this._computeScroll(),this._scrollLeft=(l=this._scrollLeft)!=null?l:0,this._scrollTop=(c=this._scrollTop)!=null?c:0,t.save(),this._applyStates(t),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur,t.shadowOffsetX=this.shadowOffsetX,t.shadowOffsetY=this.shadowOffsetY),this._isFocused?this._focusedBackground&&(t.fillStyle=this._isEnabled?this._focusedBackground:this._disabledColor,t.fillRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height)):this._background&&(t.fillStyle=this._isEnabled?this._background:this._disabledColor,t.fillRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height)),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0),this.color&&(t.fillStyle=this.color);const i=this._currentMeasure.height,o=this._currentMeasure.width;let a=0;switch(this._textVerticalAlignment){case f.Control.VERTICAL_ALIGNMENT_TOP:a=this._fontOffset.ascent;break;case f.Control.VERTICAL_ALIGNMENT_BOTTOM:a=i-this._fontOffset.height*(this._lines.length-1)-this._fontOffset.descent;break;case f.Control.VERTICAL_ALIGNMENT_CENTER:a=this._fontOffset.ascent+(i-this._fontOffset.height*this._lines.length)/2;break}t.save(),t.beginPath(),t.fillStyle=this.fontStyle,t.rect(this._clipTextLeft,this._clipTextTop,this._availableWidth+2,this._availableHeight+2),t.clip(),a+=this._scrollTop;for(let h=0;h<this._lines.length;h++){const u=this._lines[h];h!==0&&this._lineSpacing.internalValue!==0&&(this._lineSpacing.isPixel?a+=this._lineSpacing.getValue(this._host):a=a+this._lineSpacing.getValue(this._host)*this._height.getValueInPixel(this._host,this._cachedParentMeasure.height)),this._drawText(u.text,u.width,a,t),a+=this._fontOffset.height}if(t.restore(),this._isFocused){if(!this._blinkIsEven||this._isTextHighlightOn){let h=this._scrollLeft+t.measureText(this._lines[this._cursorInfo.currentLineIndex].text.substr(0,this._cursorInfo.relativeStartIndex)).width;h<this._clipTextLeft?(this._scrollLeft+=this._clipTextLeft-h,h=this._clipTextLeft,this._markAsDirty()):h>this._clipTextLeft+this._availableWidth&&(this._scrollLeft+=this._clipTextLeft+this._availableWidth-h,h=this._clipTextLeft+this._availableWidth,this._markAsDirty());let u=this._scrollTop+this._cursorInfo.currentLineIndex*this._fontOffset.height;u<this._clipTextTop?(this._scrollTop+=this._clipTextTop-u,u=this._clipTextTop,this._markAsDirty()):u+this._fontOffset.height>this._clipTextTop+this._availableHeight&&(this._scrollTop+=this._clipTextTop+this._availableHeight-u-this._fontOffset.height,u=this._clipTextTop+this._availableHeight-this._fontOffset.height,this._markAsDirty()),this._isTextHighlightOn||t.fillRect(h,u,2,this._fontOffset.height)}if(this._resetBlinking(),this._isTextHighlightOn){clearTimeout(this._blinkTimeout),this._highlightedText=this.text.substring(this._cursorInfo.globalStartIndex,this._cursorInfo.globalEndIndex),t.globalAlpha=this._highligherOpacity,t.fillStyle=this._textHighlightColor;const h=Math.min(this._cursorInfo.currentLineIndex,this._highlightCursorInfo.initialLineIndex),u=Math.max(this._cursorInfo.currentLineIndex,this._highlightCursorInfo.initialLineIndex);let m=this._scrollTop+h*this._fontOffset.height;for(let b=h;b<=u;b++){const P=this._lines[b];let B=this._scrollLeft;switch(this._textHorizontalAlignment){case f.Control.HORIZONTAL_ALIGNMENT_LEFT:B+=0;break;case f.Control.HORIZONTAL_ALIGNMENT_RIGHT:B+=o-P.width;break;case f.Control.HORIZONTAL_ALIGNMENT_CENTER:B+=(o-P.width)/2;break}const I=b===h?this._cursorInfo.relativeStartIndex:0,x=b===u?this._cursorInfo.relativeEndIndex:P.text.length,F=t.measureText(P.text.substr(0,I)).width,Q=P.text.substring(I,x),it=t.measureText(Q).width;t.fillRect(B+F,m,it,this._fontOffset.height),m+=this._fontOffset.height}this._cursorInfo.globalEndIndex===this._cursorInfo.globalStartIndex&&this._resetBlinking()}}t.restore(),this._thickness&&(this._isFocused?this.focusedColor&&(t.strokeStyle=this.focusedColor):this.color&&(t.strokeStyle=this.color),t.lineWidth=this._thickness,t.strokeRect(this._currentMeasure.left+this._thickness/2,this._currentMeasure.top+this._thickness/2,this._currentMeasure.width-this._thickness,this._currentMeasure.height-this._thickness))}_resetBlinking(){clearTimeout(this._blinkTimeout),this._blinkTimeout=setTimeout(()=>{this._blinkIsEven=!this._blinkIsEven,this._markAsDirty()},500)}_applyStates(t){super._applyStates(t),this.outlineWidth&&(t.lineWidth=this.outlineWidth,t.strokeStyle=this.outlineColor)}_onPointerDown(t,i,o,a,l){return super._onPointerDown(t,i,o,a,l)?(this._clickedCoordinateX=i.x,this._clickedCoordinateY=i.y,this._isTextHighlightOn=!1,this._highlightedText="",this._isPointerDown=!0,this._host._capturingControl[o]=this,this._host.focusedControl===this?(clearTimeout(this._blinkTimeout),this._markAsDirty(),!0):this._isEnabled?(this._host.focusedControl=this,!0):!1):!1}_onPointerMove(t,i,o,a){a.event.movementX===0&&a.event.movementY===0||(this._host.focusedControl===this&&this._isPointerDown&&(this._clickedCoordinateX=i.x,this._clickedCoordinateY=i.y,this._isTextHighlightOn||(this._highlightCursorInfo.initialLineIndex=this._cursorInfo.currentLineIndex,this._highlightCursorInfo.initialStartIndex=this._cursorInfo.globalStartIndex,this._highlightCursorInfo.initialRelativeStartIndex=this._cursorInfo.relativeStartIndex,this._isTextHighlightOn=!0),this._markAsDirty()),super._onPointerMove(t,i,o,a))}_updateCursorPosition(){var t;if(!!this._isFocused)if(this._clickedCoordinateX&&this._clickedCoordinateY){this._isTextHighlightOn||(this._cursorInfo={globalStartIndex:0,globalEndIndex:0,relativeStartIndex:0,relativeEndIndex:0,currentLineIndex:0});let i=0,o=0;const a=this._clickedCoordinateY-this._scrollTop,l=Math.floor(a/this._fontOffset.height);this._cursorInfo.currentLineIndex=Math.min(Math.max(l,0),this._lines.length-1);let c=0;const h=this._clickedCoordinateX-((t=this._scrollLeft)!=null?t:0);let u=0;for(let m=0;m<this._cursorInfo.currentLineIndex;m++){const b=this._lines[m];i+=b.text.length+b.lineEnding.length}for(;c<h&&this._lines[this._cursorInfo.currentLineIndex].text.length>o;)o++,u=Math.abs(h-c),c=this._contextForBreakLines.measureText(this._lines[this._cursorInfo.currentLineIndex].text.substr(0,o)).width;Math.abs(h-c)>u&&o>0&&o--,i+=o,this._isTextHighlightOn?i<this._highlightCursorInfo.initialStartIndex?(this._cursorInfo.globalStartIndex=i,this._cursorInfo.relativeStartIndex=o,this._cursorInfo.globalEndIndex=this._highlightCursorInfo.initialStartIndex,this._cursorInfo.relativeEndIndex=this._highlightCursorInfo.initialRelativeStartIndex):(this._cursorInfo.globalStartIndex=this._highlightCursorInfo.initialStartIndex,this._cursorInfo.relativeStartIndex=this._highlightCursorInfo.initialRelativeStartIndex,this._cursorInfo.globalEndIndex=i,this._cursorInfo.relativeEndIndex=o):(this._cursorInfo.globalStartIndex=i,this._cursorInfo.relativeStartIndex=o,this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex,this._cursorInfo.relativeEndIndex=this._cursorInfo.relativeStartIndex),this._blinkIsEven=this._isTextHighlightOn,this._clickedCoordinateX=null,this._clickedCoordinateY=null}else{this._cursorInfo.relativeStartIndex=0,this._cursorInfo.currentLineIndex=0;let i=this._lines[this._cursorInfo.currentLineIndex].text.length+this._lines[this._cursorInfo.currentLineIndex].lineEnding.length,o=0;for(;o+i<=this._cursorInfo.globalStartIndex;)o+=i,this._cursorInfo.currentLineIndex<this._lines.length-1&&(this._cursorInfo.currentLineIndex++,i=this._lines[this._cursorInfo.currentLineIndex].text.length+this._lines[this._cursorInfo.currentLineIndex].lineEnding.length);if(this._cursorInfo.relativeStartIndex=this._cursorInfo.globalStartIndex-o,this._highlightCursorInfo.initialStartIndex!==-1&&this._cursorInfo.globalStartIndex>=this._highlightCursorInfo.initialStartIndex){for(;o+i<=this._cursorInfo.globalEndIndex;)o+=i,this._cursorInfo.currentLineIndex<this._lines.length-1&&(this._cursorInfo.currentLineIndex++,i=this._lines[this._cursorInfo.currentLineIndex].text.length+this._lines[this._cursorInfo.currentLineIndex].lineEnding.length);this._cursorInfo.relativeEndIndex=this._cursorInfo.globalEndIndex-o}else this._isTextHighlightOn||(this._cursorInfo.relativeEndIndex=this._cursorInfo.relativeStartIndex,this._cursorInfo.globalEndIndex=this._cursorInfo.globalStartIndex)}}_updateValueFromCursorIndex(t){}_processDblClick(t){let i,o;do i=this._cursorInfo.globalStartIndex>0&&this._textWrapper.isWord(this._cursorInfo.globalStartIndex-1)?--this._cursorInfo.globalStartIndex:0,o=this._cursorInfo.globalEndIndex<this._textWrapper.length&&this._textWrapper.isWord(this._cursorInfo.globalEndIndex)?++this._cursorInfo.globalEndIndex:0;while(i||o);this._highlightCursorInfo.initialLineIndex=this._cursorInfo.currentLineIndex,this._highlightCursorInfo.initialStartIndex=this._cursorInfo.globalStartIndex,this.onTextHighlightObservable.notifyObservers(this),this._isTextHighlightOn=!0,this._blinkIsEven=!0,this._markAsDirty()}_selectAllText(){this._isTextHighlightOn=!0,this._blinkIsEven=!0,this._highlightCursorInfo={initialStartIndex:0,initialRelativeStartIndex:0,initialLineIndex:0},this._cursorInfo={globalStartIndex:0,globalEndIndex:this._textWrapper.length,relativeEndIndex:this._lines[this._lines.length-1].text.length,relativeStartIndex:0,currentLineIndex:this._lines.length-1},this._markAsDirty()}dipose(){super.dispose(),this.onLinesReadyObservable.clear()}}(0,s.__decorate)([(0,r.serialize)()],e.prototype,"autoStretchHeight",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"maxHeight",null),(0,r.RegisterClass)("BABYLON.GUI.InputTextArea",e)},"../../../dev/gui/dist/2D/controls/line.js":(C,v,n)=>{n.r(v),n.d(v,{Line:()=>d});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/2D/controls/control.js"),g=n("../../../dev/gui/dist/2D/valueAndUnit.js");class d extends f.Control{get dash(){return this._dash}set dash(_){this._dash!==_&&(this._dash=_,this._markAsDirty())}get connectedControl(){return this._connectedControl}set connectedControl(_){this._connectedControl!==_&&(this._connectedControlDirtyObserver&&this._connectedControl&&(this._connectedControl.onDirtyObservable.remove(this._connectedControlDirtyObserver),this._connectedControlDirtyObserver=null),_&&(this._connectedControlDirtyObserver=_.onDirtyObservable.add(()=>this._markAsDirty())),this._connectedControl=_,this._markAsDirty())}get x1(){return this._x1.toString(this._host)}set x1(_){this._x1.toString(this._host)!==_&&this._x1.fromString(_)&&this._markAsDirty()}get y1(){return this._y1.toString(this._host)}set y1(_){this._y1.toString(this._host)!==_&&this._y1.fromString(_)&&this._markAsDirty()}get x2(){return this._x2.toString(this._host)}set x2(_){this._x2.toString(this._host)!==_&&this._x2.fromString(_)&&this._markAsDirty()}get y2(){return this._y2.toString(this._host)}set y2(_){this._y2.toString(this._host)!==_&&this._y2.fromString(_)&&this._markAsDirty()}get lineWidth(){return this._lineWidth}set lineWidth(_){this._lineWidth!==_&&(this._lineWidth=_,this._markAsDirty())}set horizontalAlignment(_){}set verticalAlignment(_){}get _effectiveX2(){return(this._connectedControl?this._connectedControl.centerX:0)+this._x2.getValue(this._host)}get _effectiveY2(){return(this._connectedControl?this._connectedControl.centerY:0)+this._y2.getValue(this._host)}constructor(_){super(_);this.name=_,this._lineWidth=1,this._x1=new g.ValueAndUnit(0),this._y1=new g.ValueAndUnit(0),this._x2=new g.ValueAndUnit(0),this._y2=new g.ValueAndUnit(0),this._dash=new Array,this._automaticSize=!0,this.isHitTestVisible=!1,this._horizontalAlignment=f.Control.HORIZONTAL_ALIGNMENT_LEFT,this._verticalAlignment=f.Control.VERTICAL_ALIGNMENT_TOP}_getTypeName(){return"Line"}_draw(_){_.save(),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(_.shadowColor=this.shadowColor,_.shadowBlur=this.shadowBlur,_.shadowOffsetX=this.shadowOffsetX,_.shadowOffsetY=this.shadowOffsetY),this._applyStates(_),_.strokeStyle=this._getColor(_),_.lineWidth=this._lineWidth,_.setLineDash(this._dash),_.beginPath(),_.moveTo(this._cachedParentMeasure.left+this._x1.getValue(this._host),this._cachedParentMeasure.top+this._y1.getValue(this._host)),_.lineTo(this._cachedParentMeasure.left+this._effectiveX2,this._cachedParentMeasure.top+this._effectiveY2),_.stroke(),_.restore()}_measure(){this._currentMeasure.width=Math.abs(this._x1.getValue(this._host)-this._effectiveX2)+this._lineWidth,this._currentMeasure.height=Math.abs(this._y1.getValue(this._host)-this._effectiveY2)+this._lineWidth}_computeAlignment(_){this._currentMeasure.left=_.left+Math.min(this._x1.getValue(this._host),this._effectiveX2)-this._lineWidth/2,this._currentMeasure.top=_.top+Math.min(this._y1.getValue(this._host),this._effectiveY2)-this._lineWidth/2}moveToVector3(_,t,i=!1){if(!this._host||this.parent!==this._host._rootContainer){r.Tools.Error("Cannot move a control to a vector3 if the control is not at root level");return}const o=this._host._getGlobalViewport(),a=r.Vector3.Project(_,r.Matrix.IdentityReadOnly,t.getTransformMatrix(),o);if(this._moveToProjectedPosition(a,i),a.z<0||a.z>1){this.notRenderable=!0;return}this.notRenderable=!1}_moveToProjectedPosition(_,t=!1){const i=_.x+this._linkOffsetX.getValue(this._host)+"px",o=_.y+this._linkOffsetY.getValue(this._host)+"px";t?(this.x2=i,this.y2=o,this._x2.ignoreAdaptiveScaling=!0,this._y2.ignoreAdaptiveScaling=!0):(this.x1=i,this.y1=o,this._x1.ignoreAdaptiveScaling=!0,this._y1.ignoreAdaptiveScaling=!0)}}(0,s.__decorate)([(0,r.serialize)()],d.prototype,"dash",null),(0,s.__decorate)([(0,r.serialize)()],d.prototype,"x1",null),(0,s.__decorate)([(0,r.serialize)()],d.prototype,"y1",null),(0,s.__decorate)([(0,r.serialize)()],d.prototype,"x2",null),(0,s.__decorate)([(0,r.serialize)()],d.prototype,"y2",null),(0,s.__decorate)([(0,r.serialize)()],d.prototype,"lineWidth",null),(0,r.RegisterClass)("BABYLON.GUI.Line",d)},"../../../dev/gui/dist/2D/controls/multiLine.js":(C,v,n)=>{n.r(v),n.d(v,{MultiLine:()=>d});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/2D/controls/control.js"),g=n("../../../dev/gui/dist/2D/multiLinePoint.js");class d extends f.Control{constructor(_){super(_);this.name=_,this._lineWidth=1,this.onPointUpdate=()=>{this._markAsDirty()},this._automaticSize=!0,this.isHitTestVisible=!1,this._horizontalAlignment=f.Control.HORIZONTAL_ALIGNMENT_LEFT,this._verticalAlignment=f.Control.VERTICAL_ALIGNMENT_TOP,this._dash=[],this._points=[]}get dash(){return this._dash}set dash(_){this._dash!==_&&(this._dash=_,this._markAsDirty())}getAt(_){return this._points[_]||(this._points[_]=new g.MultiLinePoint(this)),this._points[_]}add(..._){return _.map(t=>this.push(t))}push(_){const t=this.getAt(this._points.length);return _==null||(_ instanceof r.AbstractMesh?t.mesh=_:_ instanceof f.Control?t.control=_:_.x!=null&&_.y!=null&&(t.x=_.x,t.y=_.y)),t}remove(_){let t;if(_ instanceof g.MultiLinePoint){if(t=this._points.indexOf(_),t===-1)return}else t=_;const i=this._points[t];!i||(i.dispose(),this._points.splice(t,1))}reset(){for(;this._points.length>0;)this.remove(this._points.length-1)}resetLinks(){this._points.forEach(_=>{_!=null&&_.resetLinks()})}get lineWidth(){return this._lineWidth}set lineWidth(_){this._lineWidth!==_&&(this._lineWidth=_,this._markAsDirty())}set horizontalAlignment(_){}set verticalAlignment(_){}_getTypeName(){return"MultiLine"}_draw(_){_.save(),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(_.shadowColor=this.shadowColor,_.shadowBlur=this.shadowBlur,_.shadowOffsetX=this.shadowOffsetX,_.shadowOffsetY=this.shadowOffsetY),this._applyStates(_),_.strokeStyle=this.color,_.lineWidth=this._lineWidth,_.setLineDash(this._dash),_.beginPath();let t=!0,i;this._points.forEach(o=>{!o||(t?(_.moveTo(o._point.x,o._point.y),t=!1):o._point.z<1&&i.z<1?_.lineTo(o._point.x,o._point.y):_.moveTo(o._point.x,o._point.y),i=o._point)}),_.stroke(),_.restore()}_additionalProcessing(){this._minX=null,this._minY=null,this._maxX=null,this._maxY=null,this._points.forEach(_=>{!_||(_.translate(),(this._minX==null||_._point.x<this._minX)&&(this._minX=_._point.x),(this._minY==null||_._point.y<this._minY)&&(this._minY=_._point.y),(this._maxX==null||_._point.x>this._maxX)&&(this._maxX=_._point.x),(this._maxY==null||_._point.y>this._maxY)&&(this._maxY=_._point.y))}),this._minX==null&&(this._minX=0),this._minY==null&&(this._minY=0),this._maxX==null&&(this._maxX=0),this._maxY==null&&(this._maxY=0)}_measure(){this._minX==null||this._maxX==null||this._minY==null||this._maxY==null||(this._currentMeasure.width=Math.abs(this._maxX-this._minX)+this._lineWidth,this._currentMeasure.height=Math.abs(this._maxY-this._minY)+this._lineWidth)}_computeAlignment(){this._minX==null||this._minY==null||(this._currentMeasure.left=this._minX-this._lineWidth/2,this._currentMeasure.top=this._minY-this._lineWidth/2)}dispose(){this.reset(),super.dispose()}}(0,s.__decorate)([(0,r.serialize)()],d.prototype,"dash",null),(0,r.RegisterClass)("BABYLON.GUI.MultiLine",d)},"../../../dev/gui/dist/2D/controls/radioButton.js":(C,v,n)=>{n.r(v),n.d(v,{RadioButton:()=>e});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/2D/controls/control.js"),g=n("../../../dev/gui/dist/2D/controls/stackPanel.js"),d=n("../../../dev/gui/dist/2D/controls/textBlock.js");class e extends f.Control{get thickness(){return this._thickness}set thickness(t){this._thickness!==t&&(this._thickness=t,this._markAsDirty())}get checkSizeRatio(){return this._checkSizeRatio}set checkSizeRatio(t){t=Math.max(Math.min(1,t),0),this._checkSizeRatio!==t&&(this._checkSizeRatio=t,this._markAsDirty())}get background(){return this._background}set background(t){this._background!==t&&(this._background=t,this._markAsDirty())}get isChecked(){return this._isChecked}set isChecked(t){this._isChecked!==t&&(this._isChecked=t,this._markAsDirty(),this.onIsCheckedChangedObservable.notifyObservers(t),this._isChecked&&this._host&&this._host.executeOnAllControls(i=>{if(i===this||i.group===void 0)return;const o=i;o.group===this.group&&(o.isChecked=!1)}))}constructor(t){super(t);this.name=t,this._isChecked=!1,this._background="black",this._checkSizeRatio=.8,this._thickness=1,this.group="",this.onIsCheckedChangedObservable=new r.Observable,this.isPointerBlocker=!0}_getTypeName(){return"RadioButton"}_draw(t){t.save(),this._applyStates(t);const i=this._currentMeasure.width-this._thickness,o=this._currentMeasure.height-this._thickness;if((this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowColor=this.shadowColor,t.shadowBlur=this.shadowBlur,t.shadowOffsetX=this.shadowOffsetX,t.shadowOffsetY=this.shadowOffsetY),f.Control.drawEllipse(this._currentMeasure.left+this._currentMeasure.width/2,this._currentMeasure.top+this._currentMeasure.height/2,this._currentMeasure.width/2-this._thickness/2,this._currentMeasure.height/2-this._thickness/2,t),t.fillStyle=this._isEnabled?this._background:this._disabledColor,t.fill(),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(t.shadowBlur=0,t.shadowOffsetX=0,t.shadowOffsetY=0),t.strokeStyle=this.color,t.lineWidth=this._thickness,t.stroke(),this._isChecked){t.fillStyle=this._isEnabled?this.color:this._disabledColor;const a=i*this._checkSizeRatio,l=o*this._checkSizeRatio;f.Control.drawEllipse(this._currentMeasure.left+this._currentMeasure.width/2,this._currentMeasure.top+this._currentMeasure.height/2,a/2-this._thickness/2,l/2-this._thickness/2,t),t.fill()}t.restore()}_onPointerDown(t,i,o,a,l){return super._onPointerDown(t,i,o,a,l)?(this.isReadOnly||this.isChecked||(this.isChecked=!0),!0):!1}static AddRadioButtonWithHeader(t,i,o,a){const l=new g.StackPanel;l.isVertical=!1,l.height="30px";const c=new e;c.width="20px",c.height="20px",c.isChecked=o,c.color="green",c.group=i,c.onIsCheckedChangedObservable.add(u=>a(c,u)),l.addControl(c);const h=new d.TextBlock;return h.text=t,h.width="180px",h.paddingLeft="5px",h.textHorizontalAlignment=f.Control.HORIZONTAL_ALIGNMENT_LEFT,h.color="white",l.addControl(h),l}}(0,s.__decorate)([(0,r.serialize)()],e.prototype,"thickness",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"group",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"checkSizeRatio",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"background",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"isChecked",null),(0,r.RegisterClass)("BABYLON.GUI.RadioButton",e)},"../../../dev/gui/dist/2D/controls/rectangle.js":(C,v,n)=>{n.r(v),n.d(v,{Rectangle:()=>g});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("../../../dev/gui/dist/2D/controls/container.js"),p=n("core/Misc/observable"),f=n.n(p);class g extends r.Container{get thickness(){return this._thickness}set thickness(e){this._thickness!==e&&(this._thickness=e,this._markAsDirty())}get cornerRadius(){return this._cornerRadius[0]}set cornerRadius(e){e<0&&(e=0),!(this._cornerRadius[0]===e&&this._cornerRadius[1]===e&&this._cornerRadius[2]===e&&this._cornerRadius[3]===e)&&(this._cornerRadius[0]=this._cornerRadius[1]=this._cornerRadius[2]=this._cornerRadius[3]=e,this._markAsDirty())}get cornerRadiusX(){return this._cornerRadius[0]}set cornerRadiusX(e){this._cornerRadius[0]!==e&&(this._cornerRadius[0]=e)}get cornerRadiusY(){return this._cornerRadius[1]}set cornerRadiusY(e){this._cornerRadius[1]!==e&&(this._cornerRadius[1]=e)}get cornerRadiusZ(){return this._cornerRadius[2]}set cornerRadiusZ(e){this._cornerRadius[2]!==e&&(this._cornerRadius[2]=e)}get cornerRadiusW(){return this._cornerRadius[3]}set cornerRadiusW(e){this._cornerRadius[3]!==e&&(this._cornerRadius[3]=e)}constructor(e){super(e);this.name=e,this._thickness=1,this._cornerRadius=[0,0,0,0],this._cachedRadius=[0,0,0,0]}_getTypeName(){return"Rectangle"}_computeAdditionnalOffsetX(){return this._cornerRadius[0]!==0||this._cornerRadius[1]!==0||this._cornerRadius[2]!==0||this._cornerRadius[3]!==0?1:0}_computeAdditionnalOffsetY(){return this._cornerRadius[0]!==0||this._cornerRadius[1]!==0||this._cornerRadius[2]!==0||this._cornerRadius[3]!==0?1:0}_getRectangleFill(e){return this._getBackgroundColor(e)}_localDraw(e){e.save(),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(e.shadowColor=this.shadowColor,e.shadowBlur=this.shadowBlur,e.shadowOffsetX=this.shadowOffsetX,e.shadowOffsetY=this.shadowOffsetY),(this._background||this._backgroundGradient)&&(e.fillStyle=this._getRectangleFill(e),this._cornerRadius[0]!==0||this._cornerRadius[1]!==0||this._cornerRadius[2]!==0||this._cornerRadius[3]!==0?(this._drawRoundedRect(e,this._thickness/2),e.fill()):e.fillRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height)),this._thickness&&((this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0),(this.color||this.gradient)&&(e.strokeStyle=this.gradient?this.gradient.getCanvasGradient(e):this.color),e.lineWidth=this._thickness,this._cornerRadius[0]!==0||this._cornerRadius[1]!==0||this._cornerRadius[2]!==0||this._cornerRadius[3]!==0?(this._drawRoundedRect(e,this._thickness/2),e.stroke()):e.strokeRect(this._currentMeasure.left+this._thickness/2,this._currentMeasure.top+this._thickness/2,this._currentMeasure.width-this._thickness,this._currentMeasure.height-this._thickness)),e.restore()}_additionalProcessing(e,_){super._additionalProcessing(e,_),this._measureForChildren.width-=2*this._thickness,this._measureForChildren.height-=2*this._thickness,this._measureForChildren.left+=this._thickness,this._measureForChildren.top+=this._thickness}_drawRoundedRect(e,_=0){const t=this._currentMeasure.left+_,i=this._currentMeasure.top+_,o=this._currentMeasure.width-_*2,a=this._currentMeasure.height-_*2;for(let l=0;l<this._cornerRadius.length;l++)this._cachedRadius[l]=Math.abs(Math.min(a/2,Math.min(o/2,this._cornerRadius[l])));e.beginPath(),e.moveTo(t+this._cachedRadius[0],i),e.lineTo(t+o-this._cachedRadius[1],i),e.arc(t+o-this._cachedRadius[1],i+this._cachedRadius[1],this._cachedRadius[1],3*Math.PI/2,Math.PI*2),e.lineTo(t+o,i+a-this._cachedRadius[2]),e.arc(t+o-this._cachedRadius[2],i+a-this._cachedRadius[2],this._cachedRadius[2],0,Math.PI/2),e.lineTo(t+this._cachedRadius[3],i+a),e.arc(t+this._cachedRadius[3],i+a-this._cachedRadius[3],this._cachedRadius[3],Math.PI/2,Math.PI),e.lineTo(t,i+this._cachedRadius[0]),e.arc(t+this._cachedRadius[0],i+this._cachedRadius[0],this._cachedRadius[0],Math.PI,3*Math.PI/2),e.closePath()}_clipForChildren(e){(this._cornerRadius[0]!==0||this._cornerRadius[1]!==0||this._cornerRadius[2]!==0||this._cornerRadius[3]!==0)&&(this._drawRoundedRect(e,this._thickness),e.clip())}}(0,s.__decorate)([(0,p.serialize)()],g.prototype,"thickness",null),(0,s.__decorate)([(0,p.serialize)()],g.prototype,"cornerRadius",null),(0,s.__decorate)([(0,p.serialize)()],g.prototype,"cornerRadiusX",null),(0,s.__decorate)([(0,p.serialize)()],g.prototype,"cornerRadiusY",null),(0,s.__decorate)([(0,p.serialize)()],g.prototype,"cornerRadiusZ",null),(0,s.__decorate)([(0,p.serialize)()],g.prototype,"cornerRadiusW",null),(0,p.RegisterClass)("BABYLON.GUI.Rectangle",g)},"../../../dev/gui/dist/2D/controls/scrollViewers/scrollViewer.js":(C,v,n)=>{n.r(v),n.d(v,{ScrollViewer:()=>i});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("../../../dev/gui/dist/2D/controls/rectangle.js"),p=n("../../../dev/gui/dist/2D/controls/grid.js"),f=n("../../../dev/gui/dist/2D/controls/control.js"),g=n("../../../dev/gui/dist/2D/controls/scrollViewers/scrollViewerWindow.js"),d=n("../../../dev/gui/dist/2D/controls/sliders/scrollBar.js"),e=n("../../../dev/gui/dist/2D/controls/sliders/imageScrollBar.js"),_=n("core/Misc/observable"),t=n.n(_);class i extends r.Rectangle{get horizontalBar(){return this._horizontalBar}get verticalBar(){return this._verticalBar}addControl(a){return a?(this._window.addControl(a),this):this}removeControl(a){return this._window.removeControl(a),this}get children(){return this._window.children}_flagDescendantsAsMatrixDirty(){for(const a of this._children)a._markMatrixAsDirty()}get freezeControls(){return this._window.freezeControls}set freezeControls(a){this._window.freezeControls=a}get bucketWidth(){return this._window.bucketWidth}get bucketHeight(){return this._window.bucketHeight}setBucketSizes(a,l){this._window.setBucketSizes(a,l)}get forceHorizontalBar(){return this._forceHorizontalBar}set forceHorizontalBar(a){this._grid.setRowDefinition(1,a?this._barSize:0,!0),this._horizontalBar.isVisible=a,this._forceHorizontalBar=a}get forceVerticalBar(){return this._forceVerticalBar}set forceVerticalBar(a){this._grid.setColumnDefinition(1,a?this._barSize:0,!0),this._verticalBar.isVisible=a,this._forceVerticalBar=a}constructor(a,l){super(a);this._barSize=20,this._pointerIsOver=!1,this._wheelPrecision=.05,this._thumbLength=.5,this._thumbHeight=1,this._barImageHeight=1,this._horizontalBarImageHeight=1,this._verticalBarImageHeight=1,this._oldWindowContentsWidth=0,this._oldWindowContentsHeight=0,this._forceHorizontalBar=!1,this._forceVerticalBar=!1,this._useImageBar=l||!1,this.onDirtyObservable.add(()=>{this._horizontalBarSpace.color=this.color,this._verticalBarSpace.color=this.color,this._dragSpace.color=this.color}),this.onPointerEnterObservable.add(()=>{this._pointerIsOver=!0}),this.onPointerOutObservable.add(()=>{this._pointerIsOver=!1}),this._grid=new p.Grid,this._useImageBar?(this._horizontalBar=new e.ImageScrollBar,this._verticalBar=new e.ImageScrollBar):(this._horizontalBar=new d.ScrollBar,this._verticalBar=new d.ScrollBar),this._window=new g._ScrollViewerWindow("scrollViewer_window"),this._window.horizontalAlignment=f.Control.HORIZONTAL_ALIGNMENT_LEFT,this._window.verticalAlignment=f.Control.VERTICAL_ALIGNMENT_TOP,this._grid.addColumnDefinition(1),this._grid.addColumnDefinition(0,!0),this._grid.addRowDefinition(1),this._grid.addRowDefinition(0,!0),super.addControl(this._grid),this._grid.addControl(this._window,0,0),this._verticalBarSpace=new r.Rectangle,this._verticalBarSpace.horizontalAlignment=f.Control.HORIZONTAL_ALIGNMENT_LEFT,this._verticalBarSpace.verticalAlignment=f.Control.VERTICAL_ALIGNMENT_TOP,this._verticalBarSpace.thickness=1,this._grid.addControl(this._verticalBarSpace,0,1),this._addBar(this._verticalBar,this._verticalBarSpace,!0,Math.PI),this._horizontalBarSpace=new r.Rectangle,this._horizontalBarSpace.horizontalAlignment=f.Control.HORIZONTAL_ALIGNMENT_LEFT,this._horizontalBarSpace.verticalAlignment=f.Control.VERTICAL_ALIGNMENT_TOP,this._horizontalBarSpace.thickness=1,this._grid.addControl(this._horizontalBarSpace,1,0),this._addBar(this._horizontalBar,this._horizontalBarSpace,!1,0),this._dragSpace=new r.Rectangle,this._dragSpace.thickness=1,this._grid.addControl(this._dragSpace,1,1),this._useImageBar||(this.barColor="grey",this.barBackground="transparent")}resetWindow(){this._window.width="100%",this._window.height="100%"}_getTypeName(){return"ScrollViewer"}_buildClientSizes(){const a=this.host.idealRatio;this._window.parentClientWidth=this._currentMeasure.width-(this._verticalBar.isVisible||this.forceVerticalBar?this._barSize*a:0)-2*this.thickness,this._window.parentClientHeight=this._currentMeasure.height-(this._horizontalBar.isVisible||this.forceHorizontalBar?this._barSize*a:0)-2*this.thickness,this._clientWidth=this._window.parentClientWidth,this._clientHeight=this._window.parentClientHeight}_additionalProcessing(a,l){super._additionalProcessing(a,l),this._buildClientSizes()}_postMeasure(){super._postMeasure(),this._updateScroller(),this._setWindowPosition(!1)}get wheelPrecision(){return this._wheelPrecision}set wheelPrecision(a){this._wheelPrecision!==a&&(a<0&&(a=0),a>1&&(a=1),this._wheelPrecision=a)}get scrollBackground(){return this._horizontalBarSpace.background}set scrollBackground(a){this._horizontalBarSpace.background!==a&&(this._horizontalBarSpace.background=a,this._verticalBarSpace.background=a)}get barColor(){return this._barColor}set barColor(a){this._barColor!==a&&(this._barColor=a,this._horizontalBar.color=a,this._verticalBar.color=a)}get thumbImage(){return this._barImage}set thumbImage(a){if(this._barImage===a)return;this._barImage=a;const l=this._horizontalBar,c=this._verticalBar;l.thumbImage=a,c.thumbImage=a}get horizontalThumbImage(){return this._horizontalBarImage}set horizontalThumbImage(a){if(this._horizontalBarImage===a)return;this._horizontalBarImage=a;const l=this._horizontalBar;l.thumbImage=a}get verticalThumbImage(){return this._verticalBarImage}set verticalThumbImage(a){if(this._verticalBarImage===a)return;this._verticalBarImage=a;const l=this._verticalBar;l.thumbImage=a}get barSize(){return this._barSize}set barSize(a){this._barSize!==a&&(this._barSize=a,this._markAsDirty(),this._horizontalBar.isVisible&&this._grid.setRowDefinition(1,this._barSize,!0),this._verticalBar.isVisible&&this._grid.setColumnDefinition(1,this._barSize,!0))}get thumbLength(){return this._thumbLength}set thumbLength(a){if(this._thumbLength===a)return;a<=0&&(a=.1),a>1&&(a=1),this._thumbLength=a;const l=this._horizontalBar,c=this._verticalBar;l.thumbLength=a,c.thumbLength=a,this._markAsDirty()}get thumbHeight(){return this._thumbHeight}set thumbHeight(a){if(this._thumbHeight===a)return;a<=0&&(a=.1),a>1&&(a=1),this._thumbHeight=a;const l=this._horizontalBar,c=this._verticalBar;l.thumbHeight=a,c.thumbHeight=a,this._markAsDirty()}get barImageHeight(){return this._barImageHeight}set barImageHeight(a){if(this._barImageHeight===a)return;a<=0&&(a=.1),a>1&&(a=1),this._barImageHeight=a;const l=this._horizontalBar,c=this._verticalBar;l.barImageHeight=a,c.barImageHeight=a,this._markAsDirty()}get horizontalBarImageHeight(){return this._horizontalBarImageHeight}set horizontalBarImageHeight(a){if(this._horizontalBarImageHeight===a)return;a<=0&&(a=.1),a>1&&(a=1),this._horizontalBarImageHeight=a;const l=this._horizontalBar;l.barImageHeight=a,this._markAsDirty()}get verticalBarImageHeight(){return this._verticalBarImageHeight}set verticalBarImageHeight(a){if(this._verticalBarImageHeight===a)return;a<=0&&(a=.1),a>1&&(a=1),this._verticalBarImageHeight=a;const l=this._verticalBar;l.barImageHeight=a,this._markAsDirty()}get barBackground(){return this._barBackground}set barBackground(a){if(this._barBackground===a)return;this._barBackground=a;const l=this._horizontalBar,c=this._verticalBar;l.background=a,c.background=a,this._dragSpace.background=a}get barImage(){return this._barBackgroundImage}set barImage(a){this._barBackgroundImage=a;const l=this._horizontalBar,c=this._verticalBar;l.backgroundImage=a,c.backgroundImage=a}get horizontalBarImage(){return this._horizontalBarBackgroundImage}set horizontalBarImage(a){this._horizontalBarBackgroundImage=a;const l=this._horizontalBar;l.backgroundImage=a}get verticalBarImage(){return this._verticalBarBackgroundImage}set verticalBarImage(a){this._verticalBarBackgroundImage=a;const l=this._verticalBar;l.backgroundImage=a}_setWindowPosition(a=!0){const l=this.host.idealRatio,c=this._window._currentMeasure.width,h=this._window._currentMeasure.height;if(!a&&this._oldWindowContentsWidth===c&&this._oldWindowContentsHeight===h)return;this._oldWindowContentsWidth=c,this._oldWindowContentsHeight=h;const u=this._clientWidth-c,m=this._clientHeight-h,b=this._horizontalBar.value/l*u+"px",P=this._verticalBar.value/l*m+"px";b!==this._window.left&&(this._window.left=b,this.freezeControls||(this._rebuildLayout=!0)),P!==this._window.top&&(this._window.top=P,this.freezeControls||(this._rebuildLayout=!0))}_updateScroller(){const a=this._window._currentMeasure.width,l=this._window._currentMeasure.height;this._horizontalBar.isVisible&&a<=this._clientWidth&&!this.forceHorizontalBar?(this._grid.setRowDefinition(1,0,!0),this._horizontalBar.isVisible=!1,this._horizontalBar.value=0,this._rebuildLayout=!0):!this._horizontalBar.isVisible&&(a>this._clientWidth||this.forceHorizontalBar)&&(this._grid.setRowDefinition(1,this._barSize,!0),this._horizontalBar.isVisible=!0,this._rebuildLayout=!0),this._verticalBar.isVisible&&l<=this._clientHeight&&!this.forceVerticalBar?(this._grid.setColumnDefinition(1,0,!0),this._verticalBar.isVisible=!1,this._verticalBar.value=0,this._rebuildLayout=!0):!this._verticalBar.isVisible&&(l>this._clientHeight||this.forceVerticalBar)&&(this._grid.setColumnDefinition(1,this._barSize,!0),this._verticalBar.isVisible=!0,this._rebuildLayout=!0),this._buildClientSizes();const c=this.host.idealRatio;this._horizontalBar.thumbWidth=this._thumbLength*.9*(this._clientWidth/c)+"px",this._verticalBar.thumbWidth=this._thumbLength*.9*(this._clientHeight/c)+"px"}_link(a){super._link(a),this._attachWheel()}_addBar(a,l,c,h){a.paddingLeft=0,a.width="100%",a.height="100%",a.barOffset=0,a.value=0,a.maximum=1,a.horizontalAlignment=f.Control.HORIZONTAL_ALIGNMENT_CENTER,a.verticalAlignment=f.Control.VERTICAL_ALIGNMENT_CENTER,a.isVertical=c,a.rotation=h,a.isVisible=!1,l.addControl(a),a.onValueChangedObservable.add(()=>{this._setWindowPosition()})}_attachWheel(){!this._host||this._onWheelObserver||(this._onWheelObserver=this.onWheelObservable.add(a=>{!this._pointerIsOver||this.isReadOnly||(this._verticalBar.isVisible==!0&&(a.y<0&&this._verticalBar.value>0?this._verticalBar.value-=this._wheelPrecision:a.y>0&&this._verticalBar.value<this._verticalBar.maximum&&(this._verticalBar.value+=this._wheelPrecision)),this._horizontalBar.isVisible==!0&&(a.x<0&&this._horizontalBar.value<this._horizontalBar.maximum?this._horizontalBar.value+=this._wheelPrecision:a.x>0&&this._horizontalBar.value>0&&(this._horizontalBar.value-=this._wheelPrecision)))}))}_renderHighlightSpecific(a){!this.isHighlighted||(super._renderHighlightSpecific(a),this._grid._renderHighlightSpecific(a),a.restore())}dispose(){this.onWheelObservable.remove(this._onWheelObserver),this._onWheelObserver=null,super.dispose()}}(0,s.__decorate)([(0,_.serialize)()],i.prototype,"wheelPrecision",null),(0,s.__decorate)([(0,_.serialize)()],i.prototype,"scrollBackground",null),(0,s.__decorate)([(0,_.serialize)()],i.prototype,"barColor",null),(0,s.__decorate)([(0,_.serialize)()],i.prototype,"barSize",null),(0,s.__decorate)([(0,_.serialize)()],i.prototype,"barBackground",null),(0,_.RegisterClass)("BABYLON.GUI.ScrollViewer",i)},"../../../dev/gui/dist/2D/controls/scrollViewers/scrollViewerWindow.js":(C,v,n)=>{n.r(v),n.d(v,{_ScrollViewerWindow:()=>g});var s=n("../../../dev/gui/dist/2D/measure.js"),r=n("../../../dev/gui/dist/2D/controls/container.js"),p=n("../../../dev/gui/dist/2D/valueAndUnit.js"),f=n("../../../dev/gui/dist/2D/controls/control.js");class g extends r.Container{get freezeControls(){return this._freezeControls}set freezeControls(e){if(this._freezeControls===e)return;e||this._restoreMeasures(),this._freezeControls=!1;const _=this.host.getSize(),t=_.width,i=_.height,o=this.host.getContext(),a=new s.Measure(0,0,t,i);this.host._numLayoutCalls=0,this.host._rootContainer._layout(a,o),e&&(this._updateMeasures(),this._useBuckets()&&this._makeBuckets()),this._freezeControls=e,this.host.markAsDirty()}get bucketWidth(){return this._bucketWidth}get bucketHeight(){return this._bucketHeight}setBucketSizes(e,_){this._bucketWidth=e,this._bucketHeight=_,this._useBuckets()?this._freezeControls&&this._makeBuckets():this._buckets={}}_useBuckets(){return this._bucketWidth>0&&this._bucketHeight>0}_makeBuckets(){this._buckets={},this._bucketLen=Math.ceil(this.widthInPixels/this._bucketWidth),this._dispatchInBuckets(this._children),this._oldLeft=null,this._oldTop=null}_dispatchInBuckets(e){for(let _=0;_<e.length;++_){const t=e[_],i=Math.max(0,Math.floor((t._customData._origLeft-this._customData.origLeft)/this._bucketWidth)),o=Math.floor((t._customData._origLeft-this._customData.origLeft+t._currentMeasure.width-1)/this._bucketWidth),a=Math.floor((t._customData._origTop-this._customData.origTop+t._currentMeasure.height-1)/this._bucketHeight);let l=Math.max(0,Math.floor((t._customData._origTop-this._customData.origTop)/this._bucketHeight));for(;l<=a;){for(let c=i;c<=o;++c){const h=l*this._bucketLen+c;let u=this._buckets[h];u||(u=[],this._buckets[h]=u),u.push(t)}l++}t instanceof r.Container&&t._children.length>0&&this._dispatchInBuckets(t._children)}}_updateMeasures(){const e=this.leftInPixels|0,_=this.topInPixels|0;this._measureForChildren.left-=e,this._measureForChildren.top-=_,this._currentMeasure.left-=e,this._currentMeasure.top-=_,this._customData.origLeftForChildren=this._measureForChildren.left,this._customData.origTopForChildren=this._measureForChildren.top,this._customData.origLeft=this._currentMeasure.left,this._customData.origTop=this._currentMeasure.top,this._updateChildrenMeasures(this._children,e,_)}_updateChildrenMeasures(e,_,t){for(let i=0;i<e.length;++i){const o=e[i];o._currentMeasure.left-=_,o._currentMeasure.top-=t,o._customData._origLeft=o._currentMeasure.left,o._customData._origTop=o._currentMeasure.top,o instanceof r.Container&&o._children.length>0&&this._updateChildrenMeasures(o._children,_,t)}}_restoreMeasures(){const e=this.leftInPixels|0,_=this.topInPixels|0;this._measureForChildren.left=this._customData.origLeftForChildren+e,this._measureForChildren.top=this._customData.origTopForChildren+_,this._currentMeasure.left=this._customData.origLeft+e,this._currentMeasure.top=this._customData.origTop+_}constructor(e){super(e);this._freezeControls=!1,this._bucketWidth=0,this._bucketHeight=0,this._buckets={}}_getTypeName(){return"ScrollViewerWindow"}_additionalProcessing(e,_){super._additionalProcessing(e,_),this._parentMeasure=e,this._measureForChildren.left=this._currentMeasure.left,this._measureForChildren.top=this._currentMeasure.top,this._measureForChildren.width=e.width,this._measureForChildren.height=e.height}_layout(e,_){return this._freezeControls?(this.invalidateRect(),!1):super._layout(e,_)}_scrollChildren(e,_,t){for(let i=0;i<e.length;++i){const o=e[i];o._currentMeasure.left=o._customData._origLeft+_,o._currentMeasure.top=o._customData._origTop+t,o._isClipped=!1,o instanceof r.Container&&o._children.length>0&&this._scrollChildren(o._children,_,t)}}_scrollChildrenWithBuckets(e,_,t,i){const o=Math.max(0,Math.floor(-e/this._bucketWidth)),a=Math.floor((-e+this._parentMeasure.width-1)/this._bucketWidth),l=Math.floor((-_+this._parentMeasure.height-1)/this._bucketHeight);let c=Math.max(0,Math.floor(-_/this._bucketHeight));for(;c<=l;){for(let h=o;h<=a;++h){const u=c*this._bucketLen+h,m=this._buckets[u];if(m)for(let b=0;b<m.length;++b){const P=m[b];P._currentMeasure.left=P._customData._origLeft+t,P._currentMeasure.top=P._customData._origTop+i,P._isClipped=!1}}c++}}_draw(e,_){if(!this._freezeControls){super._draw(e,_);return}this._localDraw(e),this.clipChildren&&this._clipForChildren(e);const t=this.leftInPixels|0,i=this.topInPixels|0;this._useBuckets()?this._oldLeft!==null&&this._oldTop!==null?(this._scrollChildrenWithBuckets(this._oldLeft,this._oldTop,t,i),this._scrollChildrenWithBuckets(t,i,t,i)):this._scrollChildren(this._children,t,i):this._scrollChildren(this._children,t,i),this._oldLeft=t,this._oldTop=i;for(const o of this._children)!o._intersectsRect(this._parentMeasure)||o._render(e,this._parentMeasure)}_postMeasure(){if(this._freezeControls){super._postMeasure();return}let e=this.parentClientWidth,_=this.parentClientHeight;for(const t of this.children)!t.isVisible||t.notRenderable||(t.horizontalAlignment===f.Control.HORIZONTAL_ALIGNMENT_CENTER&&t._offsetLeft(this._currentMeasure.left-t._currentMeasure.left),t.verticalAlignment===f.Control.VERTICAL_ALIGNMENT_CENTER&&t._offsetTop(this._currentMeasure.top-t._currentMeasure.top),e=Math.max(e,t._currentMeasure.left-this._currentMeasure.left+t._currentMeasure.width+t.paddingRightInPixels),_=Math.max(_,t._currentMeasure.top-this._currentMeasure.top+t._currentMeasure.height+t.paddingBottomInPixels));this._currentMeasure.width!==e&&(this._width.updateInPlace(e,p.ValueAndUnit.UNITMODE_PIXEL),this._currentMeasure.width=e,this._rebuildLayout=!0,this._isDirty=!0),this._currentMeasure.height!==_&&(this._height.updateInPlace(_,p.ValueAndUnit.UNITMODE_PIXEL),this._currentMeasure.height=_,this._rebuildLayout=!0,this._isDirty=!0),super._postMeasure()}}},"../../../dev/gui/dist/2D/controls/selector.js":(C,v,n)=>{n.r(v),n.d(v,{CheckboxGroup:()=>i,RadioGroup:()=>o,SelectionPanel:()=>l,SelectorGroup:()=>t,SliderGroup:()=>a});var s=n("../../../dev/gui/dist/2D/controls/rectangle.js"),r=n("../../../dev/gui/dist/2D/controls/stackPanel.js"),p=n("../../../dev/gui/dist/2D/controls/control.js"),f=n("../../../dev/gui/dist/2D/controls/textBlock.js"),g=n("../../../dev/gui/dist/2D/controls/checkbox.js"),d=n("../../../dev/gui/dist/2D/controls/radioButton.js"),e=n("../../../dev/gui/dist/2D/controls/sliders/slider.js"),_=n("../../../dev/gui/dist/2D/controls/container.js");class t{constructor(h){this.name=h,this._groupPanel=new r.StackPanel,this._selectors=new Array,this._groupPanel.verticalAlignment=p.Control.VERTICAL_ALIGNMENT_TOP,this._groupPanel.horizontalAlignment=p.Control.HORIZONTAL_ALIGNMENT_LEFT,this._groupHeader=this._addGroupHeader(h)}get groupPanel(){return this._groupPanel}get selectors(){return this._selectors}get header(){return this._groupHeader.text}set header(h){this._groupHeader.text!=="label"&&(this._groupHeader.text=h)}_addGroupHeader(h){const u=new f.TextBlock("groupHead",h);return u.width=.9,u.height="30px",u.textWrapping=!0,u.color="black",u.horizontalAlignment=p.Control.HORIZONTAL_ALIGNMENT_LEFT,u.textHorizontalAlignment=p.Control.HORIZONTAL_ALIGNMENT_LEFT,u.left="2px",this._groupPanel.addControl(u),u}_getSelector(h){if(!(h<0||h>=this._selectors.length))return this._selectors[h]}removeSelector(h){h<0||h>=this._selectors.length||(this._groupPanel.removeControl(this._selectors[h]),this._selectors.splice(h,1))}}class i extends t{addCheckbox(h,u=b=>{},m=!1){m=m||!1;const b=new g.Checkbox;b.width="20px",b.height="20px",b.color="#364249",b.background="#CCCCCC",b.horizontalAlignment=p.Control.HORIZONTAL_ALIGNMENT_LEFT,b.onIsCheckedChangedObservable.add(function(B){u(B)});const P=p.Control.AddHeader(b,h,"200px",{isHorizontal:!0,controlFirst:!0});P.height="30px",P.horizontalAlignment=p.Control.HORIZONTAL_ALIGNMENT_LEFT,P.left="4px",this.groupPanel.addControl(P),this.selectors.push(P),b.isChecked=m,this.groupPanel.parent&&this.groupPanel.parent.parent&&(b.color=this.groupPanel.parent.parent.buttonColor,b.background=this.groupPanel.parent.parent.buttonBackground)}_setSelectorLabel(h,u){this.selectors[h].children[1].text=u}_setSelectorLabelColor(h,u){this.selectors[h].children[1].color=u}_setSelectorButtonColor(h,u){this.selectors[h].children[0].color=u}_setSelectorButtonBackground(h,u){this.selectors[h].children[0].background=u}}class o extends t{constructor(){super(...arguments);this._selectNb=0}addRadio(h,u=b=>{},m=!1){const b=this._selectNb++,P=new d.RadioButton;P.name=h,P.width="20px",P.height="20px",P.color="#364249",P.background="#CCCCCC",P.group=this.name,P.horizontalAlignment=p.Control.HORIZONTAL_ALIGNMENT_LEFT,P.onIsCheckedChangedObservable.add(function(I){I&&u(b)});const B=p.Control.AddHeader(P,h,"200px",{isHorizontal:!0,controlFirst:!0});B.height="30px",B.horizontalAlignment=p.Control.HORIZONTAL_ALIGNMENT_LEFT,B.left="4px",this.groupPanel.addControl(B),this.selectors.push(B),P.isChecked=m,this.groupPanel.parent&&this.groupPanel.parent.parent&&(P.color=this.groupPanel.parent.parent.buttonColor,P.background=this.groupPanel.parent.parent.buttonBackground)}_setSelectorLabel(h,u){this.selectors[h].children[1].text=u}_setSelectorLabelColor(h,u){this.selectors[h].children[1].color=u}_setSelectorButtonColor(h,u){this.selectors[h].children[0].color=u}_setSelectorButtonBackground(h,u){this.selectors[h].children[0].background=u}}class a extends t{addSlider(h,u=x=>{},m="Units",b=0,P=0,B=0,I=x=>x|0){const x=new e.Slider;x.name=m,x.value=B,x.minimum=b,x.maximum=P,x.width=.9,x.height="20px",x.color="#364249",x.background="#CCCCCC",x.borderColor="black",x.horizontalAlignment=p.Control.HORIZONTAL_ALIGNMENT_LEFT,x.left="4px",x.paddingBottom="4px",x.onValueChangedObservable.add(function(Q){x.parent.children[0].text=x.parent.children[0].name+": "+I(Q)+" "+x.name,u(Q)});const F=p.Control.AddHeader(x,h+": "+I(B)+" "+m,"30px",{isHorizontal:!1,controlFirst:!1});F.height="60px",F.horizontalAlignment=p.Control.HORIZONTAL_ALIGNMENT_LEFT,F.left="4px",F.children[0].name=h,this.groupPanel.addControl(F),this.selectors.push(F),this.groupPanel.parent&&this.groupPanel.parent.parent&&(x.color=this.groupPanel.parent.parent.buttonColor,x.background=this.groupPanel.parent.parent.buttonBackground)}_setSelectorLabel(h,u){this.selectors[h].children[0].name=u,this.selectors[h].children[0].text=u+": "+this.selectors[h].children[1].value+" "+this.selectors[h].children[1].name}_setSelectorLabelColor(h,u){this.selectors[h].children[0].color=u}_setSelectorButtonColor(h,u){this.selectors[h].children[1].color=u}_setSelectorButtonBackground(h,u){this.selectors[h].children[1].background=u}}class l extends s.Rectangle{constructor(h,u=[]){super(h);if(this.name=h,this.groups=u,this._buttonColor="#364249",this._buttonBackground="#CCCCCC",this._headerColor="black",this._barColor="white",this._barHeight="2px",this._spacerHeight="20px",this._bars=new Array,this._groups=u,this.thickness=2,this._panel=new r.StackPanel,this._panel.verticalAlignment=p.Control.VERTICAL_ALIGNMENT_TOP,this._panel.horizontalAlignment=p.Control.HORIZONTAL_ALIGNMENT_LEFT,this._panel.top=5,this._panel.left=5,this._panel.width=.95,u.length>0){for(let m=0;m<u.length-1;m++)this._panel.addControl(u[m].groupPanel),this._addSpacer();this._panel.addControl(u[u.length-1].groupPanel)}this.addControl(this._panel)}_getTypeName(){return"SelectionPanel"}get panel(){return this._panel}get headerColor(){return this._headerColor}set headerColor(h){this._headerColor!==h&&(this._headerColor=h,this._setHeaderColor())}_setHeaderColor(){for(let h=0;h<this._groups.length;h++)this._groups[h].groupPanel.children[0].color=this._headerColor}get buttonColor(){return this._buttonColor}set buttonColor(h){this._buttonColor!==h&&(this._buttonColor=h,this._setbuttonColor())}_setbuttonColor(){for(let h=0;h<this._groups.length;h++)for(let u=0;u<this._groups[h].selectors.length;u++)this._groups[h]._setSelectorButtonColor(u,this._buttonColor)}get labelColor(){return this._labelColor}set labelColor(h){this._labelColor!==h&&(this._labelColor=h,this._setLabelColor())}_setLabelColor(){for(let h=0;h<this._groups.length;h++)for(let u=0;u<this._groups[h].selectors.length;u++)this._groups[h]._setSelectorLabelColor(u,this._labelColor)}get buttonBackground(){return this._buttonBackground}set buttonBackground(h){this._buttonBackground!==h&&(this._buttonBackground=h,this._setButtonBackground())}_setButtonBackground(){for(let h=0;h<this._groups.length;h++)for(let u=0;u<this._groups[h].selectors.length;u++)this._groups[h]._setSelectorButtonBackground(u,this._buttonBackground)}get barColor(){return this._barColor}set barColor(h){this._barColor!==h&&(this._barColor=h,this._setBarColor())}_setBarColor(){for(let h=0;h<this._bars.length;h++)this._bars[h].children[0].background=this._barColor}get barHeight(){return this._barHeight}set barHeight(h){this._barHeight!==h&&(this._barHeight=h,this._setBarHeight())}_setBarHeight(){for(let h=0;h<this._bars.length;h++)this._bars[h].children[0].height=this._barHeight}get spacerHeight(){return this._spacerHeight}set spacerHeight(h){this._spacerHeight!==h&&(this._spacerHeight=h,this._setSpacerHeight())}_setSpacerHeight(){for(let h=0;h<this._bars.length;h++)this._bars[h].height=this._spacerHeight}_addSpacer(){const h=new _.Container;h.width=1,h.height=this._spacerHeight,h.horizontalAlignment=p.Control.HORIZONTAL_ALIGNMENT_LEFT;const u=new s.Rectangle;u.width=1,u.height=this._barHeight,u.horizontalAlignment=p.Control.HORIZONTAL_ALIGNMENT_LEFT,u.verticalAlignment=p.Control.VERTICAL_ALIGNMENT_CENTER,u.background=this._barColor,u.color="transparent",h.addControl(u),this._panel.addControl(h),this._bars.push(h)}addGroup(h){this._groups.length>0&&this._addSpacer(),this._panel.addControl(h.groupPanel),this._groups.push(h),h.groupPanel.children[0].color=this._headerColor;for(let u=0;u<h.selectors.length;u++)h._setSelectorButtonColor(u,this._buttonColor),h._setSelectorButtonBackground(u,this._buttonBackground)}removeGroup(h){if(h<0||h>=this._groups.length)return;const u=this._groups[h];this._panel.removeControl(u.groupPanel),this._groups.splice(h,1),h<this._bars.length&&(this._panel.removeControl(this._bars[h]),this._bars.splice(h,1))}setHeaderName(h,u){if(u<0||u>=this._groups.length)return;const m=this._groups[u];m.groupPanel.children[0].text=h}relabel(h,u,m){if(u<0||u>=this._groups.length)return;const b=this._groups[u];m<0||m>=b.selectors.length||b._setSelectorLabel(m,h)}removeFromGroupSelector(h,u){if(h<0||h>=this._groups.length)return;const m=this._groups[h];u<0||u>=m.selectors.length||m.removeSelector(u)}addToGroupCheckbox(h,u,m=()=>{},b=!1){if(h<0||h>=this._groups.length)return;this._groups[h].addCheckbox(u,m,b)}addToGroupRadio(h,u,m=()=>{},b=!1){if(h<0||h>=this._groups.length)return;this._groups[h].addRadio(u,m,b)}addToGroupSlider(h,u,m=()=>{},b="Units",P=0,B=0,I=0,x=F=>F|0){if(h<0||h>=this._groups.length)return;this._groups[h].addSlider(u,m,b,P,B,I,x)}}},"../../../dev/gui/dist/2D/controls/sliders/baseSlider.js":(C,v,n)=>{n.r(v),n.d(v,{BaseSlider:()=>d});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/2D/controls/control.js"),g=n("../../../dev/gui/dist/2D/valueAndUnit.js");class d extends f.Control{get displayThumb(){return this._displayThumb}set displayThumb(_){this._displayThumb!==_&&(this._displayThumb=_,this._markAsDirty())}get step(){return this._step}set step(_){this._step!==_&&(this._step=_,this._markAsDirty())}get barOffset(){return this._barOffset.toString(this._host)}get barOffsetInPixels(){return this._barOffset.getValueInPixel(this._host,this._cachedParentMeasure.width)}set barOffset(_){this._barOffset.toString(this._host)!==_&&this._barOffset.fromString(_)&&this._markAsDirty()}get thumbWidth(){return this._thumbWidth.toString(this._host)}get thumbWidthInPixels(){return this._thumbWidth.getValueInPixel(this._host,this._cachedParentMeasure.width)}set thumbWidth(_){this._thumbWidth.toString(this._host)!==_&&this._thumbWidth.fromString(_)&&this._markAsDirty()}get minimum(){return this._minimum}set minimum(_){this._minimum!==_&&(this._minimum=_,this._markAsDirty(),this.value=Math.max(Math.min(this.value,this._maximum),this._minimum))}get maximum(){return this._maximum}set maximum(_){this._maximum!==_&&(this._maximum=_,this._markAsDirty(),this.value=Math.max(Math.min(this.value,this._maximum),this._minimum))}get value(){return this._value}set value(_){_=Math.max(Math.min(_,this._maximum),this._minimum),this._value!==_&&(this._value=_,this._markAsDirty(),this.onValueChangedObservable.notifyObservers(this._value))}get isVertical(){return this._isVertical}set isVertical(_){this._isVertical!==_&&(this._isVertical=_,this._markAsDirty())}get isThumbClamped(){return this._isThumbClamped}set isThumbClamped(_){this._isThumbClamped!==_&&(this._isThumbClamped=_,this._markAsDirty())}constructor(_){super(_);this.name=_,this._thumbWidth=new g.ValueAndUnit(20,g.ValueAndUnit.UNITMODE_PIXEL,!1),this._minimum=0,this._maximum=100,this._value=50,this._isVertical=!1,this._barOffset=new g.ValueAndUnit(5,g.ValueAndUnit.UNITMODE_PIXEL,!1),this._isThumbClamped=!1,this._displayThumb=!0,this._step=0,this._lastPointerDownId=-1,this._effectiveBarOffset=0,this.onValueChangedObservable=new r.Observable,this._pointerIsDown=!1,this.isPointerBlocker=!0}_getTypeName(){return"BaseSlider"}_getThumbPosition(){return this.isVertical?(this.maximum-this.value)/(this.maximum-this.minimum)*this._backgroundBoxLength:(this.value-this.minimum)/(this.maximum-this.minimum)*this._backgroundBoxLength}_getThumbThickness(_){let t=0;switch(_){case"circle":this._thumbWidth.isPixel?t=Math.max(this._thumbWidth.getValue(this._host),this._backgroundBoxThickness):t=this._backgroundBoxThickness*this._thumbWidth.getValue(this._host);break;case"rectangle":this._thumbWidth.isPixel?t=Math.min(this._thumbWidth.getValue(this._host),this._backgroundBoxThickness):t=this._backgroundBoxThickness*this._thumbWidth.getValue(this._host)}return t}_prepareRenderingData(_){if(this._effectiveBarOffset=0,this._renderLeft=this._currentMeasure.left,this._renderTop=this._currentMeasure.top,this._renderWidth=this._currentMeasure.width,this._renderHeight=this._currentMeasure.height,this._backgroundBoxLength=Math.max(this._currentMeasure.width,this._currentMeasure.height),this._backgroundBoxThickness=Math.min(this._currentMeasure.width,this._currentMeasure.height),this._effectiveThumbThickness=this._getThumbThickness(_),this.displayThumb&&(this._backgroundBoxLength-=this._effectiveThumbThickness),this.isVertical&&this._currentMeasure.height<this._currentMeasure.width){console.error("Height should be greater than width");return}this._barOffset.isPixel?this._effectiveBarOffset=Math.min(this._barOffset.getValue(this._host),this._backgroundBoxThickness):this._effectiveBarOffset=this._backgroundBoxThickness*this._barOffset.getValue(this._host),this._backgroundBoxThickness-=this._effectiveBarOffset*2,this.isVertical?(this._renderLeft+=this._effectiveBarOffset,!this.isThumbClamped&&this.displayThumb&&(this._renderTop+=this._effectiveThumbThickness/2),this._renderHeight=this._backgroundBoxLength,this._renderWidth=this._backgroundBoxThickness):(this._renderTop+=this._effectiveBarOffset,!this.isThumbClamped&&this.displayThumb&&(this._renderLeft+=this._effectiveThumbThickness/2),this._renderHeight=this._backgroundBoxThickness,this._renderWidth=this._backgroundBoxLength)}_updateValueFromPointer(_,t){this.rotation!=0&&(this._invertTransformMatrix.transformCoordinates(_,t,this._transformedPosition),_=this._transformedPosition.x,t=this._transformedPosition.y);let i;this._isVertical?i=this._minimum+(1-(t-this._currentMeasure.top)/this._currentMeasure.height)*(this._maximum-this._minimum):i=this._minimum+(_-this._currentMeasure.left)/this._currentMeasure.width*(this._maximum-this._minimum),this.value=this._step?Math.round(i/this._step)*this._step:i}_onPointerDown(_,t,i,o,a){return super._onPointerDown(_,t,i,o,a)?(this.isReadOnly||(this._pointerIsDown=!0,this._updateValueFromPointer(t.x,t.y),this._host._capturingControl[i]=this,this._lastPointerDownId=i),!0):!1}_onPointerMove(_,t,i,o){i==this._lastPointerDownId&&(this._pointerIsDown&&!this.isReadOnly&&this._updateValueFromPointer(t.x,t.y),super._onPointerMove(_,t,i,o))}_onPointerUp(_,t,i,o,a){this._pointerIsDown=!1,delete this._host._capturingControl[i],super._onPointerUp(_,t,i,o,a)}_onCanvasBlur(){this._forcePointerUp(),super._onCanvasBlur()}}(0,s.__decorate)([(0,r.serialize)()],d.prototype,"displayThumb",null),(0,s.__decorate)([(0,r.serialize)()],d.prototype,"step",null),(0,s.__decorate)([(0,r.serialize)()],d.prototype,"barOffset",null),(0,s.__decorate)([(0,r.serialize)()],d.prototype,"thumbWidth",null),(0,s.__decorate)([(0,r.serialize)()],d.prototype,"minimum",null),(0,s.__decorate)([(0,r.serialize)()],d.prototype,"maximum",null),(0,s.__decorate)([(0,r.serialize)()],d.prototype,"value",null),(0,s.__decorate)([(0,r.serialize)()],d.prototype,"isVertical",null),(0,s.__decorate)([(0,r.serialize)()],d.prototype,"isThumbClamped",null)},"../../../dev/gui/dist/2D/controls/sliders/imageBasedSlider.js":(C,v,n)=>{n.r(v),n.d(v,{ImageBasedSlider:()=>e});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("../../../dev/gui/dist/2D/controls/sliders/baseSlider.js"),p=n("../../../dev/gui/dist/2D/measure.js"),f=n("../../../dev/gui/dist/2D/controls/image.js"),g=n("core/Misc/observable"),d=n.n(g);class e extends r.BaseSlider{get displayThumb(){return this._displayThumb&&this.thumbImage!=null}set displayThumb(t){this._displayThumb!==t&&(this._displayThumb=t,this._markAsDirty())}get backgroundImage(){return this._backgroundImage}set backgroundImage(t){this._backgroundImage!==t&&(this._backgroundImage=t,t&&!t.isLoaded&&t.onImageLoadedObservable.addOnce(()=>this._markAsDirty()),this._markAsDirty())}get valueBarImage(){return this._valueBarImage}set valueBarImage(t){this._valueBarImage!==t&&(this._valueBarImage=t,t&&!t.isLoaded&&t.onImageLoadedObservable.addOnce(()=>this._markAsDirty()),this._markAsDirty())}get thumbImage(){return this._thumbImage}set thumbImage(t){this._thumbImage!==t&&(this._thumbImage=t,t&&!t.isLoaded&&t.onImageLoadedObservable.addOnce(()=>this._markAsDirty()),this._markAsDirty())}constructor(t){super(t);this.name=t,this._tempMeasure=new p.Measure(0,0,0,0)}_getTypeName(){return"ImageBasedSlider"}_draw(t){t.save(),this._applyStates(t),this._prepareRenderingData("rectangle");const i=this._getThumbPosition(),o=this._renderLeft,a=this._renderTop,l=this._renderWidth,c=this._renderHeight;this._backgroundImage&&(this._tempMeasure.copyFromFloats(o,a,l,c),this.isThumbClamped&&this.displayThumb&&(this.isVertical?this._tempMeasure.height+=this._effectiveThumbThickness:this._tempMeasure.width+=this._effectiveThumbThickness),this._backgroundImage._currentMeasure.copyFrom(this._tempMeasure),this._backgroundImage._draw(t)),this._valueBarImage&&(this.isVertical?this.isThumbClamped&&this.displayThumb?this._tempMeasure.copyFromFloats(o,a+i,l,c-i+this._effectiveThumbThickness):this._tempMeasure.copyFromFloats(o,a+i,l,c-i):this.isThumbClamped&&this.displayThumb?this._tempMeasure.copyFromFloats(o,a,i+this._effectiveThumbThickness/2,c):this._tempMeasure.copyFromFloats(o,a,i,c),this._valueBarImage._currentMeasure.copyFrom(this._tempMeasure),this._valueBarImage._draw(t)),this.displayThumb&&(this.isVertical?this._tempMeasure.copyFromFloats(o-this._effectiveBarOffset,this._currentMeasure.top+i,this._currentMeasure.width,this._effectiveThumbThickness):this._tempMeasure.copyFromFloats(this._currentMeasure.left+i,this._currentMeasure.top,this._effectiveThumbThickness,this._currentMeasure.height),this._thumbImage._currentMeasure.copyFrom(this._tempMeasure),this._thumbImage._draw(t)),t.restore()}serialize(t){super.serialize(t);const i={},o={},a={};this.backgroundImage.serialize(i),this.thumbImage.serialize(o),this.valueBarImage.serialize(a),t.backgroundImage=i,t.thumbImage=o,t.valueBarImage=a}_parseFromContent(t,i){super._parseFromContent(t,i),this.backgroundImage=f.Image.Parse(t.backgroundImage,i),this.thumbImage=f.Image.Parse(t.thumbImage,i),this.valueBarImage=f.Image.Parse(t.valueBarImage,i)}}(0,s.__decorate)([(0,g.serialize)()],e.prototype,"displayThumb",null),(0,g.RegisterClass)("BABYLON.GUI.ImageBasedSlider",e)},"../../../dev/gui/dist/2D/controls/sliders/imageScrollBar.js":(C,v,n)=>{n.r(v),n.d(v,{ImageScrollBar:()=>d});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("../../../dev/gui/dist/2D/controls/sliders/baseSlider.js"),p=n("../../../dev/gui/dist/2D/measure.js"),f=n("core/Misc/observable"),g=n.n(f);class d extends r.BaseSlider{get invertScrollDirection(){return this._invertScrollDirection}set invertScrollDirection(_){this._invertScrollDirection=_}get backgroundImage(){return this._backgroundBaseImage}set backgroundImage(_){this._backgroundBaseImage!==_&&(this._backgroundBaseImage=_,this.isVertical&&this.num90RotationInVerticalMode!==0?_.isLoaded?(this._backgroundImage=_._rotate90(this.num90RotationInVerticalMode,!0),this._markAsDirty()):_.onImageLoadedObservable.addOnce(()=>{const t=_._rotate90(this.num90RotationInVerticalMode,!0);this._backgroundImage=t,t.isLoaded||t.onImageLoadedObservable.addOnce(()=>{this._markAsDirty()}),this._markAsDirty()}):(this._backgroundImage=_,_&&!_.isLoaded&&_.onImageLoadedObservable.addOnce(()=>{this._markAsDirty()}),this._markAsDirty()))}get thumbImage(){return this._thumbBaseImage}set thumbImage(_){this._thumbBaseImage!==_&&(this._thumbBaseImage=_,this.isVertical&&this.num90RotationInVerticalMode!==0?_.isLoaded?(this._thumbImage=_._rotate90(-this.num90RotationInVerticalMode,!0),this._markAsDirty()):_.onImageLoadedObservable.addOnce(()=>{const t=_._rotate90(-this.num90RotationInVerticalMode,!0);this._thumbImage=t,t.isLoaded||t.onImageLoadedObservable.addOnce(()=>{this._markAsDirty()}),this._markAsDirty()}):(this._thumbImage=_,_&&!_.isLoaded&&_.onImageLoadedObservable.addOnce(()=>{this._markAsDirty()}),this._markAsDirty()))}get thumbLength(){return this._thumbLength}set thumbLength(_){this._thumbLength!==_&&(this._thumbLength=_,this._markAsDirty())}get thumbHeight(){return this._thumbHeight}set thumbHeight(_){this._thumbLength!==_&&(this._thumbHeight=_,this._markAsDirty())}get barImageHeight(){return this._barImageHeight}set barImageHeight(_){this._barImageHeight!==_&&(this._barImageHeight=_,this._markAsDirty())}constructor(_){super(_);this.name=_,this._thumbLength=.5,this._thumbHeight=1,this._barImageHeight=1,this._tempMeasure=new p.Measure(0,0,0,0),this._invertScrollDirection=!1,this.num90RotationInVerticalMode=1}_getTypeName(){return"ImageScrollBar"}_getThumbThickness(){let _=0;return this._thumbWidth.isPixel?_=this._thumbWidth.getValue(this._host):_=this._backgroundBoxThickness*this._thumbWidth.getValue(this._host),_}_draw(_){_.save(),this._applyStates(_),this._prepareRenderingData("rectangle");const t=this._getThumbPosition(),i=this._renderLeft,o=this._renderTop,a=this._renderWidth,l=this._renderHeight;this._backgroundImage&&(this._tempMeasure.copyFromFloats(i,o,a,l),this.isVertical?(this._tempMeasure.copyFromFloats(i+a*(1-this._barImageHeight)*.5,this._currentMeasure.top,a*this._barImageHeight,l),this._tempMeasure.height+=this._effectiveThumbThickness,this._backgroundImage._currentMeasure.copyFrom(this._tempMeasure)):(this._tempMeasure.copyFromFloats(this._currentMeasure.left,o+l*(1-this._barImageHeight)*.5,a,l*this._barImageHeight),this._tempMeasure.width+=this._effectiveThumbThickness,this._backgroundImage._currentMeasure.copyFrom(this._tempMeasure)),this._backgroundImage._draw(_)),this.isVertical?this._tempMeasure.copyFromFloats(i-this._effectiveBarOffset+this._currentMeasure.width*(1-this._thumbHeight)*.5,this._currentMeasure.top+t,this._currentMeasure.width*this._thumbHeight,this._effectiveThumbThickness):this._tempMeasure.copyFromFloats(this._currentMeasure.left+t,this._currentMeasure.top+this._currentMeasure.height*(1-this._thumbHeight)*.5,this._effectiveThumbThickness,this._currentMeasure.height*this._thumbHeight),this._thumbImage&&(this._thumbImage._currentMeasure.copyFrom(this._tempMeasure),this._thumbImage._draw(_)),_.restore()}_updateValueFromPointer(_,t){this.rotation!=0&&(this._invertTransformMatrix.transformCoordinates(_,t,this._transformedPosition),_=this._transformedPosition.x,t=this._transformedPosition.y);const i=this._invertScrollDirection?-1:1;this._first&&(this._first=!1,this._originX=_,this._originY=t,(_<this._tempMeasure.left||_>this._tempMeasure.left+this._tempMeasure.width||t<this._tempMeasure.top||t>this._tempMeasure.top+this._tempMeasure.height)&&(this.isVertical?this.value=this.minimum+(1-(t-this._currentMeasure.top)/this._currentMeasure.height)*(this.maximum-this.minimum):this.value=this.minimum+(_-this._currentMeasure.left)/this._currentMeasure.width*(this.maximum-this.minimum)));let o=0;this.isVertical?o=-((t-this._originY)/(this._currentMeasure.height-this._effectiveThumbThickness)):o=(_-this._originX)/(this._currentMeasure.width-this._effectiveThumbThickness),this.value+=i*o*(this.maximum-this.minimum),this._originX=_,this._originY=t}_onPointerDown(_,t,i,o,a){return this._first=!0,super._onPointerDown(_,t,i,o,a)}}(0,s.__decorate)([(0,f.serialize)()],d.prototype,"num90RotationInVerticalMode",void 0),(0,s.__decorate)([(0,f.serialize)()],d.prototype,"invertScrollDirection",null)},"../../../dev/gui/dist/2D/controls/sliders/scrollBar.js":(C,v,n)=>{n.r(v),n.d(v,{ScrollBar:()=>d});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("../../../dev/gui/dist/2D/controls/sliders/baseSlider.js"),p=n("../../../dev/gui/dist/2D/measure.js"),f=n("core/Misc/observable"),g=n.n(f);class d extends r.BaseSlider{get borderColor(){return this._borderColor}set borderColor(_){this._borderColor!==_&&(this._borderColor=_,this._markAsDirty())}get background(){return this._background}set background(_){this._background!==_&&(this._background=_,this._markAsDirty())}get backgroundGradient(){return this._backgroundGradient}set backgroundGradient(_){this._backgroundGradient!==_&&(this._backgroundGradient=_,this._markAsDirty())}get invertScrollDirection(){return this._invertScrollDirection}set invertScrollDirection(_){this._invertScrollDirection=_}constructor(_){super(_);this.name=_,this._background="black",this._borderColor="white",this._tempMeasure=new p.Measure(0,0,0,0),this._invertScrollDirection=!1,this._backgroundGradient=null}_getTypeName(){return"Scrollbar"}_getThumbThickness(){let _=0;return this._thumbWidth.isPixel?_=this._thumbWidth.getValue(this._host):_=this._backgroundBoxThickness*this._thumbWidth.getValue(this._host),_}_getBackgroundColor(_){return this._backgroundGradient?this._backgroundGradient.getCanvasGradient(_):this._background}_draw(_){_.save(),this._applyStates(_),this._prepareRenderingData("rectangle");const t=this._renderLeft,i=this._getThumbPosition();_.fillStyle=this._getBackgroundColor(_),_.fillRect(this._currentMeasure.left,this._currentMeasure.top,this._currentMeasure.width,this._currentMeasure.height),_.fillStyle=this._getColor(_),this.isVertical?(this._tempMeasure.left=t-this._effectiveBarOffset,this._tempMeasure.top=this._currentMeasure.top+i,this._tempMeasure.width=this._currentMeasure.width,this._tempMeasure.height=this._effectiveThumbThickness):(this._tempMeasure.left=this._currentMeasure.left+i,this._tempMeasure.top=this._currentMeasure.top,this._tempMeasure.width=this._effectiveThumbThickness,this._tempMeasure.height=this._currentMeasure.height),_.fillRect(this._tempMeasure.left,this._tempMeasure.top,this._tempMeasure.width,this._tempMeasure.height),_.restore()}_updateValueFromPointer(_,t){this.rotation!=0&&(this._invertTransformMatrix.transformCoordinates(_,t,this._transformedPosition),_=this._transformedPosition.x,t=this._transformedPosition.y);const i=this._invertScrollDirection?-1:1;this._first&&(this._first=!1,this._originX=_,this._originY=t,(_<this._tempMeasure.left||_>this._tempMeasure.left+this._tempMeasure.width||t<this._tempMeasure.top||t>this._tempMeasure.top+this._tempMeasure.height)&&(this.isVertical?this.value=this.minimum+(1-(t-this._currentMeasure.top)/this._currentMeasure.height)*(this.maximum-this.minimum):this.value=this.minimum+(_-this._currentMeasure.left)/this._currentMeasure.width*(this.maximum-this.minimum)));let o=0;this.isVertical?o=-((t-this._originY)/(this._currentMeasure.height-this._effectiveThumbThickness)):o=(_-this._originX)/(this._currentMeasure.width-this._effectiveThumbThickness),this.value+=i*o*(this.maximum-this.minimum),this._originX=_,this._originY=t}_onPointerDown(_,t,i,o,a){return this._first=!0,super._onPointerDown(_,t,i,o,a)}serialize(_){super.serialize(_),this.backgroundGradient&&(_.backgroundGradient={},this.backgroundGradient.serialize(_.backgroundGradient))}_parseFromContent(_,t){if(super._parseFromContent(_,t),_.backgroundGradient){const i=f.Tools.Instantiate("BABYLON.GUI."+_.backgroundGradient.className);this.backgroundGradient=new i,this.backgroundGradient.parse(_.backgroundGradient)}}}(0,s.__decorate)([(0,f.serialize)()],d.prototype,"borderColor",null),(0,s.__decorate)([(0,f.serialize)()],d.prototype,"background",null),(0,s.__decorate)([(0,f.serialize)()],d.prototype,"invertScrollDirection",null),(0,f.RegisterClass)("BABYLON.GUI.Scrollbar",d)},"../../../dev/gui/dist/2D/controls/sliders/slider.js":(C,v,n)=>{n.r(v),n.d(v,{Slider:()=>g});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("../../../dev/gui/dist/2D/controls/sliders/baseSlider.js"),p=n("core/Misc/observable"),f=n.n(p);class g extends r.BaseSlider{get displayValueBar(){return this._displayValueBar}set displayValueBar(e){this._displayValueBar!==e&&(this._displayValueBar=e,this._markAsDirty())}get borderColor(){return this._borderColor}set borderColor(e){this._borderColor!==e&&(this._borderColor=e,this._markAsDirty())}get background(){return this._background}set background(e){this._background!==e&&(this._background=e,this._markAsDirty())}get backgroundGradient(){return this._backgroundGradient}set backgroundGradient(e){this._backgroundGradient!==e&&(this._backgroundGradient=e,this._markAsDirty())}get thumbColor(){return this._thumbColor}set thumbColor(e){this._thumbColor!==e&&(this._thumbColor=e,this._markAsDirty())}get isThumbCircle(){return this._isThumbCircle}set isThumbCircle(e){this._isThumbCircle!==e&&(this._isThumbCircle=e,this._markAsDirty())}constructor(e){super(e);this.name=e,this._background="black",this._borderColor="white",this._thumbColor="",this._isThumbCircle=!1,this._displayValueBar=!0,this._backgroundGradient=null}_getTypeName(){return"Slider"}_getBackgroundColor(e){return this._backgroundGradient?this._backgroundGradient.getCanvasGradient(e):this._background}_draw(e){e.save(),this._applyStates(e),this._prepareRenderingData(this.isThumbCircle?"circle":"rectangle");let _=this._renderLeft,t=this._renderTop;const i=this._renderWidth,o=this._renderHeight;let a=0;this.isThumbClamped&&this.isThumbCircle?(this.isVertical?t+=this._effectiveThumbThickness/2:_+=this._effectiveThumbThickness/2,a=this._backgroundBoxThickness/2):a=(this._effectiveThumbThickness-this._effectiveBarOffset)/2,(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(e.shadowColor=this.shadowColor,e.shadowBlur=this.shadowBlur,e.shadowOffsetX=this.shadowOffsetX,e.shadowOffsetY=this.shadowOffsetY);const l=this._getThumbPosition();e.fillStyle=this._getBackgroundColor(e),this.isVertical?this.isThumbClamped?this.isThumbCircle?(e.beginPath(),e.arc(_+this._backgroundBoxThickness/2,t,a,Math.PI,2*Math.PI),e.fill(),e.fillRect(_,t,i,o)):e.fillRect(_,t,i,o+this._effectiveThumbThickness):e.fillRect(_,t,i,o):this.isThumbClamped?this.isThumbCircle?(e.beginPath(),e.arc(_+this._backgroundBoxLength,t+this._backgroundBoxThickness/2,a,0,2*Math.PI),e.fill(),e.fillRect(_,t,i,o)):e.fillRect(_,t,i+this._effectiveThumbThickness,o):e.fillRect(_,t,i,o),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0),e.fillStyle=this._getColor(e),this._displayValueBar&&(this.isVertical?this.isThumbClamped?this.isThumbCircle?(e.beginPath(),e.arc(_+this._backgroundBoxThickness/2,t+this._backgroundBoxLength,a,0,2*Math.PI),e.fill(),e.fillRect(_,t+l,i,o-l)):e.fillRect(_,t+l,i,o-l+this._effectiveThumbThickness):e.fillRect(_,t+l,i,o-l):(this.isThumbClamped&&this.isThumbCircle&&(e.beginPath(),e.arc(_,t+this._backgroundBoxThickness/2,a,0,2*Math.PI),e.fill()),e.fillRect(_,t,l,o))),e.fillStyle=this._thumbColor||this._getColor(e),this.displayThumb&&((this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(e.shadowColor=this.shadowColor,e.shadowBlur=this.shadowBlur,e.shadowOffsetX=this.shadowOffsetX,e.shadowOffsetY=this.shadowOffsetY),this._isThumbCircle?(e.beginPath(),this.isVertical?e.arc(_+this._backgroundBoxThickness/2,t+l,a,0,2*Math.PI):e.arc(_+l,t+this._backgroundBoxThickness/2,a,0,2*Math.PI),e.fill(),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0),e.strokeStyle=this._borderColor,e.stroke()):(this.isVertical?e.fillRect(_-this._effectiveBarOffset,this._currentMeasure.top+l,this._currentMeasure.width,this._effectiveThumbThickness):e.fillRect(this._currentMeasure.left+l,this._currentMeasure.top,this._effectiveThumbThickness,this._currentMeasure.height),(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0),e.strokeStyle=this._borderColor,this.isVertical?e.strokeRect(_-this._effectiveBarOffset,this._currentMeasure.top+l,this._currentMeasure.width,this._effectiveThumbThickness):e.strokeRect(this._currentMeasure.left+l,this._currentMeasure.top,this._effectiveThumbThickness,this._currentMeasure.height))),e.restore()}serialize(e){super.serialize(e),this.backgroundGradient&&(e.backgroundGradient={},this.backgroundGradient.serialize(e.backgroundGradient))}_parseFromContent(e,_){if(super._parseFromContent(e,_),e.backgroundGradient){const t=p.Tools.Instantiate("BABYLON.GUI."+e.backgroundGradient.className);this.backgroundGradient=new t,this.backgroundGradient.parse(e.backgroundGradient)}}}(0,s.__decorate)([(0,p.serialize)()],g.prototype,"displayValueBar",null),(0,s.__decorate)([(0,p.serialize)()],g.prototype,"borderColor",null),(0,s.__decorate)([(0,p.serialize)()],g.prototype,"background",null),(0,s.__decorate)([(0,p.serialize)()],g.prototype,"thumbColor",null),(0,s.__decorate)([(0,p.serialize)()],g.prototype,"isThumbCircle",null),(0,p.RegisterClass)("BABYLON.GUI.Slider",g)},"../../../dev/gui/dist/2D/controls/stackPanel.js":(C,v,n)=>{n.r(v),n.d(v,{StackPanel:()=>e});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/2D/controls/container.js"),g=n("../../../dev/gui/dist/2D/controls/control.js"),d=n("../../../dev/gui/dist/2D/controls/textBlock.js");class e extends f.Container{get isVertical(){return this._isVertical}set isVertical(t){this._isVertical!==t&&(this._isVertical=t,this._markAsDirty())}get spacing(){return this._spacing}set spacing(t){this._spacing!==t&&(this._spacing=t,this._markAsDirty())}set width(t){this._doNotTrackManualChanges||(this._manualWidth=!0),this._width.toString(this._host)!==t&&this._width.fromString(t)&&this._markAsDirty()}get width(){return this._width.toString(this._host)}set height(t){this._doNotTrackManualChanges||(this._manualHeight=!0),this._height.toString(this._host)!==t&&this._height.fromString(t)&&this._markAsDirty()}get height(){return this._height.toString(this._host)}constructor(t){super(t);this.name=t,this._isVertical=!0,this._manualWidth=!1,this._manualHeight=!1,this._doNotTrackManualChanges=!1,this._spacing=0,this.ignoreLayoutWarnings=!1}_getTypeName(){return"StackPanel"}_preMeasure(t,i){for(const o of this._children)this._isVertical?o.verticalAlignment=g.Control.VERTICAL_ALIGNMENT_TOP:o.horizontalAlignment=g.Control.HORIZONTAL_ALIGNMENT_LEFT;super._preMeasure(t,i)}_additionalProcessing(t,i){super._additionalProcessing(t,i),this._measureForChildren.copyFrom(t),this._measureForChildren.left=this._currentMeasure.left,this._measureForChildren.top=this._currentMeasure.top,(!this.isVertical||this._manualWidth)&&(this._measureForChildren.width=this._currentMeasure.width),(this.isVertical||this._manualHeight)&&(this._measureForChildren.height=this._currentMeasure.height)}_postMeasure(){let t=0,i=0;const o=this._children.length;for(let c=0;c<o;c++){const h=this._children[c];!h.isVisible||h.notRenderable||(this._isVertical?(h.top!==i+"px"&&(h.top=i+"px",this._rebuildLayout=!0,h._top.ignoreAdaptiveScaling=!0),h._height.isPercentage&&!h._automaticSize?this.ignoreLayoutWarnings||r.Tools.Warn(`Control (Name:${h.name}, UniqueId:${h.uniqueId}) is using height in percentage mode inside a vertical StackPanel`):i+=h._currentMeasure.height+h._paddingTopInPixels+h._paddingBottomInPixels+(c<o-1?this._spacing:0)):(h.left!==t+"px"&&(h.left=t+"px",this._rebuildLayout=!0,h._left.ignoreAdaptiveScaling=!0),h._width.isPercentage&&!h._automaticSize&&h.getClassName()==="TextBlock"&&h.textWrapping!==d.TextWrapping.Clip&&!h.forceResizeWidth?this.ignoreLayoutWarnings||r.Tools.Warn(`Control (Name:${h.name}, UniqueId:${h.uniqueId}) is using width in percentage mode inside a horizontal StackPanel`):t+=h._currentMeasure.width+h._paddingLeftInPixels+h._paddingRightInPixels+(c<o-1?this._spacing:0)))}t+=this._paddingLeftInPixels+this._paddingRightInPixels,i+=this._paddingTopInPixels+this._paddingBottomInPixels,this._doNotTrackManualChanges=!0;let a=!1,l=!1;if((!this._manualHeight||this.adaptHeightToChildren)&&this._isVertical){const c=this.height;this.height=i+"px",l=c!==this.height||!this._height.ignoreAdaptiveScaling}if((!this._manualWidth||this.adaptWidthToChildren)&&!this._isVertical){const c=this.width;this.width=t+"px",a=c!==this.width||!this._width.ignoreAdaptiveScaling}l&&(this._height.ignoreAdaptiveScaling=!0),a&&(this._width.ignoreAdaptiveScaling=!0),this._doNotTrackManualChanges=!1,(a||l)&&(this._rebuildLayout=!0),super._postMeasure()}serialize(t){super.serialize(t),t.manualWidth=this._manualWidth,t.manualHeight=this._manualHeight}_parseFromContent(t,i){this._manualWidth=t.manualWidth,this._manualHeight=t.manualHeight,super._parseFromContent(t,i)}}(0,s.__decorate)([(0,r.serialize)()],e.prototype,"ignoreLayoutWarnings",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"isVertical",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"spacing",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"width",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"height",null),(0,r.RegisterClass)("BABYLON.GUI.StackPanel",e)},"../../../dev/gui/dist/2D/controls/statics.js":(C,v,n)=>{n.r(v),n.d(v,{name:()=>f});var s=n("../../../dev/gui/dist/2D/controls/control.js"),r=n("../../../dev/gui/dist/2D/controls/stackPanel.js"),p=n("../../../dev/gui/dist/2D/controls/textBlock.js");const f="Statics";s.Control.AddHeader=function(g,d,e,_){const t=new r.StackPanel("panel"),i=_?_.isHorizontal:!0,o=_?_.controlFirst:!0;t.isVertical=!i;const a=new p.TextBlock("header");return a.text=d,a.textHorizontalAlignment=s.Control.HORIZONTAL_ALIGNMENT_LEFT,i?a.width=e:a.height=e,o?(t.addControl(g),t.addControl(a),a.paddingLeft="5px"):(t.addControl(a),t.addControl(g),a.paddingRight="5px"),a.shadowBlur=g.shadowBlur,a.shadowColor=g.shadowColor,a.shadowOffsetX=g.shadowOffsetX,a.shadowOffsetY=g.shadowOffsetY,t}},"../../../dev/gui/dist/2D/controls/textBlock.js":(C,v,n)=>{n.r(v),n.d(v,{TextBlock:()=>e,TextWrapping:()=>d});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/2D/valueAndUnit.js"),g=n("../../../dev/gui/dist/2D/controls/control.js"),d;(function(_){_[_.Clip=0]="Clip",_[_.WordWrap=1]="WordWrap",_[_.Ellipsis=2]="Ellipsis",_[_.WordWrapEllipsis=3]="WordWrapEllipsis"})(d||(d={}));class e extends g.Control{get lines(){return this._lines}get resizeToFit(){return this._resizeToFit}set resizeToFit(t){this._resizeToFit!==t&&(this._resizeToFit=t,this._resizeToFit&&(this._width.ignoreAdaptiveScaling=!0,this._height.ignoreAdaptiveScaling=!0),this._markAsDirty())}get textWrapping(){return this._textWrapping}set textWrapping(t){this._textWrapping!==t&&(this._textWrapping=+t,this._markAsDirty())}get text(){return this._text}set text(t){this._text!==t&&(this._text=t+"",this._markAsDirty(),this.onTextChangedObservable.notifyObservers(this))}get textHorizontalAlignment(){return this._textHorizontalAlignment}set textHorizontalAlignment(t){this._textHorizontalAlignment!==t&&(this._textHorizontalAlignment=t,this._markAsDirty())}get textVerticalAlignment(){return this._textVerticalAlignment}set textVerticalAlignment(t){this._textVerticalAlignment!==t&&(this._textVerticalAlignment=t,this._markAsDirty())}set lineSpacing(t){this._lineSpacing.fromString(t)&&this._markAsDirty()}get lineSpacing(){return this._lineSpacing.toString(this._host)}get outlineWidth(){return this._outlineWidth}set outlineWidth(t){this._outlineWidth!==t&&(this._outlineWidth=t,this._markAsDirty())}get underline(){return this._underline}set underline(t){this._underline!==t&&(this._underline=t,this._markAsDirty())}get lineThrough(){return this._lineThrough}set lineThrough(t){this._lineThrough!==t&&(this._lineThrough=t,this._markAsDirty())}get applyOutlineToUnderline(){return this._applyOutlineToUnderline}set applyOutlineToUnderline(t){this._applyOutlineToUnderline!==t&&(this._applyOutlineToUnderline=t,this._markAsDirty())}get outlineColor(){return this._outlineColor}set outlineColor(t){this._outlineColor!==t&&(this._outlineColor=t,this._markAsDirty())}get wordDivider(){return this._wordDivider}set wordDivider(t){this._wordDivider!==t&&(this._wordDivider=t,this._markAsDirty())}get forceResizeWidth(){return this._forceResizeWidth}set forceResizeWidth(t){this._forceResizeWidth!==t&&(this._forceResizeWidth=t,this._markAsDirty())}constructor(t,i=""){super(t);this.name=t,this._text="",this._textWrapping=d.Clip,this._textHorizontalAlignment=g.Control.HORIZONTAL_ALIGNMENT_CENTER,this._textVerticalAlignment=g.Control.VERTICAL_ALIGNMENT_CENTER,this._resizeToFit=!1,this._lineSpacing=new f.ValueAndUnit(0),this._outlineWidth=0,this._outlineColor="white",this._underline=!1,this._lineThrough=!1,this._wordDivider=" ",this._forceResizeWidth=!1,this._applyOutlineToUnderline=!1,this.onTextChangedObservable=new r.Observable,this.onLinesReadyObservable=new r.Observable,this._linesTemp=[],this.text=i}_getTypeName(){return"TextBlock"}_processMeasures(t,i){(!this._fontOffset||this.isDirty)&&(this._fontOffset=g.Control._GetFontOffset(i.font)),super._processMeasures(t,i),this._lines=this._breakLines(this._currentMeasure.width,this._currentMeasure.height,i),this.onLinesReadyObservable.notifyObservers(this);let o=0;for(let a=0;a<this._lines.length;a++){const l=this._lines[a];l.width>o&&(o=l.width)}if(this._resizeToFit){if(this._textWrapping===d.Clip||this._forceResizeWidth){const l=Math.ceil(this._paddingLeftInPixels)+Math.ceil(this._paddingRightInPixels)+Math.ceil(o);l!==this._width.getValueInPixel(this._host,this._tempParentMeasure.width)&&(this._width.updateInPlace(l,f.ValueAndUnit.UNITMODE_PIXEL),this._rebuildLayout=!0)}let a=this._paddingTopInPixels+this._paddingBottomInPixels+this._fontOffset.height*this._lines.length|0;if(this._lines.length>0&&this._lineSpacing.internalValue!==0){let l=0;this._lineSpacing.isPixel?l=this._lineSpacing.getValue(this._host):l=this._lineSpacing.getValue(this._host)*this._height.getValueInPixel(this._host,this._cachedParentMeasure.height),a+=(this._lines.length-1)*l}a!==this._height.internalValue&&(this._height.updateInPlace(a,f.ValueAndUnit.UNITMODE_PIXEL),this._rebuildLayout=!0)}}_drawText(t,i,o,a){const l=this._currentMeasure.width;let c=0;switch(this._textHorizontalAlignment){case g.Control.HORIZONTAL_ALIGNMENT_LEFT:c=0;break;case g.Control.HORIZONTAL_ALIGNMENT_RIGHT:c=l-i;break;case g.Control.HORIZONTAL_ALIGNMENT_CENTER:c=(l-i)/2;break}(this.shadowBlur||this.shadowOffsetX||this.shadowOffsetY)&&(a.shadowColor=this.shadowColor,a.shadowBlur=this.shadowBlur,a.shadowOffsetX=this.shadowOffsetX,a.shadowOffsetY=this.shadowOffsetY),this.outlineWidth&&a.strokeText(t,this._currentMeasure.left+c,o),a.fillText(t,this._currentMeasure.left+c,o),this._underline&&this._drawLine(this._currentMeasure.left+c,o+3,this._currentMeasure.left+c+i,o+3,a),this._lineThrough&&this._drawLine(this._currentMeasure.left+c,o-this.fontSizeInPixels/3,this._currentMeasure.left+c+i,o-this.fontSizeInPixels/3,a)}_drawLine(t,i,o,a,l){if(l.beginPath(),l.lineWidth=Math.round(this.fontSizeInPixels*.05),l.moveTo(t,i),l.lineTo(o,a),this.outlineWidth&&this.applyOutlineToUnderline)l.stroke(),l.fill();else{const c=l.strokeStyle;l.strokeStyle=l.fillStyle,l.stroke(),l.strokeStyle=c}l.closePath()}_draw(t){t.save(),this._applyStates(t),this._renderLines(t),t.restore()}_applyStates(t){super._applyStates(t),this.outlineWidth&&(t.lineWidth=this.outlineWidth,t.strokeStyle=this.outlineColor,t.lineJoin="miter",t.miterLimit=2)}_breakLines(t,i,o){this._linesTemp.length=0;const a=this.text.split(`
`);if(this._textWrapping===d.Ellipsis)for(const l of a)this._linesTemp.push(this._parseLineEllipsis(l,t,o));else if(this._textWrapping===d.WordWrap)for(const l of a)this._linesTemp.push(...this._parseLineWordWrap(l,t,o));else if(this._textWrapping===d.WordWrapEllipsis)for(const l of a)this._linesTemp.push(...this._parseLineWordWrapEllipsis(l,t,i,o));else for(const l of a)this._linesTemp.push(this._parseLine(l,o));return this._linesTemp}_parseLine(t="",i){return{text:t,width:this._getTextMetricsWidth(i.measureText(t))}}_getCharsToRemove(t,i,o){const a=t>i?t-i:0,l=t/o;return Math.max(Math.floor(a/l),1)}_parseLineEllipsis(t="",i,o){let a=this._getTextMetricsWidth(o.measureText(t)),l=this._getCharsToRemove(a,i,t.length);const c=Array.from&&Array.from(t);if(c)for(;c.length&&a>i;)c.splice(c.length-l,l),t=`${c.join("")}\u2026`,a=this._getTextMetricsWidth(o.measureText(t)),l=this._getCharsToRemove(a,i,t.length);else{for(;t.length>2&&a>i;)t=t.slice(0,-l),a=this._getTextMetricsWidth(o.measureText(t+"\u2026")),l=this._getCharsToRemove(a,i,t.length);t+="\u2026"}return{text:t,width:a}}_getTextMetricsWidth(t){return t.actualBoundingBoxLeft!==void 0?Math.abs(t.actualBoundingBoxLeft)+Math.abs(t.actualBoundingBoxRight):t.width}_parseLineWordWrap(t="",i,o){const a=[],l=this.wordSplittingFunction?this.wordSplittingFunction(t):t.split(this._wordDivider);let c=this._getTextMetricsWidth(o.measureText(t));for(let h=0;h<l.length;h++){const u=h>0?t+this._wordDivider+l[h]:l[0],m=this._getTextMetricsWidth(o.measureText(u));m>i&&h>0?(a.push({text:t,width:c}),t=l[h],c=this._getTextMetricsWidth(o.measureText(t))):(c=m,t=u)}return a.push({text:t,width:c}),a}_parseLineWordWrapEllipsis(t="",i,o,a){const l=this._parseLineWordWrap(t,i,a);for(let c=1;c<=l.length;c++)if(this._computeHeightForLinesOf(c)>o&&c>1){const u=l[c-2],m=l[c-1];l[c-2]=this._parseLineEllipsis(u.text+this._wordDivider+m.text,i,a);const b=l.length-c+1;for(let P=0;P<b;P++)l.pop();return l}return l}_renderLines(t){if(!this._fontOffset||!this._lines)return;const i=this._currentMeasure.height;let o=0;switch(this._textVerticalAlignment){case g.Control.VERTICAL_ALIGNMENT_TOP:o=this._fontOffset.ascent;break;case g.Control.VERTICAL_ALIGNMENT_BOTTOM:o=i-this._fontOffset.height*(this._lines.length-1)-this._fontOffset.descent;break;case g.Control.VERTICAL_ALIGNMENT_CENTER:o=this._fontOffset.ascent+(i-this._fontOffset.height*this._lines.length)/2;break}o+=this._currentMeasure.top;for(let a=0;a<this._lines.length;a++){const l=this._lines[a];a!==0&&this._lineSpacing.internalValue!==0&&(this._lineSpacing.isPixel?o+=this._lineSpacing.getValue(this._host):o=o+this._lineSpacing.getValue(this._host)*this._height.getValueInPixel(this._host,this._cachedParentMeasure.height)),this._drawText(l.text,l.width,o,t),o+=this._fontOffset.height}}_computeHeightForLinesOf(t){let i=this._paddingTopInPixels+this._paddingBottomInPixels+this._fontOffset.height*t;if(t>0&&this._lineSpacing.internalValue!==0){let o=0;this._lineSpacing.isPixel?o=this._lineSpacing.getValue(this._host):o=this._lineSpacing.getValue(this._host)*this._height.getValueInPixel(this._host,this._cachedParentMeasure.height),i+=(t-1)*o}return i}computeExpectedHeight(){var t;if(this.text&&this.widthInPixels){const i=(t=r.EngineStore.LastCreatedEngine)==null?void 0:t.createCanvas(0,0).getContext("2d");if(i){this._applyStates(i),this._fontOffset||(this._fontOffset=g.Control._GetFontOffset(i.font));const o=this._lines?this._lines:this._breakLines(this.widthInPixels-this._paddingLeftInPixels-this._paddingRightInPixels,this.heightInPixels-this._paddingTopInPixels-this._paddingBottomInPixels,i);return this._computeHeightForLinesOf(o.length)}}return 0}dispose(){super.dispose(),this.onTextChangedObservable.clear()}}(0,s.__decorate)([(0,r.serialize)()],e.prototype,"resizeToFit",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"textWrapping",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"text",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"textHorizontalAlignment",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"textVerticalAlignment",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"lineSpacing",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"outlineWidth",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"underline",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"lineThrough",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"applyOutlineToUnderline",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"outlineColor",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"wordDivider",null),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"forceResizeWidth",null),(0,r.RegisterClass)("BABYLON.GUI.TextBlock",e)},"../../../dev/gui/dist/2D/controls/textWrapper.js":(C,v,n)=>{n.r(v),n.d(v,{TextWrapper:()=>s});class s{get text(){return this._characters?this._characters.join(""):this._text}set text(p){this._text=p,this._characters=Array.from&&Array.from(p)}get length(){return this._characters?this._characters.length:this._text.length}removePart(p,f,g){if(this._text=this._text.slice(0,p)+(g||"")+this._text.slice(f),this._characters){const d=g?Array.from(g):[];this._characters.splice(p,f-p,...d)}}charAt(p){return this._characters?this._characters[p]:this._text.charAt(p)}substr(p,f){if(this._characters){isNaN(p)?p=0:p>=0?p=Math.min(p,this._characters.length):p=this._characters.length+Math.max(p,-this._characters.length),f===void 0?f=this._characters.length-p:(isNaN(f)||f<0)&&(f=0);const g=[];for(;--f>=0;)g[f]=this._characters[p+f];return g.join("")}return this._text.substr(p,f)}substring(p,f){if(this._characters){isNaN(p)?p=0:p>this._characters.length?p=this._characters.length:p<0&&(p=0),f===void 0?f=this._characters.length:isNaN(f)?f=0:f>this._characters.length?f=this._characters.length:f<0&&(f=0);const g=[];let d=0;for(;p<f;)g[d++]=this._characters[p++];return g.join("")}return this._text.substring(p,f)}isWord(p){const f=/\w/g;return this._characters?this._characters[p].search(f)!==-1:this._text.search(f)!==-1}}},"../../../dev/gui/dist/2D/controls/toggleButton.js":(C,v,n)=>{n.r(v),n.d(v,{ToggleButton:()=>f});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/2D/controls/rectangle.js");class f extends p.Rectangle{get group(){return this._group}set group(d){this._group!==d&&(this._group=d)}get isActive(){return this._isActive}set isActive(d){var e,_;this._isActive!==d&&(this._isActive=d,this._isActive?(e=this.toActiveAnimation)==null||e.call(this):(_=this.toInactiveAnimation)==null||_.call(this),this._markAsDirty(),this.onIsActiveChangedObservable.notifyObservers(d),this._isActive&&this._host&&this._group&&this._host.executeOnAllControls(t=>{if(t.typeName==="ToggleButton"){if(t===this)return;const i=t;i.group===this.group&&(i.isActive=!1)}}))}constructor(d,e){super(d);this.name=d,this.onIsActiveChangedObservable=new s.Observable,this.delegatePickingToChildren=!1,this._isActive=!1,this.group=e!=null?e:"",this.thickness=0,this.isPointerBlocker=!0;let _=null;this.toActiveAnimation=()=>{this.thickness=1},this.toInactiveAnimation=()=>{this.thickness=0},this.pointerEnterActiveAnimation=()=>{_=this.alpha,this.alpha-=.1},this.pointerOutActiveAnimation=()=>{_!==null&&(this.alpha=_)},this.pointerDownActiveAnimation=()=>{this.scaleX-=.05,this.scaleY-=.05},this.pointerUpActiveAnimation=()=>{this.scaleX+=.05,this.scaleY+=.05},this.pointerEnterInactiveAnimation=()=>{_=this.alpha,this.alpha-=.1},this.pointerOutInactiveAnimation=()=>{_!==null&&(this.alpha=_)},this.pointerDownInactiveAnimation=()=>{this.scaleX-=.05,this.scaleY-=.05},this.pointerUpInactiveAnimation=()=>{this.scaleX+=.05,this.scaleY+=.05}}_getTypeName(){return"ToggleButton"}_processPicking(d,e,_,t,i,o,a,l){if(!this._isEnabled||!this.isHitTestVisible||!this.isVisible||this.notRenderable||!super.contains(d,e))return!1;if(this.delegatePickingToChildren){let c=!1;for(let h=this._children.length-1;h>=0;h--){const u=this._children[h];if(u.isEnabled&&u.isHitTestVisible&&u.isVisible&&!u.notRenderable&&u.contains(d,e)){c=!0;break}}if(!c)return!1}return this._processObservables(t,d,e,_,i,o,a,l),!0}_onPointerEnter(d,e){return super._onPointerEnter(d,e)?(this.isReadOnly||(this._isActive?this.pointerEnterActiveAnimation&&this.pointerEnterActiveAnimation():this.pointerEnterInactiveAnimation&&this.pointerEnterInactiveAnimation()),!0):!1}_onPointerOut(d,e,_=!1){this.isReadOnly||(this._isActive?this.pointerOutActiveAnimation&&this.pointerOutActiveAnimation():this.pointerOutInactiveAnimation&&this.pointerOutInactiveAnimation()),super._onPointerOut(d,e,_)}_onPointerDown(d,e,_,t,i){return super._onPointerDown(d,e,_,t,i)?(this.isReadOnly||(this._isActive?this.pointerDownActiveAnimation&&this.pointerDownActiveAnimation():this.pointerDownInactiveAnimation&&this.pointerDownInactiveAnimation()),!0):!1}_onPointerUp(d,e,_,t,i,o){this.isReadOnly||(this._isActive?this.pointerUpActiveAnimation&&this.pointerUpActiveAnimation():this.pointerUpInactiveAnimation&&this.pointerUpInactiveAnimation()),super._onPointerUp(d,e,_,t,i,o)}}(0,s.RegisterClass)("BABYLON.GUI.ToggleButton",f)},"../../../dev/gui/dist/2D/controls/virtualKeyboard.js":(C,v,n)=>{n.r(v),n.d(v,{KeyPropertySet:()=>d,VirtualKeyboard:()=>e});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/2D/controls/stackPanel.js"),f=n("../../../dev/gui/dist/2D/controls/button.js"),g=n("../../../dev/gui/dist/2D/controls/inputTextArea.js");class d{}class e extends p.StackPanel{constructor(){super(...arguments);this.onKeyPressObservable=new s.Observable,this.defaultButtonWidth="40px",this.defaultButtonHeight="40px",this.defaultButtonPaddingLeft="2px",this.defaultButtonPaddingRight="2px",this.defaultButtonPaddingTop="2px",this.defaultButtonPaddingBottom="2px",this.defaultButtonColor="#DDD",this.defaultButtonBackground="#070707",this.shiftButtonColor="#7799FF",this.selectedShiftThickness=1,this.shiftState=0,this._currentlyConnectedInputText=null,this._connectedInputTexts=[],this._onKeyPressObserver=null}_getTypeName(){return"VirtualKeyboard"}_createKey(t,i){const o=f.Button.CreateSimpleButton(t,t);return o.width=i&&i.width?i.width:this.defaultButtonWidth,o.height=i&&i.height?i.height:this.defaultButtonHeight,o.color=i&&i.color?i.color:this.defaultButtonColor,o.background=i&&i.background?i.background:this.defaultButtonBackground,o.paddingLeft=i&&i.paddingLeft?i.paddingLeft:this.defaultButtonPaddingLeft,o.paddingRight=i&&i.paddingRight?i.paddingRight:this.defaultButtonPaddingRight,o.paddingTop=i&&i.paddingTop?i.paddingTop:this.defaultButtonPaddingTop,o.paddingBottom=i&&i.paddingBottom?i.paddingBottom:this.defaultButtonPaddingBottom,o.thickness=0,o.isFocusInvisible=!0,o.shadowColor=this.shadowColor,o.shadowBlur=this.shadowBlur,o.shadowOffsetX=this.shadowOffsetX,o.shadowOffsetY=this.shadowOffsetY,o.onPointerUpObservable.add(()=>{this.onKeyPressObservable.notifyObservers(t)}),o}addKeysRow(t,i){const o=new p.StackPanel;o.isVertical=!1,o.isFocusInvisible=!0;let a=null;for(let l=0;l<t.length;l++){let c=null;i&&i.length===t.length&&(c=i[l]);const h=this._createKey(t[l],c);(!a||h.heightInPixels>a.heightInPixels)&&(a=h),o.addControl(h)}o.height=a?a.height:this.defaultButtonHeight,this.addControl(o)}applyShiftState(t){if(!!this.children)for(let i=0;i<this.children.length;i++){const o=this.children[i];if(!o||!o.children)continue;const a=o;for(let l=0;l<a.children.length;l++){const c=a.children[l];if(!c||!c.children[0])continue;const h=c.children[0];h.text==="\u21E7"&&(c.color=t?this.shiftButtonColor:this.defaultButtonColor,c.thickness=t>1?this.selectedShiftThickness:0),h.text=t>0?h.text.toUpperCase():h.text.toLowerCase()}}}get connectedInputText(){return this._currentlyConnectedInputText}connect(t){if(this._connectedInputTexts.some(l=>l.input===t))return;this._onKeyPressObserver===null&&(this._onKeyPressObserver=this.onKeyPressObservable.add(l=>{if(!!this._currentlyConnectedInputText){switch(this._currentlyConnectedInputText._host.focusedControl=this._currentlyConnectedInputText,l){case"\u21E7":this.shiftState++,this.shiftState>2&&(this.shiftState=0),this.applyShiftState(this.shiftState);return;case"\u2190":this._currentlyConnectedInputText instanceof g.InputTextArea?this._currentlyConnectedInputText.alternativeProcessKey("Backspace"):this._currentlyConnectedInputText.processKey(8);return;case"\u21B5":this._currentlyConnectedInputText instanceof g.InputTextArea?this._currentlyConnectedInputText.alternativeProcessKey("Enter"):this._currentlyConnectedInputText.processKey(13);return}this._currentlyConnectedInputText instanceof g.InputTextArea?this._currentlyConnectedInputText.alternativeProcessKey("",this.shiftState?l.toUpperCase():l):this._currentlyConnectedInputText.processKey(-1,this.shiftState?l.toUpperCase():l),this.shiftState===1&&(this.shiftState=0,this.applyShiftState(this.shiftState))}})),this.isVisible=!1,this._currentlyConnectedInputText=t,t._connectedVirtualKeyboard=this;const o=t.onFocusObservable.add(()=>{this._currentlyConnectedInputText=t,t._connectedVirtualKeyboard=this,this.isVisible=!0}),a=t.onBlurObservable.add(()=>{t._connectedVirtualKeyboard=null,this._currentlyConnectedInputText=null,this.isVisible=!1});this._connectedInputTexts.push({input:t,onBlurObserver:a,onFocusObserver:o})}disconnect(t){if(t){const i=this._connectedInputTexts.filter(o=>o.input===t);i.length===1&&(this._removeConnectedInputObservables(i[0]),this._connectedInputTexts=this._connectedInputTexts.filter(o=>o.input!==t),this._currentlyConnectedInputText===t&&(this._currentlyConnectedInputText=null))}else this._connectedInputTexts.forEach(i=>{this._removeConnectedInputObservables(i)}),this._connectedInputTexts.length=0;this._connectedInputTexts.length===0&&(this._currentlyConnectedInputText=null,this.onKeyPressObservable.remove(this._onKeyPressObserver),this._onKeyPressObserver=null)}_removeConnectedInputObservables(t){t.input._connectedVirtualKeyboard=null,t.input.onFocusObservable.remove(t.onFocusObserver),t.input.onBlurObservable.remove(t.onBlurObserver)}dispose(){super.dispose(),this.disconnect()}static CreateDefaultLayout(t){const i=new e(t);return i.addKeysRow(["1","2","3","4","5","6","7","8","9","0","\u2190"]),i.addKeysRow(["q","w","e","r","t","y","u","i","o","p"]),i.addKeysRow(["a","s","d","f","g","h","j","k","l",";","'","\u21B5"]),i.addKeysRow(["\u21E7","z","x","c","v","b","n","m",",",".","/"]),i.addKeysRow([" "],[{width:"200px"}]),i}_parseFromContent(t,i){super._parseFromContent(t,i);for(const o of this.children)if(o.getClassName()==="StackPanel"){const a=o;for(const l of a.children)l.getClassName()==="Button"&&l.name&&l.onPointerUpObservable.add(()=>{this.onKeyPressObservable.notifyObservers(l.name)})}}}(0,s.RegisterClass)("BABYLON.GUI.VirtualKeyboard",e)},"../../../dev/gui/dist/2D/index.js":(C,v,n)=>{n.r(v),n.d(v,{AdvancedDynamicTexture:()=>r.AdvancedDynamicTexture,AdvancedDynamicTextureInstrumentation:()=>p.AdvancedDynamicTextureInstrumentation,BaseGradient:()=>s.BaseGradient,BaseSlider:()=>s.BaseSlider,Button:()=>s.Button,Checkbox:()=>s.Checkbox,CheckboxGroup:()=>s.CheckboxGroup,ColorPicker:()=>s.ColorPicker,Container:()=>s.Container,Control:()=>s.Control,DisplayGrid:()=>s.DisplayGrid,Ellipse:()=>s.Ellipse,FocusableButton:()=>s.FocusableButton,Grid:()=>s.Grid,Image:()=>s.Image,ImageBasedSlider:()=>s.ImageBasedSlider,ImageScrollBar:()=>s.ImageScrollBar,InputPassword:()=>s.InputPassword,InputText:()=>s.InputText,InputTextArea:()=>s.InputTextArea,KeyPropertySet:()=>s.KeyPropertySet,Line:()=>s.Line,LinearGradient:()=>s.LinearGradient,MathTools:()=>f.MathTools,Matrix2D:()=>f.Matrix2D,Measure:()=>g.Measure,MultiLine:()=>s.MultiLine,MultiLinePoint:()=>d.MultiLinePoint,RadialGradient:()=>s.RadialGradient,RadioButton:()=>s.RadioButton,RadioGroup:()=>s.RadioGroup,Rectangle:()=>s.Rectangle,ScrollBar:()=>s.ScrollBar,ScrollViewer:()=>s.ScrollViewer,SelectionPanel:()=>s.SelectionPanel,SelectorGroup:()=>s.SelectorGroup,Slider:()=>s.Slider,SliderGroup:()=>s.SliderGroup,StackPanel:()=>s.StackPanel,Style:()=>e.Style,TextBlock:()=>s.TextBlock,TextWrapper:()=>s.TextWrapper,TextWrapping:()=>s.TextWrapping,ToggleButton:()=>s.ToggleButton,ValueAndUnit:()=>_.ValueAndUnit,Vector2WithInfo:()=>f.Vector2WithInfo,VirtualKeyboard:()=>s.VirtualKeyboard,XmlLoader:()=>t.XmlLoader,name:()=>s.name});var s=n("../../../dev/gui/dist/2D/controls/index.js"),r=n("../../../dev/gui/dist/2D/advancedDynamicTexture.js"),p=n("../../../dev/gui/dist/2D/adtInstrumentation.js"),f=n("../../../dev/gui/dist/2D/math2D.js"),g=n("../../../dev/gui/dist/2D/measure.js"),d=n("../../../dev/gui/dist/2D/multiLinePoint.js"),e=n("../../../dev/gui/dist/2D/style.js"),_=n("../../../dev/gui/dist/2D/valueAndUnit.js"),t=n("../../../dev/gui/dist/2D/xmlLoader.js")},"../../../dev/gui/dist/2D/math2D.js":(C,v,n)=>{n.r(v),n.d(v,{MathTools:()=>g,Matrix2D:()=>f,Vector2WithInfo:()=>p});var s=n("core/Misc/observable"),r=n.n(s);class p extends s.Vector2{constructor(e,_=0){super(e.x,e.y);this.buttonIndex=_}}class f{constructor(e,_,t,i,o,a){this.m=new Float32Array(6),this.fromValues(e,_,t,i,o,a)}fromValues(e,_,t,i,o,a){return this.m[0]=e,this.m[1]=_,this.m[2]=t,this.m[3]=i,this.m[4]=o,this.m[5]=a,this}determinant(){return this.m[0]*this.m[3]-this.m[1]*this.m[2]}invertToRef(e){const _=this.m[0],t=this.m[1],i=this.m[2],o=this.m[3],a=this.m[4],l=this.m[5],c=this.determinant();if(c<s.Epsilon*s.Epsilon)return e.m[0]=0,e.m[1]=0,e.m[2]=0,e.m[3]=0,e.m[4]=0,e.m[5]=0,this;const h=1/c,u=i*l-o*a,m=t*a-_*l;return e.m[0]=o*h,e.m[1]=-t*h,e.m[2]=-i*h,e.m[3]=_*h,e.m[4]=u*h,e.m[5]=m*h,this}multiplyToRef(e,_){const t=this.m[0],i=this.m[1],o=this.m[2],a=this.m[3],l=this.m[4],c=this.m[5],h=e.m[0],u=e.m[1],m=e.m[2],b=e.m[3],P=e.m[4],B=e.m[5];return _.m[0]=t*h+i*m,_.m[1]=t*u+i*b,_.m[2]=o*h+a*m,_.m[3]=o*u+a*b,_.m[4]=l*h+c*m+P,_.m[5]=l*u+c*b+B,this}transformCoordinates(e,_,t){return t.x=e*this.m[0]+_*this.m[2]+this.m[4],t.y=e*this.m[1]+_*this.m[3]+this.m[5],this}static Identity(){return new f(1,0,0,1,0,0)}static IdentityToRef(e){e.m[0]=1,e.m[1]=0,e.m[2]=0,e.m[3]=1,e.m[4]=0,e.m[5]=0}static TranslationToRef(e,_,t){t.fromValues(1,0,0,1,e,_)}static ScalingToRef(e,_,t){t.fromValues(e,0,0,_,0,0)}static RotationToRef(e,_){const t=Math.sin(e),i=Math.cos(e);_.fromValues(i,t,-t,i,0,0)}static ComposeToRef(e,_,t,i,o,a,l){f.TranslationToRef(e,_,f._TempPreTranslationMatrix),f.ScalingToRef(i,o,f._TempScalingMatrix),f.RotationToRef(t,f._TempRotationMatrix),f.TranslationToRef(-e,-_,f._TempPostTranslationMatrix),f._TempPreTranslationMatrix.multiplyToRef(f._TempScalingMatrix,f._TempCompose0),f._TempCompose0.multiplyToRef(f._TempRotationMatrix,f._TempCompose1),a?(f._TempCompose1.multiplyToRef(f._TempPostTranslationMatrix,f._TempCompose2),f._TempCompose2.multiplyToRef(a,l)):f._TempCompose1.multiplyToRef(f._TempPostTranslationMatrix,l)}}f._TempPreTranslationMatrix=f.Identity(),f._TempPostTranslationMatrix=f.Identity(),f._TempRotationMatrix=f.Identity(),f._TempScalingMatrix=f.Identity(),f._TempCompose0=f.Identity(),f._TempCompose1=f.Identity(),f._TempCompose2=f.Identity();class g{static Round(e,_=g.DefaultRoundingPrecision){return Math.round(e*_)/_}}g.DefaultRoundingPrecision=100},"../../../dev/gui/dist/2D/measure.js":(C,v,n)=>{n.r(v),n.d(v,{Measure:()=>e});var s=n("core/Misc/observable"),r=n.n(s);const p=[new s.Vector2(0,0),new s.Vector2(0,0),new s.Vector2(0,0),new s.Vector2(0,0)],f=[new s.Vector2(0,0),new s.Vector2(0,0),new s.Vector2(0,0),new s.Vector2(0,0)],g=new s.Vector2(0,0),d=new s.Vector2(0,0);class e{constructor(t,i,o,a){this.left=t,this.top=i,this.width=o,this.height=a}copyFrom(t){this.left=t.left,this.top=t.top,this.width=t.width,this.height=t.height}copyFromFloats(t,i,o,a){this.left=t,this.top=i,this.width=o,this.height=a}static CombineToRef(t,i,o){const a=Math.min(t.left,i.left),l=Math.min(t.top,i.top),c=Math.max(t.left+t.width,i.left+i.width),h=Math.max(t.top+t.height,i.top+i.height);o.left=a,o.top=l,o.width=c-a,o.height=h-l}addAndTransformToRef(t,i,o,a,l,c){const h=this.left+i,u=this.top+o,m=this.width+a,b=this.height+l;p[0].copyFromFloats(h,u),p[1].copyFromFloats(h+m,u),p[2].copyFromFloats(h+m,u+b),p[3].copyFromFloats(h,u+b),g.copyFromFloats(Number.MAX_VALUE,Number.MAX_VALUE),d.copyFromFloats(0,0);for(let P=0;P<4;P++)t.transformCoordinates(p[P].x,p[P].y,f[P]),g.x=Math.floor(Math.min(g.x,f[P].x)),g.y=Math.floor(Math.min(g.y,f[P].y)),d.x=Math.ceil(Math.max(d.x,f[P].x)),d.y=Math.ceil(Math.max(d.y,f[P].y));c.left=g.x,c.top=g.y,c.width=d.x-g.x,c.height=d.y-g.y}transformToRef(t,i){this.addAndTransformToRef(t,0,0,0,0,i)}isEqualsTo(t){return!(this.left!==t.left||this.top!==t.top||this.width!==t.width||this.height!==t.height)}static Empty(){return new e(0,0,0,0)}}},"../../../dev/gui/dist/2D/multiLinePoint.js":(C,v,n)=>{n.r(v),n.d(v,{MultiLinePoint:()=>f});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/2D/valueAndUnit.js");class f{constructor(d){this._multiLine=d,this._x=new p.ValueAndUnit(0),this._y=new p.ValueAndUnit(0),this._point=new s.Vector3(0,0,0)}get x(){return this._x.toString(this._multiLine._host)}set x(d){this._x.toString(this._multiLine._host)!==d&&this._x.fromString(d)&&this._multiLine._markAsDirty()}get y(){return this._y.toString(this._multiLine._host)}set y(d){this._y.toString(this._multiLine._host)!==d&&this._y.fromString(d)&&this._multiLine._markAsDirty()}get control(){return this._control}set control(d){this._control!==d&&(this._control&&this._controlObserver&&(this._control.onDirtyObservable.remove(this._controlObserver),this._controlObserver=null),this._control=d,this._control&&(this._controlObserver=this._control.onDirtyObservable.add(this._multiLine.onPointUpdate)),this._multiLine._markAsDirty())}get mesh(){return this._mesh}set mesh(d){this._mesh!==d&&(this._mesh&&this._meshObserver&&this._mesh.getScene().onAfterCameraRenderObservable.remove(this._meshObserver),this._mesh=d,this._mesh&&(this._meshObserver=this._mesh.getScene().onAfterCameraRenderObservable.add(this._multiLine.onPointUpdate)),this._multiLine._markAsDirty())}resetLinks(){this.control=null,this.mesh=null}translate(){return this._point=this._translatePoint(),this._point}_translatePoint(){if(this._mesh!=null)return this._multiLine._host.getProjectedPositionWithZ(this._mesh.getBoundingInfo().boundingSphere.center,this._mesh.getWorldMatrix());if(this._control!=null)return new s.Vector3(this._control.centerX,this._control.centerY,1-s.Epsilon);{const d=this._multiLine._host,e=this._x.getValueInPixel(d,Number(d._canvas.width)),_=this._y.getValueInPixel(d,Number(d._canvas.height));return new s.Vector3(e,_,1-s.Epsilon)}}dispose(){this.resetLinks()}}},"../../../dev/gui/dist/2D/style.js":(C,v,n)=>{n.r(v),n.d(v,{Style:()=>f});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/2D/valueAndUnit.js");class f{constructor(d){this._fontFamily="Arial",this._fontStyle="",this._fontWeight="",this._fontSize=new p.ValueAndUnit(18,p.ValueAndUnit.UNITMODE_PIXEL,!1),this.onChangedObservable=new s.Observable,this._host=d}get fontSize(){return this._fontSize.toString(this._host)}set fontSize(d){this._fontSize.toString(this._host)!==d&&this._fontSize.fromString(d)&&this.onChangedObservable.notifyObservers(this)}get fontFamily(){return this._fontFamily}set fontFamily(d){this._fontFamily!==d&&(this._fontFamily=d,this.onChangedObservable.notifyObservers(this))}get fontStyle(){return this._fontStyle}set fontStyle(d){this._fontStyle!==d&&(this._fontStyle=d,this.onChangedObservable.notifyObservers(this))}get fontWeight(){return this._fontWeight}set fontWeight(d){this._fontWeight!==d&&(this._fontWeight=d,this.onChangedObservable.notifyObservers(this))}dispose(){this.onChangedObservable.clear()}}},"../../../dev/gui/dist/2D/valueAndUnit.js":(C,v,n)=>{n.r(v),n.d(v,{ValueAndUnit:()=>p});var s=n("core/Misc/observable"),r=n.n(s);class p{constructor(g,d=p.UNITMODE_PIXEL,e=!0){this.negativeValueAllowed=e,this._value=1,this._unit=p.UNITMODE_PIXEL,this.ignoreAdaptiveScaling=!1,this.onChangedObservable=new s.Observable,this._value=g,this._unit=d,this._originalUnit=d}get isPercentage(){return this._unit===p.UNITMODE_PERCENTAGE}get isPixel(){return this._unit===p.UNITMODE_PIXEL}get internalValue(){return this._value}get value(){return this._value}set value(g){g!==this._value&&(this._value=g,this.onChangedObservable.notifyObservers())}get unit(){return this._unit}set unit(g){g!==this._unit&&(this._unit=g,this.onChangedObservable.notifyObservers())}getValueInPixel(g,d){return this.isPixel?this.getValue(g):this.getValue(g)*d}updateInPlace(g,d=p.UNITMODE_PIXEL){return(this.value!==g||this.unit!==d)&&(this._value=g,this._unit=d,this.onChangedObservable.notifyObservers()),this}getValue(g){if(g&&!this.ignoreAdaptiveScaling&&this.unit!==p.UNITMODE_PERCENTAGE){let d=0,e=0;if(g.idealWidth&&(d=Math.ceil(this._value*g.getSize().width/g.idealWidth)),g.idealHeight&&(e=Math.ceil(this._value*g.getSize().height/g.idealHeight)),g.useSmallestIdeal&&g.idealWidth&&g.idealHeight)return window.innerWidth<window.innerHeight?d:e;if(g.idealWidth)return d;if(g.idealHeight)return e}return this._value}toString(g,d){switch(this._unit){case p.UNITMODE_PERCENTAGE:{const e=this.getValue(g)*100;return(d?e.toFixed(d):e)+"%"}case p.UNITMODE_PIXEL:{const e=this.getValue(g);return(d?e.toFixed(d):e)+"px"}}return this._unit.toString()}fromString(g){const d=p._Regex.exec(g.toString());if(!d||d.length===0)return!1;let e=parseFloat(d[1]),_=this._originalUnit;if(this.negativeValueAllowed||e<0&&(e=0),d.length===4)switch(d[3]){case"px":_=p.UNITMODE_PIXEL;break;case"%":_=p.UNITMODE_PERCENTAGE,e/=100;break}return e===this._value&&_===this._unit?!1:(this._value=e,this._unit=_,this.onChangedObservable.notifyObservers(),!0)}static get UNITMODE_PERCENTAGE(){return p._UNITMODE_PERCENTAGE}static get UNITMODE_PIXEL(){return p._UNITMODE_PIXEL}}p._Regex=/(^-?\d*(\.\d+)?)(%|px)?/,p._UNITMODE_PERCENTAGE=0,p._UNITMODE_PIXEL=1},"../../../dev/gui/dist/2D/xmlLoader.js":(C,v,n)=>{n.r(v),n.d(v,{XmlLoader:()=>f});var s=n("core/Misc/observable"),r=n.n(s);const p="XmlLoader Exception : XML file is malformed or corrupted.";class f{constructor(d=null){this._nodes={},this._nodeTypes={element:1,attribute:2,text:3},this._isLoaded=!1,this._objectAttributes={textHorizontalAlignment:1,textVerticalAlignment:2,horizontalAlignment:3,verticalAlignment:4,stretch:5},d&&(this._parentClass=d)}_getChainElement(d){let e=window;this._parentClass&&(e=this._parentClass);let _=d;_=_.split(".");for(let t=0;t<_.length;t++)e=e[_[t]];return e}_getClassAttribute(d){const e=d.split(".");return(0,s.GetClass)("BABYLON.GUI."+e[0])[e[1]]}_createGuiElement(d,e,_=!0){try{const t=(0,s.GetClass)("BABYLON.GUI."+d.nodeName),i=new t;e&&_&&e.addControl(i);for(let a=0;a<d.attributes.length;a++)if(!d.attributes[a].name.toLowerCase().includes("datasource"))if(d.attributes[a].name.toLowerCase().includes("observable")){const l=this._getChainElement(d.attributes[a].value);i[d.attributes[a].name].add(l);continue}else if(d.attributes[a].name=="linkWithMesh")this._parentClass?i.linkWithMesh(this._parentClass[d.attributes[a].value]):i.linkWithMesh(window[d.attributes[a].value]);else if(d.attributes[a].value.startsWith("{{")&&d.attributes[a].value.endsWith("}}")){const l=this._getChainElement(d.attributes[a].value.substring(2,d.attributes[a].value.length-2));i[d.attributes[a].name]=l}else this._objectAttributes[d.attributes[a].name]?i[d.attributes[a].name]=this._getClassAttribute(d.attributes[a].value):d.attributes[a].value=="true"||d.attributes[a].value=="false"?i[d.attributes[a].name]=d.attributes[a].value=="true":i[d.attributes[a].name]=isNaN(Number(d.attributes[a].value))?d.attributes[a].value:Number(d.attributes[a].value);if(!d.attributes.getNamedItem("id"))return this._nodes[d.nodeName+Object.keys(this._nodes).length+"_gen"]=i,i;let o=d.attributes.getNamedItem("id").value;if(o.startsWith("{{")&&o.endsWith("}}")&&(o=this._getChainElement(o.substring(2,o.length-2))),!this._nodes[o])this._nodes[o]=i;else throw"XmlLoader Exception : Duplicate ID, every element should have an unique ID attribute";return i}catch(t){throw"XmlLoader Exception : Error parsing Control "+d.nodeName+","+t+"."}}_parseGrid(d,e,_){let t,i,o;const a=d.children;let l,c=!1,h,u=-1,m=-1,b=0;for(let P=0;P<a.length;P++)if(a[P].nodeType==this._nodeTypes.element){if(a[P].nodeName!="Row")throw"XmlLoader Exception : Expecting Row node, received "+a[P].nodeName;if(u+=1,o=a[P].children,!a[P].attributes.getNamedItem("height"))throw"XmlLoader Exception : Height must be defined for grid rows";i=Number(a[P].attributes.getNamedItem("height").nodeValue),c=a[P].attributes.getNamedItem("isPixel")?JSON.parse(a[P].attributes.getNamedItem("isPixel").nodeValue):!1,e.addRowDefinition(i,c);for(let B=0;B<o.length;B++)if(o[B].nodeType==this._nodeTypes.element){if(o[B].nodeName!="Column")throw"XmlLoader Exception : Expecting Column node, received "+o[B].nodeName;if(m+=1,u>0&&m>b)throw"XmlLoader Exception : In the Grid element, the number of columns is defined in the first row, do not add more columns in the subsequent rows.";if(u==0){if(!o[B].attributes.getNamedItem("width"))throw"XmlLoader Exception : Width must be defined for all the grid columns in the first row";t=Number(o[B].attributes.getNamedItem("width").nodeValue),c=o[B].attributes.getNamedItem("isPixel")?JSON.parse(o[B].attributes.getNamedItem("isPixel").nodeValue):!1,e.addColumnDefinition(t,c)}l=o[B].children;for(let I=0;I<l.length;I++)l[I].nodeType==this._nodeTypes.element&&(h=this._createGuiElement(l[I],e,!1),e.addControl(h,u,m),l[I].firstChild&&this._parseXml(l[I].firstChild,h))}u==0&&(b=m),m=-1}d.nextSibling&&this._parseXml(d.nextSibling,_)}_parseElement(d,e,_){d.firstChild&&this._parseXml(d.firstChild,e),d.nextSibling&&this._parseXml(d.nextSibling,_)}_prepareSourceElement(d,e,_,t,i){this._parentClass?this._parentClass[_]=t[i]:window[_]=t[i],d.firstChild&&this._parseXml(d.firstChild,e,!0)}_parseElementsFromSource(d,e,_){const t=d.attributes.getNamedItem("dataSource").value;if(t.includes(" in ")){let i=!0;const o=t.split(" in ");if(o.length<2)throw"XmlLoader Exception : Malformed XML, Data Source must have an iterator and a source";let a=o[1];if(a.startsWith("{")&&a.endsWith("}")&&(i=!1),(!i||a.startsWith("[")&&a.endsWith("]"))&&(a=a.substring(1,a.length-1)),this._parentClass?a=this._parentClass[a]:a=window[a],i)for(let l=0;l<a.length;l++)this._prepareSourceElement(d,e,o[0],a,l);else for(const l in a)this._prepareSourceElement(d,e,o[0],a,l);d.nextSibling&&this._parseXml(d.nextSibling,_)}else throw"XmlLoader Exception : Malformed XML, Data Source must include an in"}_parseXml(d,e,_=!1){if(d.nodeType!=this._nodeTypes.element){d.nextSibling&&this._parseXml(d.nextSibling,e,_);return}_&&d.setAttribute("id",e.id+(e._children.length+1));const t=this._createGuiElement(d,e);this._rootNode||(this._rootNode=t),d.nodeName=="Grid"?this._parseGrid(d,t,e):d.attributes.getNamedItem("dataSource")?this._parseElementsFromSource(d,t,e):this._parseElement(d,t,e)}isLoaded(){return this._isLoaded}getNodeById(d){return this._nodes[d]}getNodes(){return this._nodes}dispose(){this._rootNode&&(this._rootNode.dispose(),this._rootNode=null,this._nodes={})}loadLayout(d,e,_=null,t=null){const i=new XMLHttpRequest;i.onload=()=>{if(i.readyState===4&&i.status===200){if(!i.responseXML)if(t){t(p);return}else throw p;const o=i.responseXML.documentElement;this._parseXml(o.firstChild,e),this._isLoaded=!0,_&&_()}},i.onerror=function(){t&&t("an error occurred during loading the layout")},i.open("GET",d,!0),i.send()}loadLayoutAsync(d,e){return Xt(this,null,function*(){return new Promise((_,t)=>{this.loadLayout(d,e,_,t)})})}}},"../../../dev/gui/dist/3D/behaviors/defaultBehavior.js":(C,v,n)=>{n.r(v),n.d(v,{DefaultBehavior:()=>p});var s=n("core/Misc/observable"),r=n.n(s);class p{constructor(){this.followBehaviorEnabled=!1,this.sixDofDragBehaviorEnabled=!0,this.surfaceMagnetismBehaviorEnabled=!0,this._followBehavior=new s.FollowBehavior,this._sixDofDragBehavior=new s.SixDofDragBehavior,this._surfaceMagnetismBehavior=new s.SurfaceMagnetismBehavior}get name(){return"Default"}get followBehavior(){return this._followBehavior}get sixDofDragBehavior(){return this._sixDofDragBehavior}get surfaceMagnetismBehavior(){return this._surfaceMagnetismBehavior}init(){}attach(g,d,e){this._scene=g.getScene(),this.attachedNode=g,this._addObservables(),this._followBehavior.attach(g),this._sixDofDragBehavior.attach(g),this._sixDofDragBehavior.draggableMeshes=d||null,this._sixDofDragBehavior.faceCameraOnDragStart=!0,this._surfaceMagnetismBehavior.attach(g,this._scene),e&&(this._surfaceMagnetismBehavior.meshes=e),this._surfaceMagnetismBehavior.enabled=!1}detach(){this.attachedNode=null,this._removeObservables(),this._followBehavior.detach(),this._sixDofDragBehavior.detach(),this._surfaceMagnetismBehavior.detach()}_addObservables(){this._onBeforeRenderObserver=this._scene.onBeforeRenderObservable.add(()=>{this._followBehavior._enabled=!this._sixDofDragBehavior.isMoving&&this.followBehaviorEnabled}),this._onDragObserver=this._sixDofDragBehavior.onDragObservable.add(g=>{this._sixDofDragBehavior.disableMovement=this._surfaceMagnetismBehavior.findAndUpdateTarget(g.pickInfo)})}_removeObservables(){this._scene.onBeforeRenderObservable.remove(this._onBeforeRenderObserver),this._sixDofDragBehavior.onDragObservable.remove(this._onDragObserver)}}},"../../../dev/gui/dist/3D/controls/MRTK3/touchHolographicButton.js":(C,v,n)=>{n.r(v),n.d(v,{TouchHolographicButton:()=>h});var s=n("../../../dev/gui/dist/2D/advancedDynamicTexture.js"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/2D/controls/control.js"),g=n("../../../dev/gui/dist/2D/controls/grid.js"),d=n("../../../dev/gui/dist/2D/controls/image.js"),e=n("../../../dev/gui/dist/3D/materials/mrdl/mrdlBackglowMaterial.js"),_=n("../../../dev/gui/dist/3D/materials/mrdl/mrdlBackplateMaterial.js"),t=n("../../../dev/gui/dist/3D/materials/mrdl/mrdlFrontplateMaterial.js"),i=n("../../../dev/gui/dist/3D/materials/mrdl/mrdlInnerquadMaterial.js"),o=n("../../../dev/gui/dist/2D/controls/rectangle.js"),a=n("../../../dev/gui/dist/2D/controls/stackPanel.js"),l=n("../../../dev/gui/dist/2D/controls/textBlock.js"),c=n("../../../dev/gui/dist/3D/controls/touchButton3D.js");class h extends c.TouchButton3D{_disposeTooltip(){this._tooltipFade=null,this._tooltipTextBlock&&this._tooltipTextBlock.dispose(),this._tooltipTexture&&this._tooltipTexture.dispose(),this._tooltipMesh&&this._tooltipMesh.dispose(),this.onPointerEnterObservable.remove(this._tooltipHoverObserver),this.onPointerOutObservable.remove(this._tooltipOutObserver)}set renderingGroupId(m){this._backPlate.renderingGroupId=m,this._textPlate.renderingGroupId=m,this._frontPlate.renderingGroupId=m,this._backGlow.renderingGroupId=m,this._innerQuad.renderingGroupId=m,this._tooltipMesh&&(this._tooltipMesh.renderingGroupId=m)}get renderingGroupId(){return this._backPlate.renderingGroupId}get mesh(){return this._backPlate}set tooltipText(m){if(!m){this._disposeTooltip();return}if(!this._tooltipFade){const b=this._backPlate._scene.useRightHandedSystem;this._tooltipMesh=(0,r.CreatePlane)("",{size:1},this._backPlate._scene),this._tooltipMesh.position=r.Vector3.Down().scale(.7).add(r.Vector3.Forward(b).scale(-.15)),this._tooltipMesh.isPickable=!1,this._tooltipMesh.parent=this._frontPlateCollisionMesh,this._tooltipTexture=s.AdvancedDynamicTexture.CreateForMesh(this._tooltipMesh);const P=new o.Rectangle;P.height=.25,P.width=.8,P.cornerRadius=25,P.color="#ffffff",P.thickness=20,P.background="#060668",this._tooltipTexture.addControl(P),this._tooltipTextBlock=new l.TextBlock,this._tooltipTextBlock.color="white",this._tooltipTextBlock.fontSize=100,this._tooltipTexture.addControl(this._tooltipTextBlock),this._tooltipFade=new r.FadeInOutBehavior,this._tooltipFade.delay=500,this._tooltipMesh.addBehavior(this._tooltipFade),this._tooltipHoverObserver=this.onPointerEnterObservable.add(()=>{this._tooltipFade&&this._tooltipFade.fadeIn(!0)}),this._tooltipOutObserver=this.onPointerOutObservable.add(()=>{this._tooltipFade&&this._tooltipFade.fadeIn(!1)})}this._tooltipTextBlock&&(this._tooltipTextBlock.text=m)}get tooltipText(){var m;return((m=this._tooltipTextBlock)==null?void 0:m.text)||null}get text(){return this._text}set text(m){this._text!==m&&(this._text=m,this._rebuildContent())}get subtext(){return this._subtext}set subtext(m){this._subtext!==m&&(this._subtext=m,this._rebuildContent())}get imageUrl(){return this._imageUrl}set imageUrl(m){this._imageUrl!==m&&(this._imageUrl=m,this._rebuildContent())}get backMaterial(){return this._backMaterial}get frontMaterial(){return this._frontMaterial}get backGlowMaterial(){return this._backGlowMaterial}get innerQuadMaterial(){return this._innerQuadMaterial}get plateMaterial(){return this._plateMaterial}get shareMaterials(){return this._shareMaterials}set isBackplateVisible(m){this.mesh&&this._backMaterial&&(m&&!this._isBackplateVisible?this._backPlate.visibility=1:!m&&this._isBackplateVisible&&(this._backPlate.visibility=0)),this._isBackplateVisible=m}constructor(m,b=!0){super(m);this.width=1,this.height=1,this.radius=.14,this.textSizeInPixels=18,this.imageSizeInPixels=40,this.plateMaterialColor=new r.Color3(.4,.4,.4),this.frontPlateDepth=.2,this.backPlateDepth=.04,this.backGlowOffset=.1,this.flatPlaneDepth=.001,this.innerQuadRadius=this.radius-.04,this.innerQuadColor=new r.Color4(0,0,0,0),this.innerQuadToggledColor=new r.Color4(.5197843,.6485234,.9607843,.6),this.innerQuadHoverColor=new r.Color4(1,1,1,.05),this.innerQuadToggledHoverColor=new r.Color4(.5197843,.6485234,.9607843,1),this._isBackplateVisible=!0,this._shareMaterials=!0,this._shareMaterials=b,this.pointerEnterAnimation=()=>{this._frontPlate&&this._textPlate&&!this.isToggleButton&&this._performEnterExitAnimation(1),this.isToggleButton&&this._innerQuadMaterial&&(this.isToggled?this._innerQuadMaterial.color=this.innerQuadToggledHoverColor:this._innerQuadMaterial.color=this.innerQuadHoverColor)},this.pointerOutAnimation=()=>{this._frontPlate&&this._textPlate&&!this.isToggleButton&&this._performEnterExitAnimation(-.8),this.isToggleButton&&this._innerQuadMaterial&&this._onToggle(this.isToggled)},this.pointerDownAnimation=()=>{},this.pointerUpAnimation=()=>{},this._pointerClickObserver=this.onPointerClickObservable.add(()=>{this._frontPlate&&this._backGlow&&!this.isActiveNearInteraction&&this._performClickAnimation(),this.isToggleButton&&this._innerQuadMaterial&&this._onToggle(this.isToggled)}),this._pointerEnterObserver=this.onPointerEnterObservable.add(()=>{this.pointerEnterAnimation()}),this._pointerOutObserver=this.onPointerOutObservable.add(()=>{this.pointerOutAnimation()}),this._toggleObserver=this.onToggleObservable.add(P=>{P?this._innerQuadMaterial.color=this.innerQuadToggledColor:this._innerQuadMaterial.color=this.innerQuadColor})}_getTypeName(){return"TouchHolographicButton"}_rebuildContent(){let m;this._getAspectRatio()<=1?m=this._alignContentVertically():m=this._alignContentHorizontally(),this.content=m}_getAspectRatio(){return this.width/this.height}_alignContentVertically(){const m=new a.StackPanel;if(m.isVertical=!0,r.DomManagement.IsDocumentAvailable()&&!!document.createElement&&this._imageUrl){const b=new d.Image;b.source=this._imageUrl,b.heightInPixels=180,b.widthInPixels=100,b.paddingTopInPixels=40,b.paddingBottomInPixels=40,m.addControl(b)}if(this._text){const b=new l.TextBlock;b.text=this._text,b.color="white",b.heightInPixels=30,b.fontSize=24,m.addControl(b)}return m}_alignContentHorizontally(){let m=240;const b=15,P=new o.Rectangle;P.widthInPixels=m,P.heightInPixels=m,P.color="transparent",P.setPaddingInPixels(b,b,b,b),m-=b*2;const B=new a.StackPanel;if(B.isVertical=!1,B.scaleY=this._getAspectRatio(),r.DomManagement.IsDocumentAvailable()&&!!document.createElement&&this._imageUrl){const I=new o.Rectangle(`${this.name}_image`);I.widthInPixels=this.imageSizeInPixels,I.heightInPixels=this.imageSizeInPixels,I.color="transparent",m-=this.imageSizeInPixels;const x=new d.Image;x.source=this._imageUrl,I.addControl(x),B.addControl(I)}if(this._text){const I=new l.TextBlock(`${this.name}_text`);if(I.text=this._text,I.color="white",I.fontSize=this.textSizeInPixels,I.widthInPixels=m,this._imageUrl&&(I.textHorizontalAlignment=f.Control.HORIZONTAL_ALIGNMENT_LEFT,I.paddingLeftInPixels=b),this._subtext){const x=new g.Grid;x.addColumnDefinition(1),x.addRowDefinition(.5),x.addRowDefinition(.5),x.widthInPixels=m,x.heightInPixels=45;const F=new l.TextBlock(`${this.name}_subtext`);F.text=this._subtext,F.color="#EEEEEEAB",F.fontSize=this.textSizeInPixels*.75,F.fontWeight="600",this._imageUrl&&(F.textHorizontalAlignment=f.Control.HORIZONTAL_ALIGNMENT_LEFT,F.paddingLeftInPixels=b),x.addControl(I,0),x.addControl(F,1),B.addControl(x)}else B.addControl(I)}return P.addControl(B),P}_createNode(m){var F;this.name=(F=this.name)!=null?F:"TouchHolographicButton";const b=this._createBackPlate(m),P=this._createFrontPlate(m),B=this._createInnerQuad(m),I=this._createBackGlow(m);this._frontPlateCollisionMesh=P,this._textPlate=super._createNode(m),this._textPlate.name=`${this.name}_textPlate`,this._textPlate.isPickable=!1,this._textPlate.scaling.x=this.width,this._textPlate.parent=P,this._backPlate=b,this._backPlate.position=r.Vector3.Forward(m.useRightHandedSystem).scale(this.backPlateDepth/2),this._backPlate.isPickable=!1,this._backPlate.addChild(P),this._backPlate.addChild(B),I&&this._backPlate.addChild(I);const x=new r.TransformNode(`${this.name}_root`,m);return this._backPlate.setParent(x),this.collisionMesh=P,this.collidableFrontDirection=this._backPlate.forward.negate(),x}_createBackPlate(m){const b=(0,r.CreateBox)(`${this.name}_backPlate`,{},m);return b.isPickable=!1,b.visibility=0,b.scaling.z=.2,r.SceneLoader.ImportMeshAsync(void 0,h.MRTK_ASSET_BASE_URL,h.BACKPLATE_MODEL_FILENAME,m).then(P=>{const B=P.meshes[1];B.visibility=0,this._isBackplateVisible&&(B.visibility=1,B.name=`${this.name}_backPlate`,B.isPickable=!1,B.scaling.x=this.width,B.scaling.y=this.height,B.parent=b),this._backMaterial&&(B.material=this._backMaterial),this._backPlate=B}),b}_createFrontPlate(m){const b=(0,r.CreateBox)(`${this.name}_frontPlate`,{width:this.width,height:this.height,depth:this.frontPlateDepth},m);return b.isPickable=!0,b.isNearPickable=!0,b.visibility=0,b.position=r.Vector3.Forward(m.useRightHandedSystem).scale((this.backPlateDepth-this.frontPlateDepth)/2),r.SceneLoader.ImportMeshAsync(void 0,h.MRTK_ASSET_BASE_URL,h.FRONTPLATE_MODEL_FILENAME,m).then(P=>{const B=(0,r.CreateBox)(`${this.name}_collisionPlate`,{width:this.width,height:this.height},m);B.isPickable=!1,B.scaling.z=this.frontPlateDepth,B.visibility=0,B.parent=b,this._collisionPlate=B;const I=P.meshes[1];I.name=`${this.name}_frontPlate`,I.isPickable=!1,I.scaling.x=this.width-this.backGlowOffset,I.scaling.y=this.height-this.backGlowOffset,I.position=r.Vector3.Forward(m.useRightHandedSystem).scale(-.5),I.parent=B,this.isToggleButton&&(I.visibility=0),this._frontMaterial&&(I.material=this._frontMaterial),this._textPlate.scaling.x=1,this._textPlate.parent=I,this._frontPlate=I}),b}_createInnerQuad(m){const b=(0,r.CreateBox)(`${this.name}_innerQuad`,{},m);return b.isPickable=!1,b.visibility=0,b.scaling.z=this.flatPlaneDepth,b.position.z+=this.backPlateDepth/2-this.flatPlaneDepth,r.SceneLoader.ImportMeshAsync(void 0,h.MRTK_ASSET_BASE_URL,h.INNERQUAD_MODEL_FILENAME,m).then(P=>{const B=P.meshes[1];B.name=`${this.name}_innerQuad`,B.isPickable=!1,B.scaling.x=this.width-this.backGlowOffset,B.scaling.y=this.height-this.backGlowOffset,B.parent=b,this._innerQuadMaterial&&(B.material=this._innerQuadMaterial),this._innerQuad=B}),b}_createBackGlow(m){if(this.isToggleButton)return;const b=(0,r.CreateBox)(`${this.name}_backGlow`,{},m);return b.isPickable=!1,b.visibility=0,b.scaling.z=this.flatPlaneDepth,b.position.z+=this.backPlateDepth/2-this.flatPlaneDepth*2,r.SceneLoader.ImportMeshAsync(void 0,h.MRTK_ASSET_BASE_URL,h.BACKGLOW_MODEL_FILENAME,m).then(P=>{const B=P.meshes[1];B.name=`${this.name}_backGlow`,B.isPickable=!1,B.scaling.x=this.width-this.backGlowOffset,B.scaling.y=this.height-this.backGlowOffset,B.parent=b,this._backGlowMaterial&&(B.material=this._backGlowMaterial),this._backGlow=B}),b}_applyFacade(m){this._plateMaterial.emissiveTexture=m,this._plateMaterial.opacityTexture=m,this._plateMaterial.diffuseColor=this.plateMaterialColor}_performClickAnimation(){const m=60,b=new r.AnimationGroup("Click Animation Group"),P=[{name:"backGlowMotion",mesh:this._backGlow,property:"material.motion",keys:[{frame:0,values:[0,0,0]},{frame:20,values:[1,.0144,.0144]},{frame:40,values:[.0027713229489760476,0,0]},{frame:45,values:[.0027713229489760476]}]},{name:"_collisionPlateZSlide",mesh:this._collisionPlate,property:"position.z",keys:[{frame:0,values:[0,0,0]},{frame:20,values:[r.Vector3.Forward(this._collisionPlate._scene.useRightHandedSystem).scale(this.frontPlateDepth/2).z,0,0]},{frame:40,values:[0,.005403332496794331]},{frame:45,values:[0]}]},{name:"_collisionPlateZScale",mesh:this._collisionPlate,property:"scaling.z",keys:[{frame:0,values:[this.frontPlateDepth,0,0]},{frame:20,values:[this.backPlateDepth,0,0]},{frame:40,values:[this.frontPlateDepth,.0054]},{frame:45,values:[this.frontPlateDepth]}]}];for(const B of P){const I=new r.Animation(B.name,B.property,m,r.Animation.ANIMATIONTYPE_FLOAT,r.Animation.ANIMATIONLOOPMODE_CYCLE),x=[];for(const F of B.keys)x.push({frame:F.frame,value:F.values[0],inTangent:F.values[1],outTangent:F.values[2],interpolation:F.values[3]});I.setKeys(x),!!B.mesh&&b.addTargetedAnimation(I,B.mesh)}b.normalize(0,45),b.speedRatio=1,b.play()}_performEnterExitAnimation(m){const b=60,P=new r.AnimationGroup("Enter Exit Animation Group"),B=[{name:"frontPlateFadeOut",mesh:this._frontPlate,property:"material.fadeOut",keys:[{frame:0,values:[0,0,.025045314830017686,0]},{frame:40,values:[1.00205599570012,.025045314830017686,0,0]}]},{name:"textPlateZSlide",mesh:this._textPlate,property:"position.z",keys:[{frame:0,values:[0,0,0]},{frame:40,values:[r.Vector3.Forward(this._textPlate._scene.useRightHandedSystem).scale(-.15).z,0,0]}]}];for(const I of B){const x=new r.Animation(I.name,I.property,b,r.Animation.ANIMATIONTYPE_FLOAT,r.Animation.ANIMATIONLOOPMODE_CYCLE),F=[];for(const Q of I.keys)F.push({frame:Q.frame,value:Q.values[0],inTangent:Q.values[1],outTangent:Q.values[2],interpolation:Q.values[3]});x.setKeys(F),!!I.mesh&&P.addTargetedAnimation(x,I.mesh)}P.normalize(0,45),P.speedRatio=m,P.play()}_createBackMaterial(m){var b;this._backMaterial=(b=this._backMaterial)!=null?b:new _.MRDLBackplateMaterial(this.name+"backPlateMaterial",m.getScene()),this._backMaterial.absoluteSizes=!0,this._backMaterial.radius=this.radius,this._backMaterial.lineWidth=.02}_createFrontMaterial(m){var b;this._frontMaterial=(b=this._frontMaterial)!=null?b:new t.MRDLFrontplateMaterial(this.name+"Front Material",m.getScene()),this.frontMaterial.radius=this.innerQuadRadius,this.frontMaterial.fadeOut=0}_createBackGlowMaterial(m){var P;const b=this.radius+.04;this._backGlowMaterial=(P=this._backGlowMaterial)!=null?P:new e.MRDLBackglowMaterial(this.name+"Back Glow Material",m.getScene()),this._backGlowMaterial.bevelRadius=b,this._backGlowMaterial.lineWidth=b,this._backGlowMaterial.motion=0}_createInnerQuadMaterial(m){var b;this._innerQuadMaterial=(b=this._innerQuadMaterial)!=null?b:new i.MRDLInnerquadMaterial("inner_quad",m.getScene()),this._innerQuadMaterial.radius=this.innerQuadRadius,this.isToggleButton&&(this._innerQuadMaterial.color=this.innerQuadColor)}_createPlateMaterial(m){var b;this._plateMaterial=(b=this._plateMaterial)!=null?b:new r.StandardMaterial(this.name+"Plate Material",m.getScene()),this._plateMaterial.specularColor=r.Color3.Black()}_onToggle(m){super._onToggle(m)}_affectMaterial(m){this._shareMaterials?(this._host._touchSharedMaterials.mrdlBackplateMaterial?this._backMaterial=this._host._touchSharedMaterials.mrdlBackplateMaterial:(this._createBackMaterial(m),this._host._touchSharedMaterials.mrdlBackplateMaterial=this._backMaterial),this._host._touchSharedMaterials.mrdlFrontplateMaterial?this._frontMaterial=this._host._touchSharedMaterials.mrdlFrontplateMaterial:(this._createFrontMaterial(m),this._host._touchSharedMaterials.mrdlFrontplateMaterial=this._frontMaterial),this._host._touchSharedMaterials.mrdlBackglowMaterial?this._backGlowMaterial=this._host._touchSharedMaterials.mrdlBackglowMaterial:(this._createBackGlowMaterial(m),this._host._touchSharedMaterials.mrdlBackglowMaterial=this._backGlowMaterial),this._host._touchSharedMaterials.mrdlInnerQuadMaterial?this._innerQuadMaterial=this._host._touchSharedMaterials.mrdlInnerQuadMaterial:(this._createInnerQuadMaterial(m),this._host._touchSharedMaterials.mrdlInnerQuadMaterial=this._innerQuadMaterial)):(this._createBackMaterial(m),this._createFrontMaterial(m),this._createBackGlowMaterial(m),this._createInnerQuadMaterial(m)),this._createPlateMaterial(m),this._backPlate.material=this._backMaterial,this._textPlate.material=this._plateMaterial,this._isBackplateVisible||(this._backPlate.visibility=0),this._frontPlate&&(this._frontPlate.material=this._frontMaterial),this._backGlow&&(this._backGlow.material=this._backGlowMaterial),this._innerQuad&&(this._innerQuad.material=this._innerQuadMaterial),this._rebuildContent()}dispose(){super.dispose(),this._disposeTooltip(),this.onPointerClickObservable.remove(this._pointerClickObserver),this.onPointerEnterObservable.remove(this._pointerEnterObserver),this.onPointerOutObservable.remove(this._pointerOutObserver),this.onToggleObservable.remove(this._toggleObserver),this.shareMaterials||(this._backMaterial.dispose(),this._frontMaterial.dispose(),this._plateMaterial.dispose(),this._backGlowMaterial.dispose(),this._innerQuadMaterial.dispose(),this._pickedPointObserver&&(this._host.onPickedPointChangedObservable.remove(this._pickedPointObserver),this._pickedPointObserver=null))}}h.MRTK_ASSET_BASE_URL="https://assets.babylonjs.com/meshes/MRTK/",h.FRONTPLATE_MODEL_FILENAME="mrtk-fluent-frontplate.glb",h.BACKPLATE_MODEL_FILENAME="mrtk-fluent-backplate.glb",h.BACKGLOW_MODEL_FILENAME="mrtk-fluent-button.glb",h.INNERQUAD_MODEL_FILENAME="SlateProximity.glb"},"../../../dev/gui/dist/3D/controls/abstractButton3D.js":(C,v,n)=>{n.r(v),n.d(v,{AbstractButton3D:()=>f});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/3D/controls/contentDisplay3D.js");class f extends p.ContentDisplay3D{constructor(d){super(d)}_getTypeName(){return"AbstractButton3D"}_createNode(d){return new s.TransformNode("button"+this.name,d)}}},"../../../dev/gui/dist/3D/controls/button3D.js":(C,v,n)=>{n.r(v),n.d(v,{Button3D:()=>f});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/3D/controls/abstractButton3D.js");class f extends p.AbstractButton3D{constructor(d,e){super(d);this._options=re({width:1,height:1,depth:.08},e),this.pointerEnterAnimation=()=>{!this.mesh||(this._currentMaterial.emissiveColor=s.Color3.Red())},this.pointerOutAnimation=()=>{this._currentMaterial.emissiveColor=s.Color3.Black()},this.pointerDownAnimation=()=>{!this.mesh||this.mesh.scaling.scaleInPlace(.95)},this.pointerUpAnimation=()=>{!this.mesh||this.mesh.scaling.scaleInPlace(1/.95)}}_applyFacade(d){this._currentMaterial.emissiveTexture=d}_getTypeName(){return"Button3D"}_createNode(d){const e=new Array(6);for(let t=0;t<6;t++)e[t]=new s.Vector4(0,0,0,0);d.useRightHandedSystem?e[0].copyFromFloats(1,0,0,1):e[1].copyFromFloats(0,0,1,1);const _=(0,s.CreateBox)(this.name+"_rootMesh",{width:this._options.width,height:this._options.height,depth:this._options.depth,faceUV:e,wrap:!0},d);return this._contentScaleRatioY=this._contentScaleRatio*this._options.width/this._options.height,this._setFacadeTextureScaling(),_}_affectMaterial(d){const e=new s.StandardMaterial(this.name+"Material",d.getScene());e.specularColor=s.Color3.Black(),d.material=e,this._currentMaterial=e,this._resetContent()}dispose(){super.dispose(),this._disposeFacadeTexture(),this._currentMaterial&&this._currentMaterial.dispose()}}},"../../../dev/gui/dist/3D/controls/container3D.js":(C,v,n)=>{n.r(v),n.d(v,{Container3D:()=>f});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/3D/controls/control3D.js");class f extends p.Control3D{get children(){return this._children}get blockLayout(){return this._blockLayout}set blockLayout(d){this._blockLayout!==d&&(this._blockLayout=d,this._blockLayout||this._arrangeChildren())}constructor(d){super(d);this._blockLayout=!1,this._children=new Array}updateLayout(){return this._arrangeChildren(),this}containsControl(d){return this._children.indexOf(d)!==-1}addControl(d){return this._children.indexOf(d)!==-1?this:(d.parent=this,d._host=this._host,this._children.push(d),this._host.utilityLayer&&(d._prepareNode(this._host.utilityLayer.utilityLayerScene),d.node&&(d.node.parent=this.node),this.blockLayout||this._arrangeChildren()),this)}_arrangeChildren(){}_createNode(d){return new s.TransformNode("ContainerNode",d)}removeControl(d){const e=this._children.indexOf(d);return e!==-1&&(this._children.splice(e,1),d.parent=null,d._disposeNode()),this}_getTypeName(){return"Container3D"}dispose(){for(const d of this._children)d.dispose();this._children.length=0,super.dispose()}}f.UNSET_ORIENTATION=0,f.FACEORIGIN_ORIENTATION=1,f.FACEORIGINREVERSED_ORIENTATION=2,f.FACEFORWARD_ORIENTATION=3,f.FACEFORWARDREVERSED_ORIENTATION=4},"../../../dev/gui/dist/3D/controls/contentDisplay3D.js":(C,v,n)=>{n.r(v),n.d(v,{ContentDisplay3D:()=>g});var s=n("../../../dev/gui/dist/2D/advancedDynamicTexture.js"),r=n("../../../dev/gui/dist/3D/controls/control3D.js"),p=n("core/Misc/observable"),f=n.n(p);class g extends r.Control3D{constructor(){super(...arguments);this._contentResolution=512,this._contentScaleRatio=2}get content(){return this._content}set content(e){this._content=e,!(!e||!this._host||!this._host.utilityLayer)&&(this._facadeTexture?this._facadeTexture.rootContainer.clearControls():(this._facadeTexture=new s.AdvancedDynamicTexture("Facade",this._contentResolution,this._contentResolution,this._host.utilityLayer.utilityLayerScene,!0,p.Texture.TRILINEAR_SAMPLINGMODE),this._setFacadeTextureScaling(),this._facadeTexture.premulAlpha=!0),this._facadeTexture.addControl(e),this._applyFacade(this._facadeTexture))}_setFacadeTextureScaling(){var e;this._facadeTexture&&(this._facadeTexture.rootContainer.scaleX=this._contentScaleRatio,this._facadeTexture.rootContainer.scaleY=(e=this._contentScaleRatioY)!=null?e:this._contentScaleRatio)}get contentResolution(){return this._contentResolution}set contentResolution(e){this._contentResolution!==e&&(this._contentResolution=e,this._resetContent())}_disposeFacadeTexture(){this._facadeTexture&&(this._facadeTexture.dispose(),this._facadeTexture=null)}_resetContent(){this._disposeFacadeTexture(),this.content=this._content}_applyFacade(e){}}},"../../../dev/gui/dist/3D/controls/control3D.js":(C,v,n)=>{n.r(v),n.d(v,{Control3D:()=>f});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/3D/vector3WithInfo.js");class f{get position(){return this._node?this._node.position:s.Vector3.Zero()}set position(d){!this._node||(this._node.position=d)}get scaling(){return this._node?this._node.scaling:new s.Vector3(1,1,1)}set scaling(d){!this._node||(this._isScaledByManager=!1,this._node.scaling=d)}get behaviors(){return this._behaviors}addBehavior(d){if(this._behaviors.indexOf(d)!==-1)return this;d.init();const _=this._host.scene;return _.isLoading?_.onDataLoadedObservable.addOnce(()=>{d.attach(this)}):d.attach(this),this._behaviors.push(d),this}removeBehavior(d){const e=this._behaviors.indexOf(d);return e===-1?this:(this._behaviors[e].detach(),this._behaviors.splice(e,1),this)}getBehaviorByName(d){for(const e of this._behaviors)if(e.name===d)return e;return null}get isVisible(){return this._isVisible}set isVisible(d){if(this._isVisible===d)return;this._isVisible=d;const e=this.mesh;e&&e.setEnabled(d)}constructor(d){this.name=d,this._downCount=0,this._enterCount=-1,this._downPointerIds={},this._isVisible=!0,this._isScaledByManager=!1,this.onPointerMoveObservable=new s.Observable,this.onPointerOutObservable=new s.Observable,this.onPointerDownObservable=new s.Observable,this.onPointerUpObservable=new s.Observable,this.onPointerClickObservable=new s.Observable,this.onPointerEnterObservable=new s.Observable,this._behaviors=new Array}get typeName(){return this._getTypeName()}getClassName(){return this._getTypeName()}_getTypeName(){return"Control3D"}get node(){return this._node}get mesh(){return this._node instanceof s.AbstractMesh?this._node:null}linkToTransformNode(d){return this._node&&(this._node.parent=d),this}_prepareNode(d){if(!this._node){if(this._node=this._createNode(d),!this.node)return;this._injectGUI3DReservedDataStore(this.node).control=this;const e=this.mesh;e&&(e.isPickable=!0,this._affectMaterial(e))}}_injectGUI3DReservedDataStore(d){var e,_;return d.reservedDataStore=(e=d.reservedDataStore)!=null?e:{},d.reservedDataStore.GUI3D=(_=d.reservedDataStore.GUI3D)!=null?_:{},d.reservedDataStore.GUI3D}_createNode(d){return null}_affectMaterial(d){d.material=null}_isTouchButton3D(d){return d._generatePointerEventType!==void 0}_onPointerMove(d,e){this.onPointerMoveObservable.notifyObservers(e,-1,d,this)}_onPointerEnter(d){return this._enterCount===-1&&(this._enterCount=0),this._enterCount++,this._enterCount>1?!1:(this.onPointerEnterObservable.notifyObservers(this,-1,d,this),this.pointerEnterAnimation&&this.pointerEnterAnimation(),!0)}_onPointerOut(d){this._enterCount--,!(this._enterCount>0)&&(this._enterCount=0,this.onPointerOutObservable.notifyObservers(this,-1,d,this),this.pointerOutAnimation&&this.pointerOutAnimation())}_onPointerDown(d,e,_,t){return this._downCount++,this._downPointerIds[_]=this._downPointerIds[_]+1||1,this._downCount!==1?!1:(this.onPointerDownObservable.notifyObservers(new p.Vector3WithInfo(e,t),-1,d,this),this.pointerDownAnimation&&this.pointerDownAnimation(),!0)}_onPointerUp(d,e,_,t,i){if(this._downCount--,this._downPointerIds[_]--,this._downPointerIds[_]<=0&&delete this._downPointerIds[_],this._downCount<0){this._downCount=0;return}this._downCount==0&&(i&&(this._enterCount>0||this._enterCount===-1)&&this.onPointerClickObservable.notifyObservers(new p.Vector3WithInfo(e,t),-1,d,this),this.onPointerUpObservable.notifyObservers(new p.Vector3WithInfo(e,t),-1,d,this),this.pointerUpAnimation&&this.pointerUpAnimation())}forcePointerUp(d=null){if(d!==null)this._onPointerUp(this,s.Vector3.Zero(),d,0,!0);else{for(const e in this._downPointerIds)this._onPointerUp(this,s.Vector3.Zero(),+e,0,!0);this._downCount>0&&(this._downCount=1,this._onPointerUp(this,s.Vector3.Zero(),0,0,!0))}}_processObservables(d,e,_,t,i){if(this._isTouchButton3D(this)&&_&&(d=this._generatePointerEventType(d,_,this._downCount)),d===s.PointerEventTypes.POINTERMOVE){this._onPointerMove(this,e);const o=this._host._lastControlOver[t];return o&&o!==this&&o._onPointerOut(this),o!==this&&this._onPointerEnter(this),this._host._lastControlOver[t]=this,!0}return d===s.PointerEventTypes.POINTERDOWN?(this._onPointerDown(this,e,t,i),this._host._lastControlDown[t]=this,this._host._lastPickedControl=this,!0):d===s.PointerEventTypes.POINTERUP||d===s.PointerEventTypes.POINTERDOUBLETAP?(this._host._lastControlDown[t]&&this._host._lastControlDown[t]._onPointerUp(this,e,t,i,!0),delete this._host._lastControlDown[t],!0):!1}_disposeNode(){this._node&&(this._node.dispose(),this._node=null)}dispose(){this.onPointerDownObservable.clear(),this.onPointerEnterObservable.clear(),this.onPointerMoveObservable.clear(),this.onPointerOutObservable.clear(),this.onPointerUpObservable.clear(),this.onPointerClickObservable.clear(),this._disposeNode();for(const d of this._behaviors)d.detach()}}},"../../../dev/gui/dist/3D/controls/cylinderPanel.js":(C,v,n)=>{n.r(v),n.d(v,{CylinderPanel:()=>g});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/3D/controls/volumeBasedPanel.js"),f=n("../../../dev/gui/dist/3D/controls/container3D.js");class g extends p.VolumeBasedPanel{constructor(){super(...arguments);this._radius=5}get radius(){return this._radius}set radius(e){this._radius!==e&&(this._radius=e,s.Tools.SetImmediate(()=>{this._arrangeChildren()}))}_mapGridNode(e,_){const t=e.mesh;if(!t)return;const i=this._cylindricalMapping(_);switch(e.position=i,this.orientation){case f.Container3D.FACEORIGIN_ORIENTATION:t.lookAt(new s.Vector3(2*i.x,i.y,2*i.z));break;case f.Container3D.FACEORIGINREVERSED_ORIENTATION:t.lookAt(new s.Vector3(-i.x,i.y,-i.z));break;case f.Container3D.FACEFORWARD_ORIENTATION:break;case f.Container3D.FACEFORWARDREVERSED_ORIENTATION:t.rotate(s.Axis.Y,Math.PI,s.Space.LOCAL);break}}_cylindricalMapping(e){const _=new s.Vector3(0,e.y,this._radius),t=e.x/this._radius;return s.Matrix.RotationYawPitchRollToRef(t,0,0,s.TmpVectors.Matrix[0]),s.Vector3.TransformNormal(_,s.TmpVectors.Matrix[0])}}},"../../../dev/gui/dist/3D/controls/handMenu.js":(C,v,n)=>{n.r(v),n.d(v,{HandMenu:()=>f});var s=n("../../../dev/gui/dist/3D/controls/touchHolographicMenu.js"),r=n("core/Misc/observable"),p=n.n(r);class f extends s.TouchHolographicMenu{get handConstraintBehavior(){return this._handConstraintBehavior}_createNode(d){const e=super._createNode(d);return this._handConstraintBehavior.attach(e),e}constructor(d,e){super(e);this._handConstraintBehavior=new r.HandConstraintBehavior,this._handConstraintBehavior.linkToXRExperience(d),this.backPlateMargin=.15,this.rows=3}dispose(){super.dispose(),this._handConstraintBehavior.detach()}}},"../../../dev/gui/dist/3D/controls/holographicBackplate.js":(C,v,n)=>{n.r(v),n.d(v,{HolographicBackplate:()=>g});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/3D/materials/fluentBackplate/fluentBackplateMaterial.js"),f=n("../../../dev/gui/dist/3D/controls/control3D.js");class g extends f.Control3D{set renderingGroupId(e){this._model.renderingGroupId=e}get renderingGroupId(){return this._model.renderingGroupId}get material(){return this._material}get shareMaterials(){return this._shareMaterials}constructor(e,_=!0){super(e);this._shareMaterials=_}_getTypeName(){return"HolographicBackplate"}_createNode(e){var t;const _=(0,s.CreateBox)(((t=this.name)!=null?t:"HolographicBackplate")+"_CollisionMesh",{width:1,height:1,depth:1},e);return _.isPickable=!0,_.visibility=0,s.SceneLoader.ImportMeshAsync(void 0,g.MODEL_BASE_URL,g.MODEL_FILENAME,e).then(i=>{const o=i.meshes[1];o.name=`${this.name}_frontPlate`,o.isPickable=!1,o.parent=_,this._material&&(o.material=this._material),this._model=o}),_}_createMaterial(e){this._material=new p.FluentBackplateMaterial(this.name+" Material",e.getScene())}_affectMaterial(e){this._shareMaterials?this._host._touchSharedMaterials.fluentBackplateMaterial?this._material=this._host._touchSharedMaterials.fluentBackplateMaterial:(this._createMaterial(e),this._host._touchSharedMaterials.fluentBackplateMaterial=this._material):this._createMaterial(e)}dispose(){super.dispose(),this.shareMaterials||this._material.dispose(),this._model.dispose()}}g.MODEL_BASE_URL="https://assets.babylonjs.com/meshes/MRTK/",g.MODEL_FILENAME="mrtk-fluent-backplate.glb"},"../../../dev/gui/dist/3D/controls/holographicButton.js":(C,v,n)=>{n.r(v),n.d(v,{HolographicButton:()=>t});var s=n("../../../dev/gui/dist/3D/controls/button3D.js"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/3D/materials/fluent/fluentMaterial.js"),g=n("../../../dev/gui/dist/2D/controls/stackPanel.js"),d=n("../../../dev/gui/dist/2D/controls/image.js"),e=n("../../../dev/gui/dist/2D/controls/textBlock.js"),_=n("../../../dev/gui/dist/2D/advancedDynamicTexture.js");class t extends s.Button3D{_disposeTooltip(){this._tooltipFade=null,this._tooltipTextBlock&&this._tooltipTextBlock.dispose(),this._tooltipTexture&&this._tooltipTexture.dispose(),this._tooltipMesh&&this._tooltipMesh.dispose(),this.onPointerEnterObservable.remove(this._tooltipHoverObserver),this.onPointerOutObservable.remove(this._tooltipOutObserver)}set renderingGroupId(o){this._backPlate.renderingGroupId=o,this._textPlate.renderingGroupId=o,this._frontPlate.renderingGroupId=o,this._tooltipMesh&&(this._tooltipMesh.renderingGroupId=o)}get renderingGroupId(){return this._backPlate.renderingGroupId}set tooltipText(o){if(!o){this._disposeTooltip();return}if(!this._tooltipFade){const a=this._backPlate._scene.useRightHandedSystem;this._tooltipMesh=(0,r.CreatePlane)("",{size:1},this._backPlate._scene);const l=(0,r.CreatePlane)("",{size:1,sideOrientation:r.Mesh.DOUBLESIDE},this._backPlate._scene),c=new r.StandardMaterial("",this._backPlate._scene);c.diffuseColor=r.Color3.FromHexString("#212121"),l.material=c,l.isPickable=!1,this._tooltipMesh.addChild(l),l.position=r.Vector3.Forward(a).scale(.05),this._tooltipMesh.scaling.y=1/3,this._tooltipMesh.position=r.Vector3.Up().scale(.7).add(r.Vector3.Forward(a).scale(-.15)),this._tooltipMesh.isPickable=!1,this._tooltipMesh.parent=this._backPlate,this._tooltipTexture=_.AdvancedDynamicTexture.CreateForMesh(this._tooltipMesh),this._tooltipTextBlock=new e.TextBlock,this._tooltipTextBlock.scaleY=3,this._tooltipTextBlock.color="white",this._tooltipTextBlock.fontSize=130,this._tooltipTexture.addControl(this._tooltipTextBlock),this._tooltipFade=new r.FadeInOutBehavior,this._tooltipFade.delay=500,this._tooltipMesh.addBehavior(this._tooltipFade),this._tooltipHoverObserver=this.onPointerEnterObservable.add(()=>{this._tooltipFade&&this._tooltipFade.fadeIn(!0)}),this._tooltipOutObserver=this.onPointerOutObservable.add(()=>{this._tooltipFade&&this._tooltipFade.fadeIn(!1)})}this._tooltipTextBlock&&(this._tooltipTextBlock.text=o)}get tooltipText(){return this._tooltipTextBlock?this._tooltipTextBlock.text:null}get text(){return this._text}set text(o){this._text!==o&&(this._text=o,this._rebuildContent())}get imageUrl(){return this._imageUrl}set imageUrl(o){this._imageUrl!==o&&(this._imageUrl=o,this._rebuildContent())}get backMaterial(){return this._backMaterial}get frontMaterial(){return this._frontMaterial}get plateMaterial(){return this._plateMaterial}get shareMaterials(){return this._shareMaterials}constructor(o,a=!0){super(o);this._shareMaterials=!0,this._shareMaterials=a,this.pointerEnterAnimation=()=>{!this.mesh||this._frontPlate.setEnabled(!0)},this.pointerOutAnimation=()=>{!this.mesh||this._frontPlate.setEnabled(!1)}}_getTypeName(){return"HolographicButton"}_rebuildContent(){this._disposeFacadeTexture();const o=new g.StackPanel;if(o.isVertical=!0,r.DomManagement.IsDocumentAvailable()&&!!document.createElement&&this._imageUrl){const a=new d.Image;a.source=this._imageUrl,a.paddingTop="40px",a.height="180px",a.width="100px",a.paddingBottom="40px",o.addControl(a)}if(this._text){const a=new e.TextBlock;a.text=this._text,a.color="white",a.height="30px",a.fontSize=24,o.addControl(a)}this._frontPlate&&(this.content=o)}_createNode(o){return this._backPlate=(0,r.CreateBox)(this.name+"BackMesh",{width:1,height:1,depth:.08},o),this._frontPlate=(0,r.CreateBox)(this.name+"FrontMesh",{width:1,height:1,depth:.08},o),this._frontPlate.parent=this._backPlate,this._frontPlate.position=r.Vector3.Forward(o.useRightHandedSystem).scale(-.08),this._frontPlate.isPickable=!1,this._frontPlate.setEnabled(!1),this._textPlate=super._createNode(o),this._textPlate.parent=this._backPlate,this._textPlate.position=r.Vector3.Forward(o.useRightHandedSystem).scale(-.08),this._textPlate.isPickable=!1,this._backPlate}_applyFacade(o){this._plateMaterial.emissiveTexture=o,this._plateMaterial.opacityTexture=o}_createBackMaterial(o){this._backMaterial=new f.FluentMaterial(this.name+"Back Material",o.getScene()),this._backMaterial.renderHoverLight=!0,this._pickedPointObserver=this._host.onPickedPointChangedObservable.add(a=>{a?(this._backMaterial.hoverPosition=a,this._backMaterial.hoverColor.a=1):this._backMaterial.hoverColor.a=0})}_createFrontMaterial(o){this._frontMaterial=new f.FluentMaterial(this.name+"Front Material",o.getScene()),this._frontMaterial.innerGlowColorIntensity=0,this._frontMaterial.alpha=.5,this._frontMaterial.renderBorders=!0}_createPlateMaterial(o){this._plateMaterial=new r.StandardMaterial(this.name+"Plate Material",o.getScene()),this._plateMaterial.specularColor=r.Color3.Black()}_affectMaterial(o){this._shareMaterials?(this._host._sharedMaterials.backFluentMaterial?this._backMaterial=this._host._sharedMaterials.backFluentMaterial:(this._createBackMaterial(o),this._host._sharedMaterials.backFluentMaterial=this._backMaterial),this._host._sharedMaterials.frontFluentMaterial?this._frontMaterial=this._host._sharedMaterials.frontFluentMaterial:(this._createFrontMaterial(o),this._host._sharedMaterials.frontFluentMaterial=this._frontMaterial)):(this._createBackMaterial(o),this._createFrontMaterial(o)),this._createPlateMaterial(o),this._backPlate.material=this._backMaterial,this._frontPlate.material=this._frontMaterial,this._textPlate.material=this._plateMaterial,this._rebuildContent()}dispose(){super.dispose(),this._disposeTooltip(),this.shareMaterials||(this._backMaterial.dispose(),this._frontMaterial.dispose(),this._plateMaterial.dispose(),this._pickedPointObserver&&(this._host.onPickedPointChangedObservable.remove(this._pickedPointObserver),this._pickedPointObserver=null))}}},"../../../dev/gui/dist/3D/controls/holographicSlate.js":(C,v,n)=>{n.r(v),n.d(v,{HolographicSlate:()=>a});var s=n("../../../dev/gui/dist/3D/controls/contentDisplay3D.js"),r=n("../../../dev/gui/dist/3D/controls/touchHolographicButton.js"),p=n("../../../dev/gui/dist/2D/advancedDynamicTexture.js"),f=n("../../../dev/gui/dist/2D/controls/control.js"),g=n("../../../dev/gui/dist/2D/controls/textBlock.js"),d=n("../../../dev/gui/dist/3D/behaviors/defaultBehavior.js"),e=n("../../../dev/gui/dist/3D/gizmos/slateGizmo.js"),_=n("../../../dev/gui/dist/3D/materials/fluent/fluentMaterial.js"),t=n("../../../dev/gui/dist/3D/materials/fluentBackplate/fluentBackplateMaterial.js"),i=n("core/Misc/observable"),o=n.n(i);class a extends s.ContentDisplay3D{get defaultBehavior(){return this._defaultBehavior}get dimensions(){return this._dimensions}set dimensions(c){let h=1;if(c.x<this.minDimensions.x||c.y<this.minDimensions.y){const u=c.x/c.y;this.minDimensions.x/this.minDimensions.y>u?h=this.minDimensions.x/c.x:h=this.minDimensions.y/c.y}this._dimensions.copyFrom(c).scaleInPlace(h),this._updatePivot(),this._positionElements()}get titleBarHeight(){return this._titleBarHeight}set titleBarHeight(c){this._titleBarHeight=c}set renderingGroupId(c){this._titleBar.renderingGroupId=c,this._titleBarTitle.renderingGroupId=c,this._contentPlate.renderingGroupId=c,this._backPlate.renderingGroupId=c}get renderingGroupId(){return this._titleBar.renderingGroupId}set title(c){this._titleText=c,this._titleTextComponent&&(this._titleTextComponent.text=c)}get title(){return this._titleText}constructor(c){super(c);this.titleBarMargin=.005,this.origin=new i.Vector3(0,0,0),this._dimensions=new i.Vector2(21.875,12.5),this._titleBarHeight=.625,this._titleText="",this._contentScaleRatio=1,this.minDimensions=new i.Vector2(15.625,6.25),this.defaultDimensions=this._dimensions.clone(),this._followButton=new r.TouchHolographicButton("followButton"+this.name),this._followButton.isToggleButton=!0,this._closeButton=new r.TouchHolographicButton("closeButton"+this.name),this._contentViewport=new i.Viewport(0,0,1,1),this._contentDragBehavior=new i.PointerDragBehavior({dragPlaneNormal:new i.Vector3(0,0,-1)})}_applyFacade(c){this._contentMaterial.albedoTexture=c,this._resetContentPositionAndZoom(),this._applyContentViewport(),c.attachToMesh(this._contentPlate,!0)}_addControl(c){c._host=this._host,this._host.utilityLayer&&c._prepareNode(this._host.utilityLayer.utilityLayerScene)}_getTypeName(){return"HolographicSlate"}_positionElements(){const c=this._followButton,h=this._closeButton,u=this._titleBar,m=this._titleBarTitle,b=this._contentPlate,P=this._backPlate;if(c&&h&&u){h.scaling.setAll(this.titleBarHeight),c.scaling.setAll(this.titleBarHeight),h.position.copyFromFloats(this.dimensions.x-this.titleBarHeight/2,-this.titleBarHeight/2,0).addInPlace(this.origin),c.position.copyFromFloats(this.dimensions.x-3*this.titleBarHeight/2,-this.titleBarHeight/2,0).addInPlace(this.origin);const B=this.dimensions.y-this.titleBarHeight-this.titleBarMargin,I=b.getScene().useRightHandedSystem;u.scaling.set(this.dimensions.x,this.titleBarHeight,i.Epsilon),m.scaling.set(this.dimensions.x-2*this.titleBarHeight,this.titleBarHeight,i.Epsilon),b.scaling.copyFromFloats(this.dimensions.x,B,i.Epsilon),P.scaling.copyFromFloats(this.dimensions.x,B,i.Epsilon),u.position.copyFromFloats(this.dimensions.x/2,-(this.titleBarHeight/2),0).addInPlace(this.origin),m.position.copyFromFloats(this.dimensions.x/2-this.titleBarHeight,-(this.titleBarHeight/2),I?i.Epsilon:-i.Epsilon).addInPlace(this.origin),b.position.copyFromFloats(this.dimensions.x/2,-(this.titleBarHeight+this.titleBarMargin+B/2),0).addInPlace(this.origin),P.position.copyFromFloats(this.dimensions.x/2,-(this.titleBarHeight+this.titleBarMargin+B/2),I?-i.Epsilon:i.Epsilon).addInPlace(this.origin),this._titleTextComponent.host.scaleTo(a._DEFAULT_TEXT_RESOLUTION_Y*m.scaling.x/m.scaling.y,a._DEFAULT_TEXT_RESOLUTION_Y);const x=this.dimensions.x/B;this._contentViewport.width=this._contentScaleRatio,this._contentViewport.height=this._contentScaleRatio/x,this._applyContentViewport(),this._gizmo&&this._gizmo.updateBoundingBox()}}_applyContentViewport(){var c;if(((c=this._contentPlate)==null?void 0:c.material)&&this._contentPlate.material.albedoTexture){const h=this._contentPlate.material.albedoTexture;h.uScale=this._contentScaleRatio,h.vScale=this._contentScaleRatio/this._contentViewport.width*this._contentViewport.height,h.uOffset=this._contentViewport.x,h.vOffset=this._contentViewport.y}}_resetContentPositionAndZoom(){this._contentViewport.x=0,this._contentViewport.y=1-this._contentViewport.height/this._contentViewport.width,this._contentScaleRatio=1}_updatePivot(){if(!this.mesh)return;const c=new i.Vector3(this.dimensions.x*.5,-this.dimensions.y*.5,i.Epsilon);c.addInPlace(this.origin),c.z=0;const h=new i.Vector3(0,0,0);i.Vector3.TransformCoordinatesToRef(h,this.mesh.computeWorldMatrix(!0),h),this.mesh.setPivotPoint(c);const u=new i.Vector3(0,0,0);i.Vector3.TransformCoordinatesToRef(u,this.mesh.computeWorldMatrix(!0),u),this.mesh.position.addInPlace(h).subtractInPlace(u)}_createNode(c){const h=new i.Mesh("slate_"+this.name,c);this._titleBar=(0,i.CreateBox)("titleBar_"+this.name,{size:1},c),this._titleBarTitle=(0,i.CreatePlane)("titleText_"+this.name,{size:1},c),this._titleBarTitle.parent=h,this._titleBarTitle.isPickable=!1;const u=p.AdvancedDynamicTexture.CreateForMesh(this._titleBarTitle);if(this._titleTextComponent=new g.TextBlock("titleText_"+this.name,this._titleText),this._titleTextComponent.textWrapping=g.TextWrapping.Ellipsis,this._titleTextComponent.textHorizontalAlignment=f.Control.HORIZONTAL_ALIGNMENT_LEFT,this._titleTextComponent.color="white",this._titleTextComponent.fontSize=a._DEFAULT_TEXT_RESOLUTION_Y/2,this._titleTextComponent.paddingLeft=a._DEFAULT_TEXT_RESOLUTION_Y/4,u.addControl(this._titleTextComponent),c.useRightHandedSystem){const P=new i.Vector4(0,0,1,1);this._contentPlate=(0,i.CreatePlane)("contentPlate_"+this.name,{size:1,sideOrientation:i.VertexData.BACKSIDE,frontUVs:P},c),this._backPlate=(0,i.CreatePlane)("backPlate_"+this.name,{size:1,sideOrientation:i.VertexData.FRONTSIDE},c)}else{const P=new i.Vector4(0,0,1,1);this._contentPlate=(0,i.CreatePlane)("contentPlate_"+this.name,{size:1,sideOrientation:i.VertexData.FRONTSIDE,frontUVs:P},c),this._backPlate=(0,i.CreatePlane)("backPlate_"+this.name,{size:1,sideOrientation:i.VertexData.BACKSIDE},c)}this._titleBar.parent=h,this._titleBar.isNearGrabbable=!0,this._contentPlate.parent=h,this._backPlate.parent=h,this._attachContentPlateBehavior(),this._addControl(this._followButton),this._addControl(this._closeButton);const m=this._followButton,b=this._closeButton;return m.node.parent=h,b.node.parent=h,this._positionElements(),this._followButton.imageUrl=a.ASSETS_BASE_URL+a.FOLLOW_ICON_FILENAME,this._closeButton.imageUrl=a.ASSETS_BASE_URL+a.CLOSE_ICON_FILENAME,this._followButton.isBackplateVisible=!1,this._closeButton.isBackplateVisible=!1,this._followButton.onToggleObservable.add(P=>{this._defaultBehavior.followBehaviorEnabled=P,this._defaultBehavior.followBehaviorEnabled&&this._defaultBehavior.followBehavior.recenter()}),this._closeButton.onPointerClickObservable.add(()=>{this.dispose()}),h.rotationQuaternion=i.Quaternion.Identity(),h.isVisible=!1,h}_attachContentPlateBehavior(){this._contentDragBehavior.attach(this._contentPlate),this._contentDragBehavior.moveAttached=!1,this._contentDragBehavior.useObjectOrientationForDragging=!0,this._contentDragBehavior.updateDragPlane=!1;const c=new i.Vector3,h=new i.Vector3,u=new i.Vector3,m=new i.Vector3,b=new i.Vector2;let P,B;this._contentDragBehavior.onDragStartObservable.add(x=>{!this.node||(P=this._contentViewport.clone(),B=this.node.computeWorldMatrix(!0),c.copyFrom(x.dragPlanePoint),h.set(this.dimensions.x,this.dimensions.y,i.Epsilon),h.y-=this.titleBarHeight+this.titleBarMargin,i.Vector3.TransformNormalToRef(h,B,h),u.copyFromFloats(0,1,0),i.Vector3.TransformNormalToRef(u,B,u),m.copyFromFloats(1,0,0),i.Vector3.TransformNormalToRef(m,B,m),u.normalize(),u.scaleInPlace(1/i.Vector3.Dot(u,h)),m.normalize(),m.scaleInPlace(1/i.Vector3.Dot(m,h)))});const I=new i.Vector3;this._contentDragBehavior.onDragObservable.add(x=>{I.copyFrom(x.dragPlanePoint),I.subtractInPlace(c),b.copyFromFloats(i.Vector3.Dot(I,m),i.Vector3.Dot(I,u)),this._contentViewport.x=i.Scalar.Clamp(P.x-I.x,0,1-this._contentViewport.width*this._contentScaleRatio),this._contentViewport.y=i.Scalar.Clamp(P.y-I.y,0,1-this._contentViewport.height*this._contentScaleRatio),this._applyContentViewport()})}_affectMaterial(c){this._titleBarMaterial=new t.FluentBackplateMaterial(`${this.name} plateMaterial`,c.getScene()),this._contentMaterial=new _.FluentMaterial(`${this.name} contentMaterial`,c.getScene()),this._contentMaterial.renderBorders=!0,this._backMaterial=new t.FluentBackplateMaterial(`${this.name} backPlate`,c.getScene()),this._backMaterial.lineWidth=i.Epsilon,this._backMaterial.radius=.005,this._backMaterial.backFaceCulling=!0,this._titleBar.material=this._titleBarMaterial,this._contentPlate.material=this._contentMaterial,this._backPlate.material=this._backMaterial,this._resetContent(),this._applyContentViewport()}_prepareNode(c){super._prepareNode(c),this._gizmo=new e.SlateGizmo(this._host.utilityLayer),this._gizmo.attachedSlate=this,this._defaultBehavior=new d.DefaultBehavior,this._defaultBehavior.attach(this.node,[this._titleBar]),this._defaultBehavior.sixDofDragBehavior.onDragStartObservable.add(()=>{this._followButton.isToggled=!1}),this._positionChangedObserver=this._defaultBehavior.sixDofDragBehavior.onPositionChangedObservable.add(()=>{this._gizmo.updateBoundingBox()}),this._updatePivot(),this.resetDefaultAspectAndPose(!1)}resetDefaultAspectAndPose(c=!0){if(!this._host||!this._host.utilityLayer||!this.node)return;const h=this._host.utilityLayer.utilityLayerScene,u=h.activeCamera;if(u){const m=u.getWorldMatrix(),b=i.Vector3.TransformNormal(i.Vector3.Backward(h.useRightHandedSystem),m);this.origin.setAll(0),this._gizmo.updateBoundingBox();const P=this.node.getAbsolutePivotPoint();this.node.position.copyFrom(u.position).subtractInPlace(b).subtractInPlace(P),this.node.rotationQuaternion=i.Quaternion.FromLookDirectionLH(b,new i.Vector3(0,1,0)),c&&(this.dimensions=this.defaultDimensions)}}dispose(){super.dispose(),this._titleBarMaterial.dispose(),this._contentMaterial.dispose(),this._titleBar.dispose(),this._titleBarTitle.dispose(),this._contentPlate.dispose(),this._backPlate.dispose(),this._followButton.dispose(),this._closeButton.dispose(),this._host.onPickedPointChangedObservable.remove(this._pickedPointObserver),this._defaultBehavior.sixDofDragBehavior.onPositionChangedObservable.remove(this._positionChangedObserver),this._defaultBehavior.detach(),this._gizmo.dispose(),this._contentDragBehavior.detach()}}a.ASSETS_BASE_URL="https://assets.babylonjs.com/meshes/MRTK/",a.CLOSE_ICON_FILENAME="IconClose.png",a.FOLLOW_ICON_FILENAME="IconFollowMe.png",a._DEFAULT_TEXT_RESOLUTION_Y=102.4},"../../../dev/gui/dist/3D/controls/index.js":(C,v,n)=>{n.r(v),n.d(v,{AbstractButton3D:()=>s.AbstractButton3D,Button3D:()=>r.Button3D,Container3D:()=>p.Container3D,Control3D:()=>f.Control3D,CylinderPanel:()=>g.CylinderPanel,HandMenu:()=>d.HandMenu,HolographicBackplate:()=>e.HolographicBackplate,HolographicButton:()=>_.HolographicButton,HolographicSlate:()=>t.HolographicSlate,MeshButton3D:()=>i.MeshButton3D,NearMenu:()=>o.NearMenu,PlanePanel:()=>a.PlanePanel,ScatterPanel:()=>l.ScatterPanel,Slider3D:()=>c.Slider3D,SpherePanel:()=>h.SpherePanel,StackPanel3D:()=>u.StackPanel3D,TouchButton3D:()=>m.TouchButton3D,TouchHolographicButton:()=>P.TouchHolographicButton,TouchHolographicButtonV3:()=>x.TouchHolographicButton,TouchHolographicMenu:()=>B.TouchHolographicMenu,TouchMeshButton3D:()=>b.TouchMeshButton3D,VolumeBasedPanel:()=>I.VolumeBasedPanel});var s=n("../../../dev/gui/dist/3D/controls/abstractButton3D.js"),r=n("../../../dev/gui/dist/3D/controls/button3D.js"),p=n("../../../dev/gui/dist/3D/controls/container3D.js"),f=n("../../../dev/gui/dist/3D/controls/control3D.js"),g=n("../../../dev/gui/dist/3D/controls/cylinderPanel.js"),d=n("../../../dev/gui/dist/3D/controls/handMenu.js"),e=n("../../../dev/gui/dist/3D/controls/holographicBackplate.js"),_=n("../../../dev/gui/dist/3D/controls/holographicButton.js"),t=n("../../../dev/gui/dist/3D/controls/holographicSlate.js"),i=n("../../../dev/gui/dist/3D/controls/meshButton3D.js"),o=n("../../../dev/gui/dist/3D/controls/nearMenu.js"),a=n("../../../dev/gui/dist/3D/controls/planePanel.js"),l=n("../../../dev/gui/dist/3D/controls/scatterPanel.js"),c=n("../../../dev/gui/dist/3D/controls/slider3D.js"),h=n("../../../dev/gui/dist/3D/controls/spherePanel.js"),u=n("../../../dev/gui/dist/3D/controls/stackPanel3D.js"),m=n("../../../dev/gui/dist/3D/controls/touchButton3D.js"),b=n("../../../dev/gui/dist/3D/controls/touchMeshButton3D.js"),P=n("../../../dev/gui/dist/3D/controls/touchHolographicButton.js"),B=n("../../../dev/gui/dist/3D/controls/touchHolographicMenu.js"),I=n("../../../dev/gui/dist/3D/controls/volumeBasedPanel.js"),x=n("../../../dev/gui/dist/3D/controls/MRTK3/touchHolographicButton.js")},"../../../dev/gui/dist/3D/controls/meshButton3D.js":(C,v,n)=>{n.r(v),n.d(v,{MeshButton3D:()=>r});var s=n("../../../dev/gui/dist/3D/controls/button3D.js");class r extends s.Button3D{constructor(f,g){super(g);this._currentMesh=f,this.pointerEnterAnimation=()=>{!this.mesh||this.mesh.scaling.scaleInPlace(1.1)},this.pointerOutAnimation=()=>{!this.mesh||this.mesh.scaling.scaleInPlace(1/1.1)},this.pointerDownAnimation=()=>{!this.mesh||this.mesh.scaling.scaleInPlace(.95)},this.pointerUpAnimation=()=>{!this.mesh||this.mesh.scaling.scaleInPlace(1/.95)}}_getTypeName(){return"MeshButton3D"}_createNode(f){return this._currentMesh.getChildMeshes().forEach(g=>{this._injectGUI3DReservedDataStore(g).control=this}),this._currentMesh}_affectMaterial(f){}}},"../../../dev/gui/dist/3D/controls/nearMenu.js":(C,v,n)=>{n.r(v),n.d(v,{NearMenu:()=>f});var s=n("../../../dev/gui/dist/3D/controls/touchHolographicButton.js"),r=n("../../../dev/gui/dist/3D/behaviors/defaultBehavior.js"),p=n("../../../dev/gui/dist/3D/controls/touchHolographicMenu.js");class f extends p.TouchHolographicMenu{get defaultBehavior(){return this._defaultBehavior}get isPinned(){return this._isPinned}set isPinned(d){if(this._pinButton.isToggled!==d){this._pinButton.isToggled=d;return}this._isPinned=d,d?this._defaultBehavior.followBehaviorEnabled=!1:this._defaultBehavior.followBehaviorEnabled=!0}_createPinButton(d){const e=new s.TouchHolographicButton("pin"+this.name,!1);return e.imageUrl=f._ASSETS_BASE_URL+f._PIN_ICON_FILENAME,e.parent=this,e._host=this._host,e.isToggleButton=!0,e.onToggleObservable.add(_=>{this.isPinned=_}),this._host.utilityLayer&&(e._prepareNode(this._host.utilityLayer.utilityLayerScene),e.scaling.scaleInPlace(p.TouchHolographicMenu.MENU_BUTTON_SCALE),e.node&&(e.node.parent=d)),e}_createNode(d){const e=super._createNode(d);return this._pinButton=this._createPinButton(e),this.isPinned=!1,this._defaultBehavior.attach(e,[this._backPlate]),this._defaultBehavior.followBehavior.ignoreCameraPitchAndRoll=!0,this._defaultBehavior.followBehavior.pitchOffset=-15,this._defaultBehavior.followBehavior.minimumDistance=.3,this._defaultBehavior.followBehavior.defaultDistance=.4,this._defaultBehavior.followBehavior.maximumDistance=.6,this._backPlate.isNearGrabbable=!0,e.isVisible=!1,e}_finalProcessing(){super._finalProcessing(),this._pinButton.position.copyFromFloats((this._backPlate.scaling.x+p.TouchHolographicMenu.MENU_BUTTON_SCALE)/2,this._backPlate.scaling.y/2,0)}constructor(d){super(d);this._isPinned=!1,this._defaultBehavior=new r.DefaultBehavior,this._dragObserver=this._defaultBehavior.sixDofDragBehavior.onDragObservable.add(()=>{this.isPinned=!0}),this.backPlateMargin=1}dispose(){super.dispose(),this._defaultBehavior.sixDofDragBehavior.onDragObservable.remove(this._dragObserver),this._defaultBehavior.detach()}}f._ASSETS_BASE_URL="https://assets.babylonjs.com/meshes/MRTK/",f._PIN_ICON_FILENAME="IconPin.png"},"../../../dev/gui/dist/3D/controls/planePanel.js":(C,v,n)=>{n.r(v),n.d(v,{PlanePanel:()=>g});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/3D/controls/container3D.js"),f=n("../../../dev/gui/dist/3D/controls/volumeBasedPanel.js");class g extends f.VolumeBasedPanel{_mapGridNode(e,_){const t=e.mesh;if(!t)return;e.position=_.clone();const i=s.TmpVectors.Vector3[0];switch(i.copyFrom(_),this.orientation){case p.Container3D.FACEORIGIN_ORIENTATION:case p.Container3D.FACEFORWARD_ORIENTATION:i.addInPlace(new s.Vector3(0,0,1)),t.lookAt(i);break;case p.Container3D.FACEFORWARDREVERSED_ORIENTATION:case p.Container3D.FACEORIGINREVERSED_ORIENTATION:i.addInPlace(new s.Vector3(0,0,-1)),t.lookAt(i);break}}}},"../../../dev/gui/dist/3D/controls/scatterPanel.js":(C,v,n)=>{n.r(v),n.d(v,{ScatterPanel:()=>g});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/3D/controls/volumeBasedPanel.js"),f=n("../../../dev/gui/dist/3D/controls/container3D.js");class g extends p.VolumeBasedPanel{constructor(){super(...arguments);this._iteration=100}get iteration(){return this._iteration}set iteration(e){this._iteration!==e&&(this._iteration=e,s.Tools.SetImmediate(()=>{this._arrangeChildren()}))}_mapGridNode(e,_){const t=e.mesh,i=this._scatterMapping(_);if(!!t){switch(this.orientation){case f.Container3D.FACEORIGIN_ORIENTATION:case f.Container3D.FACEFORWARD_ORIENTATION:t.lookAt(new s.Vector3(0,0,1));break;case f.Container3D.FACEFORWARDREVERSED_ORIENTATION:case f.Container3D.FACEORIGINREVERSED_ORIENTATION:t.lookAt(new s.Vector3(0,0,-1));break}e.position=i}}_scatterMapping(e){return e.x=(1-Math.random()*2)*this._cellWidth,e.y=(1-Math.random()*2)*this._cellHeight,e}_finalProcessing(){const e=[];for(const _ of this._children)!_.mesh||e.push(_.mesh);for(let _=0;_<this._iteration;_++){e.sort((l,c)=>{const h=l.position.lengthSquared(),u=c.position.lengthSquared();return h<u?1:h>u?-1:0});const t=Math.pow(this.margin,2),i=Math.max(this._cellWidth,this._cellHeight),o=s.TmpVectors.Vector2[0],a=s.TmpVectors.Vector3[0];for(let l=0;l<e.length-1;l++)for(let c=l+1;c<e.length;c++)if(l!=c){e[c].position.subtractToRef(e[l].position,a),o.x=a.x,o.y=a.y;const h=i;let u=o.lengthSquared()-t;u-=Math.min(u,t),u<Math.pow(h,2)&&(o.normalize(),a.scaleInPlace((h-Math.sqrt(u))*.5),e[c].position.addInPlace(a),e[l].position.subtractInPlace(a))}}}}},"../../../dev/gui/dist/3D/controls/slider3D.js":(C,v,n)=>{n.r(v),n.d(v,{Slider3D:()=>l});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/3D/controls/control3D.js"),f=n("../../../dev/gui/dist/3D/materials/mrdl/mrdlSliderBarMaterial.js"),g=n("../../../dev/gui/dist/3D/materials/mrdl/mrdlSliderThumbMaterial.js"),d=n("../../../dev/gui/dist/3D/materials/mrdl/mrdlBackplateMaterial.js");const e=0,_=100,t=50,i=0,o=1,a=.2;class l extends p.Control3D{constructor(h,u){super(h);this.onValueChangedObservable=new s.Observable,this._sliderBackplateVisible=u||!1,this._minimum=e,this._maximum=_,this._step=i,this._value=t}get mesh(){return this.node?this._sliderThumb:null}get minimum(){return this._minimum}set minimum(h){this._minimum!==h&&(this._minimum=Math.max(h,e),this._value=Math.max(Math.min(this._value,this._maximum),this._minimum))}get maximum(){return this._maximum}set maximum(h){this._maximum!==h&&(this._maximum=Math.max(h,this._minimum),this._value=Math.max(Math.min(this._value,this._maximum),this._minimum))}get step(){return this._step}set step(h){this._step!==h&&(this._step=Math.max(Math.min(h,this._maximum-this._minimum),i))}get value(){return this._value}set value(h){this._value!==h&&(this._value=Math.max(Math.min(h,this._maximum),this._minimum),this._sliderThumb&&(this._sliderThumb.position.x=this._convertToPosition(this.value)),this.onValueChangedObservable.notifyObservers(this._value))}get start(){return this.node?this._sliderBar.position.x-this._sliderBar.scaling.x/2:-o/2}get end(){return this.node?this._sliderBar.position.x+this._sliderBar.scaling.x/2:o/2}get sliderBarMaterial(){return this._sliderBarMaterial}get sliderThumbMaterial(){return this._sliderThumbMaterial}get sliderBackplateMaterial(){return this._sliderBackplateMaterial}set isVisible(h){var u;this._isVisible!==h&&(this._isVisible=h,(u=this.node)==null||u.setEnabled(h))}_createNode(h){const u=(0,s.CreateBox)(`${this.name}_sliderbackplate`,{width:1,height:1,depth:1},h);return u.isPickable=!1,u.visibility=0,u.scaling=new s.Vector3(1,.5,.8),s.SceneLoader.ImportMeshAsync(void 0,l.MODEL_BASE_URL,l.MODEL_FILENAME,h).then(m=>{m.meshes.forEach(I=>{I.isPickable=!1});const b=m.meshes[1],P=m.meshes[1].clone(`${this.name}_sliderbar`,u),B=m.meshes[1].clone(`${this.name}_sliderthumb`,u);b.visibility=0,this._sliderBackplateVisible&&(b.visibility=1,b.name=`${this.name}_sliderbackplate`,b.scaling.x=1,b.scaling.z=.2,b.parent=u,this._sliderBackplateMaterial&&(b.material=this._sliderBackplateMaterial),this._sliderBackplate=b),P&&(P.parent=u,P.position.z=-.1,P.scaling=new s.Vector3(o-a,.04,.3),this._sliderBarMaterial&&(P.material=this._sliderBarMaterial),this._sliderBar=P),B&&(B.parent=u,B.isPickable=!0,B.position.z=-.115,B.scaling=new s.Vector3(.025,.3,.6),B.position.x=this._convertToPosition(this.value),B.addBehavior(this._createBehavior()),this._sliderThumbMaterial&&(B.material=this._sliderThumbMaterial),this._sliderThumb=B),this._injectGUI3DReservedDataStore(u).control=this,u.getChildMeshes().forEach(I=>{this._injectGUI3DReservedDataStore(I).control=this})}),this._affectMaterial(u),u}_affectMaterial(h){var u,m,b;this._sliderBackplateMaterial=(u=this._sliderBackplateMaterial)!=null?u:new d.MRDLBackplateMaterial(`${this.name}_sliderbackplate_material`,h.getScene()),this._sliderBarMaterial=(m=this._sliderBarMaterial)!=null?m:new f.MRDLSliderBarMaterial(`${this.name}_sliderbar_material`,h.getScene()),this._sliderThumbMaterial=(b=this._sliderThumbMaterial)!=null?b:new g.MRDLSliderThumbMaterial(`${this.name}_sliderthumb_material`,h.getScene())}_createBehavior(){const h=new s.PointerDragBehavior({dragAxis:s.Vector3.Right()});return h.moveAttached=!1,h.onDragStartObservable.add(()=>{this._draggedPosition=this._sliderThumb.position.x}),h.onDragObservable.add(u=>{this._draggedPosition+=u.dragDistance/this.scaling.x,this.value=this._convertToValue(this._draggedPosition)}),h}_convertToPosition(h){const u=(h-this.minimum)/(this.maximum-this.minimum)*(this.end-this.start)+this.start;return Math.min(Math.max(u,this.start),this.end)}_convertToValue(h){let u=(h-this.start)/(this.end-this.start)*(this.maximum-this.minimum);return u=this.step?Math.round(u/this.step)*this.step:u,Math.max(Math.min(this.minimum+u,this._maximum),this._minimum)}dispose(){var h,u,m,b,P,B;super.dispose(),(h=this._sliderBar)==null||h.dispose(),(u=this._sliderThumb)==null||u.dispose(),(m=this._sliderBarMaterial)==null||m.dispose(),(b=this._sliderThumbMaterial)==null||b.dispose(),(P=this._sliderBackplate)==null||P.dispose(),(B=this._sliderBackplateMaterial)==null||B.dispose()}}l.MODEL_BASE_URL="https://assets.babylonjs.com/meshes/MRTK/",l.MODEL_FILENAME="mrtk-fluent-backplate.glb"},"../../../dev/gui/dist/3D/controls/spherePanel.js":(C,v,n)=>{n.r(v),n.d(v,{SpherePanel:()=>g});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/3D/controls/volumeBasedPanel.js"),f=n("../../../dev/gui/dist/3D/controls/container3D.js");class g extends p.VolumeBasedPanel{constructor(){super(...arguments);this._radius=5}get radius(){return this._radius}set radius(e){this._radius!==e&&(this._radius=e,s.Tools.SetImmediate(()=>{this._arrangeChildren()}))}_mapGridNode(e,_){const t=e.mesh;if(!t)return;const i=this._sphericalMapping(_);switch(e.position=i,this.orientation){case f.Container3D.FACEORIGIN_ORIENTATION:t.lookAt(new s.Vector3(2*i.x,2*i.y,2*i.z));break;case f.Container3D.FACEORIGINREVERSED_ORIENTATION:t.lookAt(new s.Vector3(-i.x,-i.y,-i.z));break;case f.Container3D.FACEFORWARD_ORIENTATION:break;case f.Container3D.FACEFORWARDREVERSED_ORIENTATION:t.rotate(s.Axis.Y,Math.PI,s.Space.LOCAL);break}}_sphericalMapping(e){const _=new s.Vector3(0,0,this._radius),t=e.y/this._radius,i=-(e.x/this._radius);return s.Matrix.RotationYawPitchRollToRef(i,t,0,s.TmpVectors.Matrix[0]),s.Vector3.TransformNormal(_,s.TmpVectors.Matrix[0])}}},"../../../dev/gui/dist/3D/controls/stackPanel3D.js":(C,v,n)=>{n.r(v),n.d(v,{StackPanel3D:()=>f});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/3D/controls/container3D.js");class f extends p.Container3D{get isVertical(){return this._isVertical}set isVertical(d){this._isVertical!==d&&(this._isVertical=d,s.Tools.SetImmediate(()=>{this._arrangeChildren()}))}constructor(d=!1){super();this._isVertical=!1,this.margin=.1,this._isVertical=d}_arrangeChildren(){let d=0,e=0,_=0;const t=[],i=s.Matrix.Invert(this.node.computeWorldMatrix(!0));for(const l of this._children){if(!l.mesh)continue;_++,l.mesh.computeWorldMatrix(!0),l.mesh.getWorldMatrix().multiplyToRef(i,s.TmpVectors.Matrix[0]);const c=l.mesh.getBoundingInfo().boundingBox,h=s.Vector3.TransformNormal(c.extendSize,s.TmpVectors.Matrix[0]);t.push(h),this._isVertical?e+=h.y:d+=h.x}this._isVertical?e+=(_-1)*this.margin/2:d+=(_-1)*this.margin/2;let o;this._isVertical?o=-e:o=-d;let a=0;for(const l of this._children){if(!l.mesh)continue;_--;const c=t[a++];this._isVertical?(l.position.y=o+c.y,l.position.x=0,o+=c.y*2):(l.position.x=o+c.x,l.position.y=0,o+=c.x*2),o+=_>0?this.margin:0}}}},"../../../dev/gui/dist/3D/controls/touchButton3D.js":(C,v,n)=>{n.r(v),n.d(v,{TouchButton3D:()=>f});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/3D/controls/button3D.js");class f extends p.Button3D{constructor(d,e){super(d);this._isNearPressed=!1,this._interactionSurfaceHeight=0,this._isToggleButton=!1,this._toggleState=!1,this._toggleButtonCallback=()=>{this._onToggle(!this._toggleState)},this.onToggleObservable=new s.Observable,this.collidableFrontDirection=s.Vector3.Zero(),e&&(this.collisionMesh=e)}get isActiveNearInteraction(){return this._isNearPressed}set collidableFrontDirection(d){if(this._collidableFrontDirection=d.normalize(),this._collisionMesh){const e=s.TmpVectors.Matrix[0];e.copyFrom(this._collisionMesh.getWorldMatrix()),e.invert(),s.Vector3.TransformNormalToRef(this._collidableFrontDirection,e,this._collidableFrontDirection),this._collidableFrontDirection.normalize()}}get collidableFrontDirection(){if(this._collisionMesh){const d=s.TmpVectors.Vector3[0];return s.Vector3.TransformNormalToRef(this._collidableFrontDirection,this._collisionMesh.getWorldMatrix(),d),d.normalize()}return this._collidableFrontDirection}set collisionMesh(d){var e;this._collisionMesh&&(this._collisionMesh.isNearPickable=!1,((e=this._collisionMesh.reservedDataStore)==null?void 0:e.GUI3D)&&(this._collisionMesh.reservedDataStore.GUI3D={}),this._collisionMesh.getChildMeshes().forEach(_=>{var t;_.isNearPickable=!1,((t=_.reservedDataStore)==null?void 0:t.GUI3D)&&(_.reservedDataStore.GUI3D={})})),this._collisionMesh=d,this._injectGUI3DReservedDataStore(this._collisionMesh).control=this,this._collisionMesh.isNearPickable=!0,this._collisionMesh.getChildMeshes().forEach(_=>{this._injectGUI3DReservedDataStore(_).control=this,_.isNearPickable=!0}),this.collidableFrontDirection=d.forward}set isToggleButton(d){d!==this._isToggleButton&&(this._isToggleButton=d,d?this.onPointerUpObservable.add(this._toggleButtonCallback):(this.onPointerUpObservable.removeCallback(this._toggleButtonCallback),this._toggleState&&this._onToggle(!1)))}get isToggleButton(){return this._isToggleButton}set isToggled(d){this._isToggleButton&&this._toggleState!==d&&this._onToggle(d)}get isToggled(){return this._toggleState}_onToggle(d){this._toggleState=d,this.onToggleObservable.notifyObservers(d)}_isInteractionInFrontOfButton(d){return this._getInteractionHeight(d,this._collisionMesh.getAbsolutePosition())>0}getPressDepth(d){if(!this._isNearPressed)return 0;const e=this._getInteractionHeight(d,this._collisionMesh.getAbsolutePosition());return this._interactionSurfaceHeight-e}_getInteractionHeight(d,e){const _=this.collidableFrontDirection;if(_.length()===0)return s.Vector3.Distance(d,e);const t=s.Vector3.Dot(e,_);return s.Vector3.Dot(d,_)-t}_generatePointerEventType(d,e,_){if(d===s.PointerEventTypes.POINTERDOWN||d===s.PointerEventTypes.POINTERMOVE)if(this._isInteractionInFrontOfButton(e))this._isNearPressed=!0,this._interactionSurfaceHeight=this._getInteractionHeight(e,this._collisionMesh.getAbsolutePosition());else return s.PointerEventTypes.POINTERMOVE;if(d===s.PointerEventTypes.POINTERUP){if(_==0)return s.PointerEventTypes.POINTERMOVE;this._isNearPressed=!1}return d}_getTypeName(){return"TouchButton3D"}_createNode(d){return super._createNode(d)}dispose(){super.dispose(),this.onPointerUpObservable.removeCallback(this._toggleButtonCallback),this.onToggleObservable.clear(),this._collisionMesh&&this._collisionMesh.dispose()}}},"../../../dev/gui/dist/3D/controls/touchHolographicButton.js":(C,v,n)=>{n.r(v),n.d(v,{TouchHolographicButton:()=>i});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/3D/materials/fluent/fluentMaterial.js"),f=n("../../../dev/gui/dist/3D/materials/fluentButton/fluentButtonMaterial.js"),g=n("../../../dev/gui/dist/2D/controls/stackPanel.js"),d=n("../../../dev/gui/dist/2D/controls/image.js"),e=n("../../../dev/gui/dist/2D/controls/textBlock.js"),_=n("../../../dev/gui/dist/2D/advancedDynamicTexture.js"),t=n("../../../dev/gui/dist/3D/controls/touchButton3D.js");class i extends t.TouchButton3D{_disposeTooltip(){this._tooltipFade=null,this._tooltipTextBlock&&this._tooltipTextBlock.dispose(),this._tooltipTexture&&this._tooltipTexture.dispose(),this._tooltipMesh&&this._tooltipMesh.dispose(),this.onPointerEnterObservable.remove(this._tooltipHoverObserver),this.onPointerOutObservable.remove(this._tooltipOutObserver)}set renderingGroupId(a){this._backPlate.renderingGroupId=a,this._textPlate.renderingGroupId=a,this._frontPlate.renderingGroupId=a,this._tooltipMesh&&(this._tooltipMesh.renderingGroupId=a)}get renderingGroupId(){return this._backPlate.renderingGroupId}get mesh(){return this._backPlate}set tooltipText(a){if(!a){this._disposeTooltip();return}if(!this._tooltipFade){const l=this._backPlate._scene.useRightHandedSystem;this._tooltipMesh=(0,s.CreatePlane)("",{size:1},this._backPlate._scene);const c=(0,s.CreatePlane)("",{size:1,sideOrientation:s.Mesh.DOUBLESIDE},this._backPlate._scene),h=new s.StandardMaterial("",this._backPlate._scene);h.diffuseColor=s.Color3.FromHexString("#212121"),c.material=h,c.isPickable=!1,this._tooltipMesh.addChild(c),c.position=s.Vector3.Forward(l).scale(.05),this._tooltipMesh.scaling.y=1/3,this._tooltipMesh.position=s.Vector3.Up().scale(.7).add(s.Vector3.Forward(l).scale(-.15)),this._tooltipMesh.isPickable=!1,this._tooltipMesh.parent=this._backPlate,this._tooltipTexture=_.AdvancedDynamicTexture.CreateForMesh(this._tooltipMesh),this._tooltipTextBlock=new e.TextBlock,this._tooltipTextBlock.scaleY=3,this._tooltipTextBlock.color="white",this._tooltipTextBlock.fontSize=130,this._tooltipTexture.addControl(this._tooltipTextBlock),this._tooltipFade=new s.FadeInOutBehavior,this._tooltipFade.delay=500,this._tooltipMesh.addBehavior(this._tooltipFade),this._tooltipHoverObserver=this.onPointerEnterObservable.add(()=>{this._tooltipFade&&this._tooltipFade.fadeIn(!0)}),this._tooltipOutObserver=this.onPointerOutObservable.add(()=>{this._tooltipFade&&this._tooltipFade.fadeIn(!1)})}this._tooltipTextBlock&&(this._tooltipTextBlock.text=a)}get tooltipText(){return this._tooltipTextBlock?this._tooltipTextBlock.text:null}get text(){return this._text}set text(a){this._text!==a&&(this._text=a,this._rebuildContent())}get imageUrl(){return this._imageUrl}set imageUrl(a){this._imageUrl!==a&&(this._imageUrl=a,this._rebuildContent())}get backMaterial(){return this._backMaterial}get frontMaterial(){return this._frontMaterial}get plateMaterial(){return this._plateMaterial}get shareMaterials(){return this._shareMaterials}set isBackplateVisible(a){this.mesh&&!!this._backMaterial&&(a&&!this._isBackplateVisible?this._backPlate.visibility=1:!a&&this._isBackplateVisible&&(this._backPlate.visibility=0)),this._isBackplateVisible=a}constructor(a,l=!0){super(a);this._shareMaterials=!0,this._isBackplateVisible=!0,this._frontPlateDepth=.5,this._backPlateDepth=.04,this._backplateColor=new s.Color3(.08,.15,.55),this._backplateToggledColor=new s.Color3(.25,.4,.95),this._shareMaterials=l,this.pointerEnterAnimation=()=>{this._frontMaterial.leftBlobEnable=!0,this._frontMaterial.rightBlobEnable=!0},this.pointerOutAnimation=()=>{this._frontMaterial.leftBlobEnable=!1,this._frontMaterial.rightBlobEnable=!1},this.pointerDownAnimation=()=>{this._frontPlate&&!this.isActiveNearInteraction&&(this._frontPlate.scaling.z=this._frontPlateDepth*.2,this._frontPlate.position=s.Vector3.Forward(this._frontPlate._scene.useRightHandedSystem).scale((this._frontPlateDepth-.2*this._frontPlateDepth)/2),this._textPlate.position=s.Vector3.Forward(this._textPlate._scene.useRightHandedSystem).scale(-(this._backPlateDepth+.2*this._frontPlateDepth)/2))},this.pointerUpAnimation=()=>{this._frontPlate&&(this._frontPlate.scaling.z=this._frontPlateDepth,this._frontPlate.position=s.Vector3.Forward(this._frontPlate._scene.useRightHandedSystem).scale((this._frontPlateDepth-this._frontPlateDepth)/2),this._textPlate.position=s.Vector3.Forward(this._textPlate._scene.useRightHandedSystem).scale(-(this._backPlateDepth+this._frontPlateDepth)/2))},this.onPointerMoveObservable.add(c=>{if(this._frontPlate&&this.isActiveNearInteraction){const h=s.Vector3.Zero();if(this._backPlate.getWorldMatrix().decompose(h,void 0,void 0)){let u=this._getInteractionHeight(c,this._backPlate.getAbsolutePosition())/h.z;u=s.Scalar.Clamp(u-this._backPlateDepth/2,.2*this._frontPlateDepth,this._frontPlateDepth),this._frontPlate.scaling.z=u,this._frontPlate.position=s.Vector3.Forward(this._frontPlate._scene.useRightHandedSystem).scale((this._frontPlateDepth-u)/2),this._textPlate.position=s.Vector3.Forward(this._textPlate._scene.useRightHandedSystem).scale(-(this._backPlateDepth+u)/2)}}}),this._pointerHoverObserver=this.onPointerMoveObservable.add(c=>{this._frontMaterial.globalLeftIndexTipPosition=c})}_getTypeName(){return"TouchHolographicButton"}_rebuildContent(){this._disposeFacadeTexture();const a=new g.StackPanel;if(a.isVertical=!0,s.DomManagement.IsDocumentAvailable()&&!!document.createElement&&this._imageUrl){const l=new d.Image;l.source=this._imageUrl,l.paddingTop="40px",l.height="180px",l.width="100px",l.paddingBottom="40px",a.addControl(l)}if(this._text){const l=new e.TextBlock;l.text=this._text,l.color="white",l.height="30px",l.fontSize=24,a.addControl(l)}this.content=a}_createNode(a){var h;this.name=(h=this.name)!=null?h:"TouchHolographicButton";const l=(0,s.CreateBox)(`${this.name}_collisionMesh`,{width:1,height:1,depth:this._frontPlateDepth},a);l.isPickable=!0,l.isNearPickable=!0,l.visibility=0,l.position=s.Vector3.Forward(a.useRightHandedSystem).scale(-this._frontPlateDepth/2),s.SceneLoader.ImportMeshAsync(void 0,i.MODEL_BASE_URL,i.MODEL_FILENAME,a).then(u=>{const m=(0,s.CreateBox)("${this.name}_alphaMesh",{width:1,height:1,depth:1},a);m.isPickable=!1,m.material=new s.StandardMaterial("${this.name}_alphaMesh_material",a),m.material.alpha=.15;const b=u.meshes[1];b.name=`${this.name}_frontPlate`,b.isPickable=!1,b.scaling.z=this._frontPlateDepth,m.parent=b,b.parent=l,this._frontMaterial&&(b.material=this._frontMaterial),this._frontPlate=b}),this._backPlate=(0,s.CreateBox)(`${this.name}_backPlate`,{width:1,height:1,depth:this._backPlateDepth},a),this._backPlate.position=s.Vector3.Forward(a.useRightHandedSystem).scale(this._backPlateDepth/2),this._backPlate.isPickable=!1,this._textPlate=super._createNode(a),this._textPlate.name=`${this.name}_textPlate`,this._textPlate.isPickable=!1,this._textPlate.position=s.Vector3.Forward(a.useRightHandedSystem).scale(-this._frontPlateDepth/2),this._backPlate.addChild(l),this._backPlate.addChild(this._textPlate);const c=new s.TransformNode("{this.name}_root",a);return this._backPlate.setParent(c),this.collisionMesh=l,this.collidableFrontDirection=this._backPlate.forward.negate(),c}_applyFacade(a){this._plateMaterial.emissiveTexture=a,this._plateMaterial.opacityTexture=a,this._plateMaterial.diffuseColor=new s.Color3(.4,.4,.4)}_createBackMaterial(a){this._backMaterial=new p.FluentMaterial(this.name+"backPlateMaterial",a.getScene()),this._backMaterial.albedoColor=this._backplateColor,this._backMaterial.renderBorders=!0,this._backMaterial.renderHoverLight=!1}_createFrontMaterial(a){this._frontMaterial=new f.FluentButtonMaterial(this.name+"Front Material",a.getScene())}_createPlateMaterial(a){this._plateMaterial=new s.StandardMaterial(this.name+"Plate Material",a.getScene()),this._plateMaterial.specularColor=s.Color3.Black()}_onToggle(a){this._backMaterial&&(a?this._backMaterial.albedoColor=this._backplateToggledColor:this._backMaterial.albedoColor=this._backplateColor),super._onToggle(a)}_affectMaterial(a){this._shareMaterials?(this._host._touchSharedMaterials.backFluentMaterial?this._backMaterial=this._host._touchSharedMaterials.backFluentMaterial:(this._createBackMaterial(a),this._host._touchSharedMaterials.backFluentMaterial=this._backMaterial),this._host._touchSharedMaterials.frontFluentMaterial?this._frontMaterial=this._host._touchSharedMaterials.frontFluentMaterial:(this._createFrontMaterial(a),this._host._touchSharedMaterials.frontFluentMaterial=this._frontMaterial)):(this._createBackMaterial(a),this._createFrontMaterial(a)),this._createPlateMaterial(a),this._backPlate.material=this._backMaterial,this._textPlate.material=this._plateMaterial,this._isBackplateVisible||(this._backPlate.visibility=0),this._frontPlate&&(this._frontPlate.material=this._frontMaterial),this._rebuildContent()}dispose(){super.dispose(),this._disposeTooltip(),this.onPointerMoveObservable.remove(this._pointerHoverObserver),this.shareMaterials||(this._backMaterial.dispose(),this._frontMaterial.dispose(),this._plateMaterial.dispose(),this._pickedPointObserver&&(this._host.onPickedPointChangedObservable.remove(this._pickedPointObserver),this._pickedPointObserver=null))}}i.MODEL_BASE_URL="https://assets.babylonjs.com/meshes/MRTK/",i.MODEL_FILENAME="mrtk-fluent-button.glb"},"../../../dev/gui/dist/3D/controls/touchHolographicMenu.js":(C,v,n)=>{n.r(v),n.d(v,{TouchHolographicMenu:()=>g});var s=n("../../../dev/gui/dist/3D/controls/volumeBasedPanel.js"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/3D/materials/fluent/fluentMaterial.js");class g extends s.VolumeBasedPanel{get backPlateMargin(){return this._backPlateMargin}set backPlateMargin(e){this._backPlateMargin=e,this._children.length>=1&&(this.children.forEach(_=>{this._updateCurrentMinMax(_.position)}),this._updateMargins())}_createNode(e){const _=new r.Mesh(`menu_${this.name}`,e);return this._backPlate=(0,r.CreateBox)("backPlate"+this.name,{size:1},e),this._backPlate.parent=_,_}_affectMaterial(e){this._backPlateMaterial=new f.FluentMaterial(this.name+"backPlateMaterial",e.getScene()),this._backPlateMaterial.albedoColor=new r.Color3(.08,.15,.55),this._backPlateMaterial.renderBorders=!0,this._backPlateMaterial.renderHoverLight=!0,this._pickedPointObserver=this._host.onPickedPointChangedObservable.add(_=>{_?(this._backPlateMaterial.hoverPosition=_,this._backPlateMaterial.hoverColor.a=1):this._backPlateMaterial.hoverColor.a=0}),this._backPlate.material=this._backPlateMaterial}_mapGridNode(e,_){!e.mesh||(e.position=_.clone(),this._updateCurrentMinMax(_))}_finalProcessing(){this._updateMargins()}_updateCurrentMinMax(e){this._currentMin||(this._currentMin=e.clone(),this._currentMax=e.clone()),this._currentMin.minimizeInPlace(e),this._currentMax.maximizeInPlace(e)}_updateMargins(){if(this._children.length>0){this._currentMin.addInPlaceFromFloats(-this._cellWidth/2,-this._cellHeight/2,0),this._currentMax.addInPlaceFromFloats(this._cellWidth/2,this._cellHeight/2,0);const e=this._currentMax.subtract(this._currentMin);this._backPlate.scaling.x=e.x+this._cellWidth*this.backPlateMargin,this._backPlate.scaling.y=e.y+this._cellHeight*this.backPlateMargin,this._backPlate.scaling.z=.001;for(let _=0;_<this._children.length;_++)this._children[_].position.subtractInPlace(this._currentMin).subtractInPlace(e.scale(.5)),this._children[_].position.z-=.01}this._currentMin=null,this._currentMax=null}constructor(e){super(e);this._backPlateMargin=1.25}addButton(e){const _=this.blockLayout;return _||(this.blockLayout=!0),super.addControl(e),e.isBackplateVisible=!1,e.scaling.scaleInPlace(g.MENU_BUTTON_SCALE),_||(this.blockLayout=!1),this}addControl(e){return r.Logger.Warn("TouchHolographicMenu can only contain buttons. Please use the method `addButton` instead."),this}dispose(){super.dispose(),this._host.onPickedPointChangedObservable.remove(this._pickedPointObserver)}}g.MENU_BUTTON_SCALE=1},"../../../dev/gui/dist/3D/controls/touchMeshButton3D.js":(C,v,n)=>{n.r(v),n.d(v,{TouchMeshButton3D:()=>r});var s=n("../../../dev/gui/dist/3D/controls/touchButton3D.js");class r extends s.TouchButton3D{constructor(f,g){super(g,f);this._currentMesh=f,this.pointerEnterAnimation=()=>{!this.mesh||this.mesh.scaling.scaleInPlace(1.1)},this.pointerOutAnimation=()=>{!this.mesh||this.mesh.scaling.scaleInPlace(1/1.1)},this.pointerDownAnimation=()=>{!this.mesh||this.mesh.scaling.scaleInPlace(.95)},this.pointerUpAnimation=()=>{!this.mesh||this.mesh.scaling.scaleInPlace(1/.95)}}_getTypeName(){return"TouchMeshButton3D"}_createNode(){return this._currentMesh.getChildMeshes().forEach(f=>{this._injectGUI3DReservedDataStore(f).control=this}),this._currentMesh}_affectMaterial(f){}}},"../../../dev/gui/dist/3D/controls/volumeBasedPanel.js":(C,v,n)=>{n.r(v),n.d(v,{VolumeBasedPanel:()=>f});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/3D/controls/container3D.js");class f extends p.Container3D{get orientation(){return this._orientation}set orientation(d){this._orientation!==d&&(this._orientation=d,s.Tools.SetImmediate(()=>{this._arrangeChildren()}))}get columns(){return this._columns}set columns(d){this._columns!==d&&(this._columns=d,this._rowThenColum=!0,s.Tools.SetImmediate(()=>{this._arrangeChildren()}))}get rows(){return this._rows}set rows(d){this._rows!==d&&(this._rows=d,this._rowThenColum=!1,s.Tools.SetImmediate(()=>{this._arrangeChildren()}))}constructor(d){super(d);this._columns=10,this._rows=0,this._rowThenColum=!0,this._orientation=p.Container3D.FACEORIGIN_ORIENTATION,this.margin=0}_arrangeChildren(){this._cellWidth=0,this._cellHeight=0;let d=0,e=0,_=0;const t=s.Matrix.Invert(this.node.computeWorldMatrix(!0));for(const c of this._children){if(!c.mesh)continue;_++,c.mesh.computeWorldMatrix(!0);const h=c.mesh.getHierarchyBoundingVectors(),u=s.TmpVectors.Vector3[0],m=s.TmpVectors.Vector3[1];h.max.subtractToRef(h.min,m),m.scaleInPlace(.5),s.Vector3.TransformNormalToRef(m,t,u),this._cellWidth=Math.max(this._cellWidth,u.x*2),this._cellHeight=Math.max(this._cellHeight,u.y*2)}this._cellWidth+=this.margin*2,this._cellHeight+=this.margin*2,this._rowThenColum?(e=this._columns,d=Math.ceil(_/this._columns)):(d=this._rows,e=Math.ceil(_/this._rows));const i=e*.5*this._cellWidth,o=d*.5*this._cellHeight,a=[];let l=0;if(this._rowThenColum)for(let c=0;c<d;c++)for(let h=0;h<e&&(a.push(new s.Vector3(h*this._cellWidth-i+this._cellWidth/2,c*this._cellHeight-o+this._cellHeight/2,0)),l++,!(l>_));h++);else for(let c=0;c<e;c++)for(let h=0;h<d&&(a.push(new s.Vector3(c*this._cellWidth-i+this._cellWidth/2,h*this._cellHeight-o+this._cellHeight/2,0)),l++,!(l>_));h++);l=0;for(const c of this._children)!c.mesh||(this._mapGridNode(c,a[l]),l++);this._finalProcessing()}_finalProcessing(){}}},"../../../dev/gui/dist/3D/gizmos/gizmoHandle.js":(C,v,n)=>{n.r(v),n.d(v,{CornerHandle:()=>e,GizmoHandle:()=>g,HandleState:()=>f,SideHandle:()=>d});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/3D/materials/handle/handleMaterial.js"),f;(function(_){_[_.IDLE=0]="IDLE",_[_.HOVER=1]="HOVER",_[_.DRAG=2]="DRAG"})(f||(f={}));class g{get state(){return this._state}get gizmo(){return this._gizmo}set hover(t){t?this._state|=f.HOVER:this._state&=~f.HOVER,this._updateMaterial()}set drag(t){t?this._state|=f.DRAG:this._state&=~f.DRAG,this._updateMaterial()}constructor(t,i){this._state=f.IDLE,this._materials=[],this._scene=i,this._gizmo=t,this.node=this.createNode(),this.node.reservedDataStore={handle:this}}_createMaterial(t){const i=new p.HandleMaterial("handle",this._scene);return t&&(i._positionOffset=t),i}_updateMaterial(){const t=this._state;for(const i of this._materials)i.hover=!1,i.drag=!1;if(t&f.DRAG)for(const i of this._materials)i.drag=!0;else if(t&f.HOVER)for(const i of this._materials)i.hover=!0}setDragBehavior(t,i,o){const a=new s.BaseSixDofDragBehavior;this._dragBehavior=a,this._dragStartObserver=a.onDragStartObservable.add(t),this._draggingObserver=a.onDragObservable.add(i),this._dragEndObserver=a.onDragEndObservable.add(o),this._dragBehavior.attach(this.node)}dispose(){this._dragBehavior.onDragStartObservable.remove(this._dragStartObserver),this._dragBehavior.onDragObservable.remove(this._draggingObserver),this._dragBehavior.onDragEndObservable.remove(this._dragEndObserver),this._dragBehavior.detach();for(const t of this._materials)t.dispose();this.node.dispose()}}class d extends g{createNode(){const t=(0,s.CreateBox)("sideVert",{width:1,height:10,depth:.1},this._scene),i=new s.TransformNode("side",this._scene);t.parent=i;const o=this._createMaterial();return t.material=o,t.isNearGrabbable=!0,this._materials.push(o),i}}class e extends g{createNode(){const t=(0,s.CreateBox)("angleHor",{width:3,height:1,depth:.1},this._scene),i=(0,s.CreateBox)("angleVert",{width:1,height:3,depth:.1},this._scene),o=new s.TransformNode("angle",this._scene);return t.parent=o,i.parent=o,t.material=this._createMaterial(new s.Vector3(1,0,0)),i.material=this._createMaterial(new s.Vector3(0,1,0)),i.isNearGrabbable=!0,t.isNearGrabbable=!0,this._materials.push(t.material),this._materials.push(i.material),o}}},"../../../dev/gui/dist/3D/gizmos/index.js":(C,v,n)=>{n.r(v),n.d(v,{CornerHandle:()=>r.CornerHandle,GizmoHandle:()=>r.GizmoHandle,HandleState:()=>r.HandleState,SideHandle:()=>r.SideHandle,SlateGizmo:()=>s.SlateGizmo});var s=n("../../../dev/gui/dist/3D/gizmos/slateGizmo.js"),r=n("../../../dev/gui/dist/3D/gizmos/gizmoHandle.js")},"../../../dev/gui/dist/3D/gizmos/slateGizmo.js":(C,v,n)=>{n.r(v),n.d(v,{SlateGizmo:()=>f});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/3D/gizmos/gizmoHandle.js");class f extends s.Gizmo{set attachedSlate(d){d?(this.attachedMesh=d.mesh,this.updateBoundingBox(),this._pickedPointObserver=d._host.onPickingObservable.add(e=>{if(this._handleHovered&&(!e||e.parent!==this._handleHovered.node)&&(this._handleHovered.hover=!1,this._handleHovered=null),e&&e.parent&&e.parent.reservedDataStore&&e.parent.reservedDataStore.handle){const _=e.parent.reservedDataStore.handle;_.gizmo===this&&(this._handleHovered=_,this._handleHovered.hover=!0)}})):this._attachedSlate&&this._attachedSlate._host.onPickingObservable.remove(this._pickedPointObserver),this._attachedSlate=d}get attachedSlate(){return this._attachedSlate}constructor(d){super(d);this._boundingDimensions=new s.Vector3(0,0,0),this._renderObserver=null,this._tmpQuaternion=new s.Quaternion,this._tmpVector=new s.Vector3(0,0,0),this._corners=[],this._sides=[],this._boundingBoxGizmo={min:new s.Vector3,max:new s.Vector3},this._margin=.35,this._handleSize=.075,this._attachedSlate=null,this._existingSlateScale=new s.Vector3,this.fixedScreenSize=!1,this.fixedScreenSizeDistanceFactor=10,this._createNode(),this.updateScale=!1,this._renderObserver=this.gizmoLayer.originalScene.onBeforeRenderObservable.add(()=>{this.attachedMesh&&!this._existingSlateScale.equals(this.attachedMesh.scaling)&&this.updateBoundingBox()})}_createNode(){this._handlesParent=new s.TransformNode("handlesParent",this.gizmoLayer.utilityLayerScene),this._handlesParent.rotationQuaternion=s.Quaternion.Identity();const d=[{dimensions:new s.Vector3(-1,-1,0),origin:new s.Vector3(1,0,0)},{dimensions:new s.Vector3(1,-1,0),origin:new s.Vector3(0,0,0)},{dimensions:new s.Vector3(1,1,0),origin:new s.Vector3(0,1,0)},{dimensions:new s.Vector3(-1,1,0),origin:new s.Vector3(1,1,0)}];for(let e=0;e<4;e++){const _=new p.CornerHandle(this,this.gizmoLayer.utilityLayerScene);this._corners.push(_),_.node.rotation.z=Math.PI/2*e,_.node.parent=this._handlesParent,this._assignDragBehaviorCorners(_,(t,i,o,a)=>this._moveHandle(t,i,o,a,!0),d[e])}for(let e=0;e<4;e++){const _=new p.SideHandle(this,this.gizmoLayer.utilityLayerScene);this._sides.push(_),_.node.rotation.z=Math.PI/2*e,_.node.parent=this._handlesParent,this._assignDragBehaviorSides(_,e%2==0?new s.Vector3(0,1,0):new s.Vector3(1,0,0))}this._handlesParent.parent=this._rootMesh}_keepAspectRatio(d,e,_=!1){const t=s.TmpVectors.Vector3[0];t.copyFromFloats(e,1,0).normalize(),_&&(t.y*=-1);const i=s.Vector3.Dot(d,t);d.copyFrom(t).scaleInPlace(i)}_clampDimensions(d,e,_,t=!1){const i=s.TmpVectors.Vector3[0];i.copyFrom(d).multiplyInPlace(_);const o=s.TmpVectors.Vector3[1];if(o.copyFromFloats(Math.max(this._attachedSlate.minDimensions.x,i.x+e.x),Math.max(this._attachedSlate.minDimensions.y,i.y+e.y),0),t){const a=e.x/e.y;o.x=Math.max(o.x,o.y*a),o.y=Math.max(o.y,o.x/a)}i.copyFrom(o).subtractInPlace(e),d.x=Math.sign(d.x)*Math.abs(i.x),d.y=Math.sign(d.y)*Math.abs(i.y)}_moveHandle(d,e,_,t,i){if(!this._attachedSlate)return;if(i){const l=e.x/e.y;this._keepAspectRatio(_,l,t.dimensions.x*t.dimensions.y<0)}this._clampDimensions(_,e,t.dimensions,i);const o=s.TmpVectors.Vector3[0],a=s.TmpVectors.Vector3[1];o.copyFrom(_).multiplyInPlace(t.origin),a.copyFrom(_).multiplyInPlace(t.dimensions),this._attachedSlate.origin.copyFrom(d).addInPlace(o),this._attachedSlate.dimensions.set(e.x+a.x,e.y+a.y)}_assignDragBehaviorCorners(d,e,_){const t=new s.Vector3,i=new s.Vector3,o=new s.Vector3,a=new s.Matrix,l=new s.Vector3,c=(b,P,B,I)=>{b.subtractToRef(B,s.TmpVectors.Vector3[0]);const x=s.Vector3.Dot(s.TmpVectors.Vector3[0],P);s.TmpVectors.Vector3[1].copyFrom(P).scaleInPlace(x),s.TmpVectors.Vector3[0].subtractInPlace(s.TmpVectors.Vector3[1]),s.TmpVectors.Vector3[0].addToRef(B,I)},h=b=>{this.attachedSlate&&this.attachedMesh&&(t.set(this.attachedSlate.dimensions.x,this.attachedSlate.dimensions.y,s.Epsilon),i.copyFrom(this.attachedSlate.origin),o.copyFrom(b.position),a.copyFrom(this.attachedMesh.computeWorldMatrix(!0)),a.invert(),this.attachedSlate._followButton.isToggled=!1,s.Vector3.TransformNormalToRef(s.Vector3.Forward(),this.attachedMesh.getWorldMatrix(),l),l.normalize(),this._handleHovered&&(this._handleDragged=this._handleHovered,this._handleDragged.drag=!0))},u=b=>{this.attachedSlate&&this.attachedMesh&&(c(b.position,l,o,this._tmpVector),this._tmpVector.subtractInPlace(o),s.Vector3.TransformNormalToRef(this._tmpVector,a,this._tmpVector),e(i,t,this._tmpVector,_),this.attachedSlate._positionElements(),this.updateBoundingBox())},m=()=>{this.attachedSlate&&this.attachedNode&&(this.attachedSlate._updatePivot(),this._handleDragged&&(this._handleDragged.drag=!1,this._handleDragged=null))};d.setDragBehavior(h,u,m)}_assignDragBehaviorSides(d,e){const _=new s.Quaternion,t=new s.Vector3,i=new s.Vector3,o=new s.Vector3,a=new s.Vector3,l=u=>{this.attachedSlate&&this.attachedMesh&&(_.copyFrom(this.attachedMesh.rotationQuaternion),t.copyFrom(u.position),o.copyFrom(this.attachedMesh.getAbsolutePivotPoint()),i.copyFrom(t).subtractInPlace(o).normalize(),this.attachedSlate._followButton.isToggled=!1,s.Vector3.TransformNormalToRef(e,this.attachedMesh.getWorldMatrix(),a),a.normalize(),this._handleHovered&&(this._handleDragged=this._handleHovered,this._handleDragged.drag=!0))},c=u=>{if(this.attachedSlate&&this.attachedMesh){this._tmpVector.copyFrom(u.position),this._tmpVector.subtractInPlace(o),this._tmpVector.normalize();const m=-s.Vector3.GetAngleBetweenVectorsOnPlane(this._tmpVector,i,a);s.Quaternion.RotationAxisToRef(e,m,this._tmpQuaternion),_.multiplyToRef(this._tmpQuaternion,this.attachedMesh.rotationQuaternion)}},h=()=>{this.attachedSlate&&this.attachedNode&&(this.attachedSlate._updatePivot(),this._handleDragged&&(this._handleDragged.drag=!1,this._handleDragged=null))};d.setDragBehavior(l,c,h)}_attachedNodeChanged(d){d&&this.updateBoundingBox()}updateBoundingBox(){if(this.attachedMesh){s.PivotTools._RemoveAndStorePivotPoint(this.attachedMesh);const d=this.attachedMesh.parent;this.attachedMesh.setParent(null),this._update(),this.attachedMesh.rotationQuaternion||(this.attachedMesh.rotationQuaternion=s.Quaternion.RotationYawPitchRoll(this.attachedMesh.rotation.y,this.attachedMesh.rotation.x,this.attachedMesh.rotation.z)),this._tmpQuaternion.copyFrom(this.attachedMesh.rotationQuaternion),this._tmpVector.copyFrom(this.attachedMesh.position),this.attachedMesh.rotationQuaternion.set(0,0,0,1),this.attachedMesh.position.set(0,0,0);const e=this.attachedMesh.getHierarchyBoundingVectors();e.max.subtractToRef(e.min,this._boundingDimensions),this._boundingBoxGizmo.min=e.min,this._boundingBoxGizmo.max=e.max,this._updateHandlesPosition(),this._updateHandlesScaling(),this.attachedMesh.rotationQuaternion.copyFrom(this._tmpQuaternion),this.attachedMesh.position.copyFrom(this._tmpVector),s.PivotTools._RestorePivotPoint(this.attachedMesh),this.attachedMesh.setParent(d),this.attachedMesh.computeWorldMatrix(!0),this._existingSlateScale.copyFrom(this.attachedMesh.scaling)}}_updateHandlesPosition(){const d=this._boundingBoxGizmo.min.clone(),e=this._boundingBoxGizmo.max.clone(),_=this._corners[0].node.scaling.length();d.x-=this._margin*_,d.y-=this._margin*_,e.x+=this._margin*_,e.y+=this._margin*_;const t=d.add(e).scaleInPlace(.5);this._corners[0].node.position.copyFromFloats(d.x,d.y,0),this._corners[1].node.position.copyFromFloats(e.x,d.y,0),this._corners[2].node.position.copyFromFloats(e.x,e.y,0),this._corners[3].node.position.copyFromFloats(d.x,e.y,0),this._sides[0].node.position.copyFromFloats(d.x,t.y,0),this._sides[1].node.position.copyFromFloats(t.x,d.y,0),this._sides[2].node.position.copyFromFloats(e.x,t.y,0),this._sides[3].node.position.copyFromFloats(t.x,e.y,0)}_updateHandlesScaling(){if(this._attachedSlate&&this._attachedSlate.mesh){const d=this._attachedSlate.mesh.scaling.x*this._attachedSlate.dimensions.x,e=this._attachedSlate.mesh.scaling.y*this._attachedSlate.dimensions.y,_=Math.min(d,e)*this._handleSize;for(let t=0;t<this._corners.length;t++)this._corners[t].node.scaling.setAll(_);for(let t=0;t<this._sides.length;t++)this._sides[t].node.scaling.setAll(_)}}_update(){if(super._update(),!!this.gizmoLayer.utilityLayerScene.activeCamera&&this._attachedSlate&&this._attachedSlate.mesh){if(this.fixedScreenSize){this._attachedSlate.mesh.absolutePosition.subtractToRef(this.gizmoLayer.utilityLayerScene.activeCamera.position,this._tmpVector);const d=this._handleSize*this._tmpVector.length()/this.fixedScreenSizeDistanceFactor;for(let e=0;e<this._corners.length;e++)this._corners[e].node.scaling.set(d,d,d);for(let e=0;e<this._sides.length;e++)this._sides[e].node.scaling.set(d,d,d)}this._updateHandlesPosition()}}dispose(){this.gizmoLayer.originalScene.onBeforeRenderObservable.remove(this._renderObserver),super.dispose();for(const d of this._corners)d.dispose();for(const d of this._sides)d.dispose()}}},"../../../dev/gui/dist/3D/gui3DManager.js":(C,v,n)=>{n.r(v),n.d(v,{GUI3DManager:()=>f});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/3D/controls/container3D.js");class f{get scene(){return this._scene}get utilityLayer(){return this._utilityLayer}get controlScaling(){return this._customControlScaling}set controlScaling(d){if(this._customControlScaling!==d&&d>0){const e=d/this._customControlScaling;this._customControlScaling=d,this._rootContainer.children.forEach(_=>{_.scaling.scaleInPlace(e),d!==1&&(_._isScaledByManager=!0)})}}get useRealisticScaling(){return this.controlScaling===f.MRTK_REALISTIC_SCALING}set useRealisticScaling(d){this.controlScaling=d?f.MRTK_REALISTIC_SCALING:1}constructor(d){this._customControlScaling=1,this._lastControlOver={},this._lastControlDown={},this.onPickedPointChangedObservable=new s.Observable,this.onPickingObservable=new s.Observable,this._sharedMaterials={},this._touchSharedMaterials={},this._scene=d||s.EngineStore.LastCreatedScene,this._sceneDisposeObserver=this._scene.onDisposeObservable.add(()=>{this._sceneDisposeObserver=null,this._utilityLayer=null,this.dispose()}),this._utilityLayer=s.UtilityLayerRenderer._CreateDefaultUtilityLayerFromScene(this._scene),this._utilityLayer.onlyCheckPointerDownEvents=!1,this._utilityLayer.pickUtilitySceneFirst=!1,this._utilityLayer.mainSceneTrackerPredicate=_=>{var t,i,o;return _&&((o=(i=(t=_.reservedDataStore)==null?void 0:t.GUI3D)==null?void 0:i.control)==null?void 0:o._node)},this._rootContainer=new p.Container3D("RootContainer"),this._rootContainer._host=this;const e=this._utilityLayer.utilityLayerScene;this._pointerOutObserver=this._utilityLayer.onPointerOutObservable.add(_=>{this._handlePointerOut(_,!0)}),this._pointerObserver=e.onPointerObservable.add(_=>{this._doPicking(_)}),this._utilityLayer.utilityLayerScene.autoClear=!1,this._utilityLayer.utilityLayerScene.autoClearDepthAndStencil=!1,new s.HemisphericLight("hemi",s.Vector3.Up(),this._utilityLayer.utilityLayerScene)}_handlePointerOut(d,e){const _=this._lastControlOver[d];_&&(_._onPointerOut(_),delete this._lastControlOver[d]),e&&this._lastControlDown[d]&&(this._lastControlDown[d].forcePointerUp(),delete this._lastControlDown[d]),this.onPickedPointChangedObservable.notifyObservers(null)}_doPicking(d){var a,l,c;if(!this._utilityLayer||!this._utilityLayer.shouldRender||!this._utilityLayer.utilityLayerScene.activeCamera)return!1;const e=d.event,_=e.pointerId||0,t=e.button,i=d.pickInfo;if(i&&this.onPickingObservable.notifyObservers(i.pickedMesh),!i||!i.hit)return this._handlePointerOut(_,d.type===s.PointerEventTypes.POINTERUP),!1;i.pickedPoint&&this.onPickedPointChangedObservable.notifyObservers(i.pickedPoint);const o=(l=(a=i.pickedMesh.reservedDataStore)==null?void 0:a.GUI3D)==null?void 0:l.control;return!!o&&!o._processObservables(d.type,i.pickedPoint,((c=i.originMesh)==null?void 0:c.position)||null,_,t)&&d.type===s.PointerEventTypes.POINTERMOVE&&(this._lastControlOver[_]&&this._lastControlOver[_]._onPointerOut(this._lastControlOver[_]),delete this._lastControlOver[_]),d.type===s.PointerEventTypes.POINTERUP&&(this._lastControlDown[e.pointerId]&&(this._lastControlDown[e.pointerId].forcePointerUp(),delete this._lastControlDown[e.pointerId]),(e.pointerType==="touch"||e.pointerType==="xr"&&this._scene.getEngine().hostInformation.isMobile)&&this._handlePointerOut(_,!1)),!0}get rootContainer(){return this._rootContainer}containsControl(d){return this._rootContainer.containsControl(d)}addControl(d){return this._rootContainer.addControl(d),this._customControlScaling!==1&&(d.scaling.scaleInPlace(this._customControlScaling),d._isScaledByManager=!0),this}removeControl(d){return this._rootContainer.removeControl(d),d._isScaledByManager&&(d.scaling.scaleInPlace(1/this._customControlScaling),d._isScaledByManager=!1),this}dispose(){this._rootContainer.dispose();for(const e in this._sharedMaterials)!Object.prototype.hasOwnProperty.call(this._sharedMaterials,e)||this._sharedMaterials[e].dispose();this._sharedMaterials={};for(const e in this._touchSharedMaterials)!Object.prototype.hasOwnProperty.call(this._touchSharedMaterials,e)||this._touchSharedMaterials[e].dispose();this._touchSharedMaterials={},this._pointerOutObserver&&this._utilityLayer&&(this._utilityLayer.onPointerOutObservable.remove(this._pointerOutObserver),this._pointerOutObserver=null),this.onPickedPointChangedObservable.clear(),this.onPickingObservable.clear();const d=this._utilityLayer?this._utilityLayer.utilityLayerScene:null;d&&this._pointerObserver&&(d.onPointerObservable.remove(this._pointerObserver),this._pointerObserver=null),this._scene&&this._sceneDisposeObserver&&(this._scene.onDisposeObservable.remove(this._sceneDisposeObserver),this._sceneDisposeObserver=null),this._utilityLayer&&this._utilityLayer.dispose()}}f.MRTK_REALISTIC_SCALING=.032},"../../../dev/gui/dist/3D/index.js":(C,v,n)=>{n.r(v),n.d(v,{AbstractButton3D:()=>s.AbstractButton3D,Button3D:()=>s.Button3D,Container3D:()=>s.Container3D,Control3D:()=>s.Control3D,CornerHandle:()=>p.CornerHandle,CylinderPanel:()=>s.CylinderPanel,FluentBackplateMaterial:()=>r.FluentBackplateMaterial,FluentButtonMaterial:()=>r.FluentButtonMaterial,FluentMaterial:()=>r.FluentMaterial,FluentMaterialDefines:()=>r.FluentMaterialDefines,GUI3DManager:()=>f.GUI3DManager,GizmoHandle:()=>p.GizmoHandle,HandMenu:()=>s.HandMenu,HandleMaterial:()=>r.HandleMaterial,HandleState:()=>p.HandleState,HolographicBackplate:()=>s.HolographicBackplate,HolographicButton:()=>s.HolographicButton,HolographicSlate:()=>s.HolographicSlate,MRDLBackplateMaterial:()=>r.MRDLBackplateMaterial,MRDLSliderBarMaterial:()=>r.MRDLSliderBarMaterial,MRDLSliderThumbMaterial:()=>r.MRDLSliderThumbMaterial,MeshButton3D:()=>s.MeshButton3D,NearMenu:()=>s.NearMenu,PlanePanel:()=>s.PlanePanel,ScatterPanel:()=>s.ScatterPanel,SideHandle:()=>p.SideHandle,SlateGizmo:()=>p.SlateGizmo,Slider3D:()=>s.Slider3D,SpherePanel:()=>s.SpherePanel,StackPanel3D:()=>s.StackPanel3D,TouchButton3D:()=>s.TouchButton3D,TouchHolographicButton:()=>s.TouchHolographicButton,TouchHolographicButtonV3:()=>s.TouchHolographicButtonV3,TouchHolographicMenu:()=>s.TouchHolographicMenu,TouchMeshButton3D:()=>s.TouchMeshButton3D,Vector3WithInfo:()=>g.Vector3WithInfo,VolumeBasedPanel:()=>s.VolumeBasedPanel});var s=n("../../../dev/gui/dist/3D/controls/index.js"),r=n("../../../dev/gui/dist/3D/materials/index.js"),p=n("../../../dev/gui/dist/3D/gizmos/index.js"),f=n("../../../dev/gui/dist/3D/gui3DManager.js"),g=n("../../../dev/gui/dist/3D/vector3WithInfo.js")},"../../../dev/gui/dist/3D/materials/fluent/fluentMaterial.js":(C,v,n)=>{n.r(v),n.d(v,{FluentMaterial:()=>e,FluentMaterialDefines:()=>d});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/3D/materials/fluent/shaders/fluent.vertex.js"),g=n("../../../dev/gui/dist/3D/materials/fluent/shaders/fluent.fragment.js");class d extends r.MaterialDefines{constructor(){super();this.INNERGLOW=!1,this.BORDER=!1,this.HOVERLIGHT=!1,this.TEXTURE=!1,this.rebuild()}}class e extends r.PushMaterial{constructor(t,i){super(t,i);this.innerGlowColorIntensity=.5,this.innerGlowColor=new r.Color3(1,1,1),this.albedoColor=new r.Color3(.3,.35,.4),this.renderBorders=!1,this.borderWidth=.5,this.edgeSmoothingValue=.02,this.borderMinValue=.1,this.renderHoverLight=!1,this.hoverRadius=.01,this.hoverColor=new r.Color4(.3,.3,.3,1),this.hoverPosition=r.Vector3.Zero()}needAlphaBlending(){return this.alpha!==1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(t,i){if(this.isFrozen&&i.effect&&i.effect._wasPreviouslyReady)return!0;i.materialDefines||(i.materialDefines=new d);const o=this.getScene(),a=i.materialDefines;if(!this.checkReadyOnEveryCall&&i.effect&&a._renderId===o.getRenderId())return!0;if(a._areTexturesDirty)if(a.INNERGLOW=this.innerGlowColorIntensity>0,a.BORDER=this.renderBorders,a.HOVERLIGHT=this.renderHoverLight,this._albedoTexture)if(this._albedoTexture.isReadyOrNotBlocking())a.TEXTURE=!0;else return!1;else a.TEXTURE=!1;const l=o.getEngine();if(a.isDirty){a.markAsProcessed(),o.resetCachedMaterial();const c=[r.VertexBuffer.PositionKind];c.push(r.VertexBuffer.NormalKind),c.push(r.VertexBuffer.UVKind);const h="fluent",u=["world","viewProjection","innerGlowColor","albedoColor","borderWidth","edgeSmoothingValue","scaleFactor","borderMinValue","hoverColor","hoverPosition","hoverRadius","textureMatrix"],m=["albedoSampler"],b=new Array;r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:u,uniformBuffersNames:b,samplers:m,defines:a,maxSimultaneousLights:4});const P=a.toString();i.setEffect(o.getEngine().createEffect(h,{attributes:c,uniformsNames:u,uniformBuffersNames:b,samplers:m,defines:P,fallbacks:null,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},l),a,this._materialContext)}return!i.effect||!i.effect.isReady()?!1:(a._renderId=o.getRenderId(),i.effect._wasPreviouslyReady=!0,!0)}bindForSubMesh(t,i,o){const a=this.getScene(),l=o.materialDefines;if(!l)return;const c=o.effect;if(!!c){if(this._activeEffect=c,this.bindOnlyWorldMatrix(t),this._activeEffect.setMatrix("viewProjection",a.getTransformMatrix()),this._mustRebind(a,c)&&(this._activeEffect.setColor4("albedoColor",this.albedoColor,this.alpha),l.INNERGLOW&&this._activeEffect.setColor4("innerGlowColor",this.innerGlowColor,this.innerGlowColorIntensity),l.BORDER&&(this._activeEffect.setFloat("borderWidth",this.borderWidth),this._activeEffect.setFloat("edgeSmoothingValue",this.edgeSmoothingValue),this._activeEffect.setFloat("borderMinValue",this.borderMinValue),i.getBoundingInfo().boundingBox.extendSize.multiplyToRef(i.scaling,r.TmpVectors.Vector3[0]),this._activeEffect.setVector3("scaleFactor",r.TmpVectors.Vector3[0])),l.HOVERLIGHT&&(this._activeEffect.setDirectColor4("hoverColor",this.hoverColor),this._activeEffect.setFloat("hoverRadius",this.hoverRadius),this._activeEffect.setVector3("hoverPosition",this.hoverPosition)),l.TEXTURE&&this._albedoTexture)){this._activeEffect.setTexture("albedoSampler",this._albedoTexture);const h=this._albedoTexture.getTextureMatrix();this._activeEffect.setMatrix("textureMatrix",h)}this._afterBind(i,this._activeEffect)}}getActiveTextures(){return super.getActiveTextures()}hasTexture(t){return!!super.hasTexture(t)}dispose(t){super.dispose(t)}clone(t){return r.SerializationHelper.Clone(()=>new e(t,this.getScene()),this)}serialize(){const t=super.serialize();return t.customType="BABYLON.GUI.FluentMaterial",t}getClassName(){return"FluentMaterial"}static Parse(t,i,o){return r.SerializationHelper.Parse(()=>new e(t.name,i),t,i,o)}}(0,s.__decorate)([(0,r.serialize)(),(0,r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],e.prototype,"innerGlowColorIntensity",void 0),(0,s.__decorate)([(0,r.serializeAsColor3)()],e.prototype,"innerGlowColor",void 0),(0,s.__decorate)([(0,r.serializeAsColor3)()],e.prototype,"albedoColor",void 0),(0,s.__decorate)([(0,r.serialize)(),(0,r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],e.prototype,"renderBorders",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"borderWidth",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"edgeSmoothingValue",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"borderMinValue",void 0),(0,s.__decorate)([(0,r.serialize)(),(0,r.expandToProperty)("_markAllSubMeshesAsTexturesDirty")],e.prototype,"renderHoverLight",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"hoverRadius",void 0),(0,s.__decorate)([(0,r.serializeAsColor4)()],e.prototype,"hoverColor",void 0),(0,s.__decorate)([(0,r.serializeAsVector3)()],e.prototype,"hoverPosition",void 0),(0,s.__decorate)([(0,r.serializeAsTexture)("albedoTexture")],e.prototype,"_albedoTexture",void 0),(0,s.__decorate)([(0,r.expandToProperty)("_markAllSubMeshesAsTexturesAndMiscDirty")],e.prototype,"albedoTexture",void 0),(0,r.RegisterClass)("BABYLON.GUI.FluentMaterial",e)},"../../../dev/gui/dist/3D/materials/fluent/index.js":(C,v,n)=>{n.r(v),n.d(v,{FluentMaterial:()=>s.FluentMaterial,FluentMaterialDefines:()=>s.FluentMaterialDefines});var s=n("../../../dev/gui/dist/3D/materials/fluent/fluentMaterial.js")},"../../../dev/gui/dist/3D/materials/fluent/shaders/fluent.fragment.js":(C,v,n)=>{n.r(v),n.d(v,{fluentPixelShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="fluentPixelShader",f=`precision highp float;
varying vec2 vUV;
uniform vec4 albedoColor;
#ifdef INNERGLOW
uniform vec4 innerGlowColor;
#endif
#ifdef BORDER
varying vec2 scaleInfo;
uniform float edgeSmoothingValue;
uniform float borderMinValue;
#endif
#ifdef HOVERLIGHT
varying vec3 worldPosition;
uniform vec3 hoverPosition;
uniform vec4 hoverColor;
uniform float hoverRadius;
#endif
#ifdef TEXTURE
uniform sampler2D albedoSampler;
uniform mat4 textureMatrix;
vec2 finalUV;
#endif
void main(void) {
vec3 albedo=albedoColor.rgb;
float alpha=albedoColor.a;
#ifdef TEXTURE
finalUV=vec2(textureMatrix*vec4(vUV,1.0,0.0));
albedo=texture2D(albedoSampler,finalUV).rgb;
#endif
#ifdef HOVERLIGHT
float pointToHover=(1.0-clamp(length(hoverPosition-worldPosition)/hoverRadius,0.,1.))*hoverColor.a;
albedo=clamp(albedo+hoverColor.rgb*pointToHover,0.,1.);
#else
float pointToHover=1.0;
#endif
#ifdef BORDER 
float borderPower=10.0;
float inverseBorderPower=1.0/borderPower;
vec3 borderColor=albedo*borderPower;
vec2 distanceToEdge;
distanceToEdge.x=abs(vUV.x-0.5)*2.0;
distanceToEdge.y=abs(vUV.y-0.5)*2.0;
float borderValue=max(smoothstep(scaleInfo.x-edgeSmoothingValue,scaleInfo.x+edgeSmoothingValue,distanceToEdge.x),
smoothstep(scaleInfo.y-edgeSmoothingValue,scaleInfo.y+edgeSmoothingValue,distanceToEdge.y));
borderColor=borderColor*borderValue*max(borderMinValue*inverseBorderPower,pointToHover); 
albedo+=borderColor;
alpha=max(alpha,borderValue);
#endif
#ifdef INNERGLOW
vec2 uvGlow=(vUV-vec2(0.5,0.5))*(innerGlowColor.a*2.0);
uvGlow=uvGlow*uvGlow;
uvGlow=uvGlow*uvGlow;
albedo+=mix(vec3(0.0,0.0,0.0),innerGlowColor.rgb,uvGlow.x+uvGlow.y); 
#endif
gl_FragColor=vec4(albedo,alpha);
}`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/materials/fluent/shaders/fluent.vertex.js":(C,v,n)=>{n.r(v),n.d(v,{fluentVertexShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="fluentVertexShader",f=`precision highp float;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
uniform mat4 world;
uniform mat4 viewProjection;
varying vec2 vUV;
#ifdef BORDER
varying vec2 scaleInfo;
uniform float borderWidth;
uniform vec3 scaleFactor;
#endif
#ifdef HOVERLIGHT
varying vec3 worldPosition;
#endif
void main(void) {
vUV=uv;
#ifdef BORDER
vec3 scale=scaleFactor;
float minScale=min(min(scale.x,scale.y),scale.z);
float maxScale=max(max(scale.x,scale.y),scale.z);
float minOverMiddleScale=minScale/(scale.x+scale.y+scale.z-minScale-maxScale);
float areaYZ=scale.y*scale.z;
float areaXZ=scale.x*scale.z;
float areaXY=scale.x*scale.y;
float scaledBorderWidth=borderWidth; 
if (abs(normal.x)==1.0) 
{
scale.x=scale.y;
scale.y=scale.z;
if (areaYZ>areaXZ && areaYZ>areaXY)
{
scaledBorderWidth*=minOverMiddleScale;
}
}
else if (abs(normal.y)==1.0) 
{
scale.x=scale.z;
if (areaXZ>areaXY && areaXZ>areaYZ)
{
scaledBorderWidth*=minOverMiddleScale;
}
}
else 
{
if (areaXY>areaYZ && areaXY>areaXZ)
{
scaledBorderWidth*=minOverMiddleScale;
}
}
float scaleRatio=min(scale.x,scale.y)/max(scale.x,scale.y);
if (scale.x>scale.y)
{
scaleInfo.x=1.0-(scaledBorderWidth*scaleRatio);
scaleInfo.y=1.0-scaledBorderWidth;
}
else
{
scaleInfo.x=1.0-scaledBorderWidth;
scaleInfo.y=1.0-(scaledBorderWidth*scaleRatio);
} 
#endif 
vec4 worldPos=world*vec4(position,1.0);
#ifdef HOVERLIGHT
worldPosition=worldPos.xyz;
#endif
gl_Position=viewProjection*worldPos;
}
`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/materials/fluentBackplate/fluentBackplateMaterial.js":(C,v,n)=>{n.r(v),n.d(v,{FluentBackplateMaterial:()=>e});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/3D/materials/fluentBackplate/shaders/fluentBackplate.fragment.js"),g=n("../../../dev/gui/dist/3D/materials/fluentBackplate/shaders/fluentBackplate.vertex.js");class d extends r.MaterialDefines{constructor(){super();this.BLOB_ENABLE=!0,this.BLOB_ENABLE_2=!0,this.SMOOTH_EDGES=!0,this.IRIDESCENT_MAP_ENABLE=!0,this._needNormals=!0,this.rebuild()}}class e extends r.PushMaterial{constructor(t,i){super(t,i);this.radius=.03,this.lineWidth=.01,this.absoluteSizes=!1,this._filterWidth=1,this.baseColor=new r.Color4(.0392157,.0666667,.207843,1),this.lineColor=new r.Color4(.14902,.133333,.384314,1),this.blobIntensity=.98,this.blobFarSize=.04,this.blobNearDistance=0,this.blobFarDistance=.08,this.blobFadeLength=.08,this.blobNearSize=.22,this.blobPulse=0,this.blobFade=0,this.blobNearSize2=.22,this.blobPulse2=0,this.blobFade2=0,this._rate=.135,this.highlightColor=new r.Color4(.98,.98,.98,1),this.highlightWidth=.25,this._highlightTransform=new r.Vector4(1,1,0,0),this._highlight=1,this.iridescenceIntensity=0,this.iridescenceEdgeIntensity=1,this._angle=-45,this.fadeOut=1,this._reflected=!0,this._frequency=1,this._verticalOffset=0,this.globalLeftIndexTipPosition=r.Vector3.Zero(),this._globalLeftIndexTipPosition4=r.Vector4.Zero(),this.globalRightIndexTipPosition=r.Vector3.Zero(),this._globalRightIndexTipPosition4=r.Vector4.Zero(),this.alphaMode=r.Constants.ALPHA_DISABLE,this.backFaceCulling=!1,this._blobTexture=new r.Texture(e.BLOB_TEXTURE_URL,this.getScene(),!0,!1,r.Texture.NEAREST_SAMPLINGMODE),this._iridescentMap=new r.Texture(e.IM_TEXTURE_URL,this.getScene(),!0,!1,r.Texture.NEAREST_SAMPLINGMODE)}needAlphaBlending(){return!1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(t,i){if(this.isFrozen&&i.effect&&i.effect._wasPreviouslyReady)return!0;i.materialDefines||(i.materialDefines=new d);const o=i.materialDefines,a=this.getScene();if(this._isReadyForSubMesh(i))return!0;const l=a.getEngine();if(r.MaterialHelper.PrepareDefinesForAttributes(t,o,!1,!1),o.isDirty){o.markAsProcessed(),a.resetCachedMaterial();const c=new r.EffectFallbacks;o.FOG&&c.addFallback(1,"FOG"),r.MaterialHelper.HandleFallbacksForShadows(o,c),o.IMAGEPROCESSINGPOSTPROCESS=a.imageProcessingConfiguration.applyByPostProcess;const h=[r.VertexBuffer.PositionKind];o.NORMAL&&h.push(r.VertexBuffer.NormalKind),o.UV1&&h.push(r.VertexBuffer.UVKind),o.UV2&&h.push(r.VertexBuffer.UV2Kind),o.VERTEXCOLOR&&h.push(r.VertexBuffer.ColorKind),o.TANGENT&&h.push(r.VertexBuffer.TangentKind),r.MaterialHelper.PrepareAttributesForInstances(h,o);const u="fluentBackplate",m=o.toString(),b=["world","viewProjection","cameraPosition","_Radius_","_Line_Width_","_Absolute_Sizes_","_Filter_Width_","_Base_Color_","_Line_Color_","_Radius_Top_Left_","_Radius_Top_Right_","_Radius_Bottom_Left_","_Radius_Bottom_Right_","_Blob_Position_","_Blob_Intensity_","_Blob_Near_Size_","_Blob_Far_Size_","_Blob_Near_Distance_","_Blob_Far_Distance_","_Blob_Fade_Length_","_Blob_Pulse_","_Blob_Fade_","_Blob_Texture_","_Blob_Position_2_","_Blob_Near_Size_2_","_Blob_Pulse_2_","_Blob_Fade_2_","_Rate_","_Highlight_Color_","_Highlight_Width_","_Highlight_Transform_","_Highlight_","_Iridescence_Intensity_","_Iridescence_Edge_Intensity_","_Angle_","_Fade_Out_","_Reflected_","_Frequency_","_Vertical_Offset_","_Iridescent_Map_","_Use_Global_Left_Index_","_Use_Global_Right_Index_","Global_Left_Index_Tip_Position","Global_Right_Index_Tip_Position"],P=["_Blob_Texture_","_Iridescent_Map_"],B=new Array;r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:b,uniformBuffersNames:B,samplers:P,defines:o,maxSimultaneousLights:4}),i.setEffect(a.getEngine().createEffect(u,{attributes:h,uniformsNames:b,uniformBuffersNames:B,samplers:P,defines:m,fallbacks:c,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},l),o,this._materialContext)}return!i.effect||!i.effect.isReady()?!1:(o._renderId=a.getRenderId(),i.effect._wasPreviouslyReady=!0,!0)}bindForSubMesh(t,i,o){var c,h;if(!o.materialDefines)return;const l=o.effect;!l||(this._activeEffect=l,this.bindOnlyWorldMatrix(t),this._activeEffect.setMatrix("viewProjection",this.getScene().getTransformMatrix()),this._activeEffect.setVector3("cameraPosition",(h=(c=this.getScene().activeCamera)==null?void 0:c.position)!=null?h:r.Vector3.ZeroReadOnly),this._activeEffect.setFloat("_Radius_",this.radius),this._activeEffect.setFloat("_Line_Width_",this.lineWidth),this._activeEffect.setFloat("_Absolute_Sizes_",this.absoluteSizes?1:0),this._activeEffect.setFloat("_Filter_Width_",this._filterWidth),this._activeEffect.setDirectColor4("_Base_Color_",this.baseColor),this._activeEffect.setDirectColor4("_Line_Color_",this.lineColor),this._activeEffect.setFloat("_Radius_Top_Left_",1),this._activeEffect.setFloat("_Radius_Top_Right_",1),this._activeEffect.setFloat("_Radius_Bottom_Left_",1),this._activeEffect.setFloat("_Radius_Bottom_Right_",1),this._activeEffect.setFloat("_Blob_Intensity_",this.blobIntensity),this._activeEffect.setFloat("_Blob_Near_Size_",this.blobNearSize),this._activeEffect.setFloat("_Blob_Far_Size_",this.blobFarSize),this._activeEffect.setFloat("_Blob_Near_Distance_",this.blobNearDistance),this._activeEffect.setFloat("_Blob_Far_Distance_",this.blobFarDistance),this._activeEffect.setFloat("_Blob_Fade_Length_",this.blobFadeLength),this._activeEffect.setFloat("_Blob_Pulse_",this.blobPulse),this._activeEffect.setFloat("_Blob_Fade_",this.blobFade),this._activeEffect.setTexture("_Blob_Texture_",this._blobTexture),this._activeEffect.setFloat("_Blob_Near_Size_2_",this.blobNearSize2),this._activeEffect.setFloat("_Blob_Pulse_2_",this.blobPulse2),this._activeEffect.setFloat("_Blob_Fade_2_",this.blobFade2),this._activeEffect.setFloat("_Rate_",this._rate),this._activeEffect.setDirectColor4("_Highlight_Color_",this.highlightColor),this._activeEffect.setFloat("_Highlight_Width_",this.highlightWidth),this._activeEffect.setVector4("_Highlight_Transform_",this._highlightTransform),this._activeEffect.setFloat("_Highlight_",this._highlight),this._activeEffect.setFloat("_Iridescence_Intensity_",this.iridescenceIntensity),this._activeEffect.setFloat("_Iridescence_Edge_Intensity_",this.iridescenceEdgeIntensity),this._activeEffect.setFloat("_Angle_",this._angle),this._activeEffect.setFloat("_Fade_Out_",this.fadeOut),this._activeEffect.setFloat("_Reflected_",this._reflected?1:0),this._activeEffect.setFloat("_Frequency_",this._frequency),this._activeEffect.setFloat("_Vertical_Offset_",this._verticalOffset),this._activeEffect.setTexture("_Iridescent_Map_",this._iridescentMap),this._activeEffect.setFloat("_Use_Global_Left_Index_",1),this._activeEffect.setFloat("_Use_Global_Right_Index_",1),this._globalLeftIndexTipPosition4.set(this.globalLeftIndexTipPosition.x,this.globalLeftIndexTipPosition.y,this.globalLeftIndexTipPosition.z,1),this._activeEffect.setVector4("Global_Left_Index_Tip_Position",this._globalLeftIndexTipPosition4),this._globalRightIndexTipPosition4.set(this.globalRightIndexTipPosition.x,this.globalRightIndexTipPosition.y,this.globalRightIndexTipPosition.z,1),this._activeEffect.setVector4("Global_Right_Index_Tip_Position",this._globalRightIndexTipPosition4),this._afterBind(i,this._activeEffect))}getAnimatables(){return[]}dispose(t){super.dispose(t),this._blobTexture.dispose(),this._iridescentMap.dispose()}clone(t){return r.SerializationHelper.Clone(()=>new e(t,this.getScene()),this)}serialize(){const t=super.serialize();return t.customType="BABYLON.FluentBackplateMaterial",t}getClassName(){return"FluentBackplateMaterial"}static Parse(t,i,o){return r.SerializationHelper.Parse(()=>new e(t.name,i),t,i,o)}}e.BLOB_TEXTURE_URL="https://assets.babylonjs.com/meshes/MRTK/mrtk-fluent-backplate-blob.png",e.IM_TEXTURE_URL="https://assets.babylonjs.com/meshes/MRTK/mrtk-fluent-backplate-iridescence.png",(0,s.__decorate)([(0,r.serialize)()],e.prototype,"radius",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"lineWidth",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"absoluteSizes",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"baseColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"lineColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobIntensity",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFarSize",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobNearDistance",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFarDistance",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFadeLength",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobNearSize",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobPulse",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFade",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobNearSize2",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobPulse2",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFade2",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"highlightColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"highlightWidth",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"iridescenceIntensity",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"iridescenceEdgeIntensity",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"fadeOut",void 0),(0,s.__decorate)([(0,r.serializeAsVector3)()],e.prototype,"globalLeftIndexTipPosition",void 0),(0,s.__decorate)([(0,r.serializeAsVector3)()],e.prototype,"globalRightIndexTipPosition",void 0),(0,r.RegisterClass)("BABYLON.GUI.FluentBackplateMaterial",e)},"../../../dev/gui/dist/3D/materials/fluentBackplate/index.js":(C,v,n)=>{n.r(v),n.d(v,{FluentBackplateMaterial:()=>s.FluentBackplateMaterial});var s=n("../../../dev/gui/dist/3D/materials/fluentBackplate/fluentBackplateMaterial.js")},"../../../dev/gui/dist/3D/materials/fluentBackplate/shaders/fluentBackplate.fragment.js":(C,v,n)=>{n.r(v),n.d(v,{fluentBackplatePixelShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="fluentBackplatePixelShader",f=`uniform vec3 cameraPosition;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vColor;
varying vec4 vExtra1;
varying vec4 vExtra2;
varying vec4 vExtra3;
uniform float _Radius_;
uniform float _Line_Width_;
uniform bool _Absolute_Sizes_;
uniform float _Filter_Width_;
uniform vec4 _Base_Color_;
uniform vec4 _Line_Color_;
uniform float _Radius_Top_Left_;
uniform float _Radius_Top_Right_;
uniform float _Radius_Bottom_Left_;
uniform float _Radius_Bottom_Right_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform sampler2D _Blob_Texture_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform float _Rate_;
uniform vec4 _Highlight_Color_;
uniform float _Highlight_Width_;
uniform vec4 _Highlight_Transform_;
uniform float _Highlight_;
uniform float _Iridescence_Intensity_;
uniform float _Iridescence_Edge_Intensity_;
uniform float _Angle_;
uniform float _Fade_Out_;
uniform bool _Reflected_;
uniform float _Frequency_;
uniform float _Vertical_Offset_;
uniform sampler2D _Iridescent_Map_;
uniform bool _Use_Global_Left_Index_;
uniform bool _Use_Global_Right_Index_;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
void Round_Rect_Fragment_B31(
float Radius,
float Line_Width,
vec4 Line_Color,
float Filter_Width,
vec2 UV,
float Line_Visibility,
vec4 Rect_Parms,
vec4 Fill_Color,
out vec4 Color)
{
float d=length(max(abs(UV)-Rect_Parms.xy,0.0));
float dx=max(fwidth(d)*Filter_Width,0.00001);
float g=min(Rect_Parms.z,Rect_Parms.w);
float dgrad=max(fwidth(g)*Filter_Width,0.00001);
float Inside_Rect=clamp(g/dgrad,0.0,1.0);
float inner=clamp((d+dx*0.5-max(Radius-Line_Width,d-dx*0.5))/dx,0.0,1.0);
Color=clamp(mix(Fill_Color,Line_Color,inner),0.0,1.0)*Inside_Rect;
}
void Blob_Fragment_B71(
sampler2D Blob_Texture,
vec4 Blob_Info1,
vec4 Blob_Info2,
out vec4 Blob_Color)
{
float k1=dot(Blob_Info1.xy,Blob_Info1.xy);
float k2=dot(Blob_Info2.xy,Blob_Info2.xy);
vec3 closer=k1<k2 ? vec3(k1,Blob_Info1.z,Blob_Info1.w) : vec3(k2,Blob_Info2.z,Blob_Info2.w);
Blob_Color=closer.z*texture(Blob_Texture,vec2(vec2(sqrt(closer.x),closer.y).x,1.0-vec2(sqrt(closer.x),closer.y).y))*clamp(1.0-closer.x,0.0,1.0);
}
void Line_Fragment_B48(
vec4 Base_Color,
vec4 Highlight_Color,
float Highlight_Width,
vec3 Line_Vertex,
float Highlight,
out vec4 Line_Color)
{
float k2=1.0-clamp(abs(Line_Vertex.y/Highlight_Width),0.0,1.0);
Line_Color=mix(Base_Color,Highlight_Color,Highlight*k2);
}
void Scale_RGB_B54(
vec4 Color,
float Scalar,
out vec4 Result)
{
Result=vec4(Scalar,Scalar,Scalar,1)*Color;
}
void Conditional_Float_B38(
bool Which,
float If_True,
float If_False,
out float Result)
{
Result=Which ? If_True : If_False;
}
void main()
{
float R_Q72;
float G_Q72;
float B_Q72;
float A_Q72;
R_Q72=vColor.r; G_Q72=vColor.g; B_Q72=vColor.b; A_Q72=vColor.a;
vec4 Blob_Color_Q71;
#if BLOB_ENABLE
float k1=dot(vExtra2.xy,vExtra2.xy);
float k2=dot(vExtra3.xy,vExtra3.xy);
vec3 closer=k1<k2 ? vec3(k1,vExtra2.z,vExtra2.w) : vec3(k2,vExtra3.z,vExtra3.w);
Blob_Color_Q71=closer.z*texture(_Blob_Texture_,vec2(vec2(sqrt(closer.x),closer.y).x,1.0-vec2(sqrt(closer.x),closer.y).y))*clamp(1.0-closer.x,0.0,1.0);
#else
Blob_Color_Q71=vec4(0,0,0,0);
#endif
vec4 Line_Color_Q48;
Line_Fragment_B48(_Line_Color_,_Highlight_Color_,_Highlight_Width_,vTangent,_Highlight_,Line_Color_Q48);
float X_Q67;
float Y_Q67;
X_Q67=vUV.x;
Y_Q67=vUV.y;
vec3 Incident_Q66=normalize(vPosition-cameraPosition);
vec3 Reflected_Q60=reflect(Incident_Q66,vBinormal);
float Product_Q63=Y_Q67*_Vertical_Offset_;
float Dot_Q68=dot(Incident_Q66, Reflected_Q60);
float Dot_Q57=dot(vNormal, Incident_Q66);
float Result_Q38;
Conditional_Float_B38(_Reflected_,Dot_Q68,Dot_Q57,Result_Q38);
float Product_Q64=Result_Q38*_Frequency_;
float Sum_Q69=Product_Q64+1.0;
float Product_Q70=Sum_Q69*0.5;
float Sum_Q62=Product_Q63+Product_Q70;
float FractF_Q59=fract(Sum_Q62);
vec2 Vec2_Q65=vec2(FractF_Q59,0.5);
vec4 Color_Q58;
#if IRIDESCENT_MAP_ENABLE
Color_Q58=texture(_Iridescent_Map_,Vec2_Q65);
#else
Color_Q58=vec4(0,0,0,0);
#endif
vec4 Result_Q54;
Scale_RGB_B54(Color_Q58,_Iridescence_Edge_Intensity_,Result_Q54);
vec4 Result_Q55;
Scale_RGB_B54(Color_Q58,_Iridescence_Intensity_,Result_Q55);
vec4 Base_And_Iridescent_Q53;
Base_And_Iridescent_Q53=Line_Color_Q48+vec4(Result_Q54.rgb,0.0);
vec4 Base_And_Iridescent_Q56;
Base_And_Iridescent_Q56=_Base_Color_+vec4(Result_Q55.rgb,0.0);
vec4 Result_Q52=Base_And_Iridescent_Q53; Result_Q52.a=1.0;
vec4 Result_Q35=Blob_Color_Q71+(1.0-Blob_Color_Q71.a)*Base_And_Iridescent_Q56;
vec4 Color_Q31;
Round_Rect_Fragment_B31(R_Q72,G_Q72,Result_Q52,_Filter_Width_,vUV,1.0,vExtra1,Result_Q35,Color_Q31);
vec4 Result_Q47=_Fade_Out_*Color_Q31;
vec4 Out_Color=Result_Q47;
float Clip_Threshold=0.001;
bool To_sRGB=false;
gl_FragColor=Out_Color;
}`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/materials/fluentBackplate/shaders/fluentBackplate.vertex.js":(C,v,n)=>{n.r(v),n.d(v,{fluentBackplateVertexShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="fluentBackplateVertexShader",f=`uniform mat4 world;
uniform mat4 viewProjection;
uniform vec3 cameraPosition;
attribute vec3 position;
attribute vec3 normal;
#ifdef TANGENT
attribute vec3 tangent;
#else
const vec3 tangent=vec3(0.);
#endif
uniform float _Radius_;
uniform float _Line_Width_;
uniform bool _Absolute_Sizes_;
uniform float _Filter_Width_;
uniform vec4 _Base_Color_;
uniform vec4 _Line_Color_;
uniform float _Radius_Top_Left_;
uniform float _Radius_Top_Right_;
uniform float _Radius_Bottom_Left_;
uniform float _Radius_Bottom_Right_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform sampler2D _Blob_Texture_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform float _Rate_;
uniform vec4 _Highlight_Color_;
uniform float _Highlight_Width_;
uniform vec4 _Highlight_Transform_;
uniform float _Highlight_;
uniform float _Iridescence_Intensity_;
uniform float _Iridescence_Edge_Intensity_;
uniform float _Angle_;
uniform float _Fade_Out_;
uniform bool _Reflected_;
uniform float _Frequency_;
uniform float _Vertical_Offset_;
uniform sampler2D _Iridescent_Map_;
uniform bool _Use_Global_Left_Index_;
uniform bool _Use_Global_Right_Index_;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vColor;
varying vec4 vExtra1;
varying vec4 vExtra2;
varying vec4 vExtra3;
void Object_To_World_Pos_B115(
vec3 Pos_Object,
out vec3 Pos_World)
{
Pos_World=(world*vec4(Pos_Object,1.0)).xyz;
}
void PickDir_B140(
float Degrees,
vec3 DirX,
vec3 DirY,
out vec3 Dir)
{
float a=Degrees*3.14159/180.0;
Dir=cos(a)*DirX+sin(a)*DirY;
}
void Round_Rect_Vertex_B139(
vec2 UV,
float Radius,
float Margin,
float Anisotropy,
float Gradient1,
float Gradient2,
out vec2 Rect_UV,
out vec4 Rect_Parms,
out vec2 Scale_XY,
out vec2 Line_UV)
{
Scale_XY=vec2(Anisotropy,1.0);
Line_UV=(UV-vec2(0.5,0.5));
Rect_UV=Line_UV*Scale_XY;
Rect_Parms.xy=Scale_XY*0.5-vec2(Radius,Radius)-vec2(Margin,Margin);
Rect_Parms.z=Gradient1; 
Rect_Parms.w=Gradient2;
}
void Line_Vertex_B135(
vec2 Scale_XY,
vec2 UV,
float Time,
float Rate,
vec4 Highlight_Transform,
out vec3 Line_Vertex)
{
float angle2=(Rate*Time)*2.0*3.1416;
float sinAngle2=sin(angle2);
float cosAngle2=cos(angle2);
vec2 xformUV=UV*Highlight_Transform.xy+Highlight_Transform.zw;
Line_Vertex.x=0.0;
Line_Vertex.y=cosAngle2*xformUV.x-sinAngle2*xformUV.y;
Line_Vertex.z=0.0; 
}
void Blob_Vertex_B180(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
float Blob_Fade_Length,
float Blob_Pulse,
float Blob_Fade,
out vec4 Blob_Info)
{
vec3 blob=Blob_Position;
vec3 delta=blob-Position;
float dist=dot(Normal,delta);
float lerpValue=clamp((abs(dist)-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);
float fadeValue=1.0-clamp((abs(dist)-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);
float size=Blob_Near_Size+(Blob_Far_Size-Blob_Near_Size)*lerpValue;
vec2 blobXY=vec2(dot(delta,Tangent),dot(delta,Bitangent))/(0.0001+size);
float Fade=fadeValue*Intensity*Blob_Fade;
float Distance=(lerpValue*0.5+0.5)*(1.0-Blob_Pulse);
Blob_Info=vec4(blobXY.x,blobXY.y,Distance,Fade);
}
void Move_Verts_B129(
float Anisotropy,
vec3 P,
float Radius,
out vec3 New_P,
out vec2 New_UV,
out float Radial_Gradient,
out vec3 Radial_Dir)
{
vec2 UV=P.xy*2.0+0.5;
vec2 center=clamp(UV,0.0,1.0);
vec2 delta=UV-center;
vec2 r2=2.0*vec2(Radius/Anisotropy,Radius);
New_UV=center+r2*(UV-2.0*center+0.5);
New_P=vec3(New_UV-0.5,P.z);
Radial_Gradient=1.0-length(delta)*2.0;
Radial_Dir=vec3(delta*r2,0.0);
}
void Object_To_World_Dir_B132(
vec3 Dir_Object,
out vec3 Binormal_World,
out vec3 Binormal_World_N,
out float Binormal_Length)
{
Binormal_World=(world*vec4(Dir_Object,0.0)).xyz;
Binormal_Length=length(Binormal_World);
Binormal_World_N=Binormal_World/Binormal_Length;
}
void RelativeOrAbsoluteDetail_B147(
float Nominal_Radius,
float Nominal_LineWidth,
bool Absolute_Measurements,
float Height,
out float Radius,
out float Line_Width)
{
float scale=Absolute_Measurements ? 1.0/Height : 1.0;
Radius=Nominal_Radius*scale;
Line_Width=Nominal_LineWidth*scale;
}
void Edge_AA_Vertex_B130(
vec3 Position_World,
vec3 Position_Object,
vec3 Normal_Object,
vec3 Eye,
float Radial_Gradient,
vec3 Radial_Dir,
vec3 Tangent,
out float Gradient1,
out float Gradient2)
{
vec3 I=(Eye-Position_World);
vec3 T=(world* vec4(Tangent,0.0)).xyz;
float g=(dot(T,I)<0.0) ? 0.0 : 1.0;
if (Normal_Object.z==0.0) { 
Gradient1=Position_Object.z>0.0 ? g : 1.0;
Gradient2=Position_Object.z>0.0 ? 1.0 : g;
} else {
Gradient1=g+(1.0-g)*(Radial_Gradient);
Gradient2=1.0;
}
}
void Pick_Radius_B144(
float Radius,
float Radius_Top_Left,
float Radius_Top_Right,
float Radius_Bottom_Left,
float Radius_Bottom_Right,
vec3 Position,
out float Result)
{
bool whichY=Position.y>0.0;
Result=Position.x<0.0 ? (whichY ? Radius_Top_Left : Radius_Bottom_Left) : (whichY ? Radius_Top_Right : Radius_Bottom_Right);
Result*=Radius;
}
void main()
{
vec3 Nrm_World_Q128;
Nrm_World_Q128=normalize((world*vec4(normal,0.0)).xyz);
vec3 Tangent_World_Q131;
vec3 Tangent_World_N_Q131;
float Tangent_Length_Q131;
Tangent_World_Q131=(world*vec4(vec3(1,0,0),0.0)).xyz;
Tangent_Length_Q131=length(Tangent_World_Q131);
Tangent_World_N_Q131=Tangent_World_Q131/Tangent_Length_Q131;
vec3 Binormal_World_Q132;
vec3 Binormal_World_N_Q132;
float Binormal_Length_Q132;
Object_To_World_Dir_B132(vec3(0,1,0),Binormal_World_Q132,Binormal_World_N_Q132,Binormal_Length_Q132);
float Anisotropy_Q133=Tangent_Length_Q131/Binormal_Length_Q132;
vec3 Result_Q177;
Result_Q177=mix(_Blob_Position_,Global_Left_Index_Tip_Position.xyz,float(_Use_Global_Left_Index_));
vec3 Result_Q178;
Result_Q178=mix(_Blob_Position_2_,Global_Right_Index_Tip_Position.xyz,float(_Use_Global_Right_Index_));
float Result_Q144;
Pick_Radius_B144(_Radius_,_Radius_Top_Left_,_Radius_Top_Right_,_Radius_Bottom_Left_,_Radius_Bottom_Right_,position,Result_Q144);
vec3 Dir_Q140;
PickDir_B140(_Angle_,Tangent_World_N_Q131,Binormal_World_N_Q132,Dir_Q140);
float Radius_Q147;
float Line_Width_Q147;
RelativeOrAbsoluteDetail_B147(Result_Q144,_Line_Width_,_Absolute_Sizes_,Binormal_Length_Q132,Radius_Q147,Line_Width_Q147);
vec4 Out_Color_Q145=vec4(Radius_Q147,Line_Width_Q147,0,1);
vec3 New_P_Q129;
vec2 New_UV_Q129;
float Radial_Gradient_Q129;
vec3 Radial_Dir_Q129;
Move_Verts_B129(Anisotropy_Q133,position,Radius_Q147,New_P_Q129,New_UV_Q129,Radial_Gradient_Q129,Radial_Dir_Q129);
vec3 Pos_World_Q115;
Object_To_World_Pos_B115(New_P_Q129,Pos_World_Q115);
vec4 Blob_Info_Q180;
#if BLOB_ENABLE
Blob_Vertex_B180(Pos_World_Q115,Nrm_World_Q128,Tangent_World_N_Q131,Binormal_World_N_Q132,Result_Q177,_Blob_Intensity_,_Blob_Near_Size_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_,_Blob_Fade_,Blob_Info_Q180);
#else
Blob_Info_Q180=vec4(0,0,0,0);
#endif
vec4 Blob_Info_Q181;
#if BLOB_ENABLE_2
Blob_Vertex_B180(Pos_World_Q115,Nrm_World_Q128,Tangent_World_N_Q131,Binormal_World_N_Q132,Result_Q178,_Blob_Intensity_,_Blob_Near_Size_2_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_2_,_Blob_Fade_2_,Blob_Info_Q181);
#else
Blob_Info_Q181=vec4(0,0,0,0);
#endif
float Gradient1_Q130;
float Gradient2_Q130;
#if SMOOTH_EDGES
Edge_AA_Vertex_B130(Pos_World_Q115,position,normal,cameraPosition,Radial_Gradient_Q129,Radial_Dir_Q129,tangent,Gradient1_Q130,Gradient2_Q130);
#else
Gradient1_Q130=1.0;
Gradient2_Q130=1.0;
#endif
vec2 Rect_UV_Q139;
vec4 Rect_Parms_Q139;
vec2 Scale_XY_Q139;
vec2 Line_UV_Q139;
Round_Rect_Vertex_B139(New_UV_Q129,Radius_Q147,0.0,Anisotropy_Q133,Gradient1_Q130,Gradient2_Q130,Rect_UV_Q139,Rect_Parms_Q139,Scale_XY_Q139,Line_UV_Q139);
vec3 Line_Vertex_Q135;
Line_Vertex_B135(Scale_XY_Q139,Line_UV_Q139,0.0,_Rate_,_Highlight_Transform_,Line_Vertex_Q135);
vec3 Position=Pos_World_Q115;
vec3 Normal=Dir_Q140;
vec2 UV=Rect_UV_Q139;
vec3 Tangent=Line_Vertex_Q135;
vec3 Binormal=Nrm_World_Q128;
vec4 Color=Out_Color_Q145;
vec4 Extra1=Rect_Parms_Q139;
vec4 Extra2=Blob_Info_Q180;
vec4 Extra3=Blob_Info_Q181;
gl_Position=viewProjection*vec4(Position,1);
vPosition=Position;
vNormal=Normal;
vUV=UV;
vTangent=Tangent;
vBinormal=Binormal;
vColor=Color;
vExtra1=Extra1;
vExtra2=Extra2;
vExtra3=Extra3;
}`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/materials/fluentButton/fluentButtonMaterial.js":(C,v,n)=>{n.r(v),n.d(v,{FluentButtonMaterial:()=>e});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/3D/materials/fluentButton/shaders/fluentButton.fragment.js"),g=n("../../../dev/gui/dist/3D/materials/fluentButton/shaders/fluentButton.vertex.js");class d extends r.MaterialDefines{constructor(){super();this.RELATIVE_WIDTH=!0,this.ENABLE_FADE=!0,this._needNormals=!0,this._needUVs=!0,this.rebuild()}}class e extends r.PushMaterial{constructor(t,i){super(t,i);this.edgeWidth=.04,this.edgeColor=new r.Color4(.592157,.592157,.592157,1),this.proximityMaxIntensity=.45,this.proximityFarDistance=.16,this.proximityNearRadius=1.5,this.proximityAnisotropy=1,this.selectionFuzz=.5,this.selected=0,this.selectionFade=0,this.selectionFadeSize=.3,this.selectedDistance=.08,this.selectedFadeLength=.08,this.blobIntensity=.5,this.blobFarSize=.05,this.blobNearDistance=0,this.blobFarDistance=.08,this.blobFadeLength=.08,this.leftBlobEnable=!0,this.leftBlobNearSize=.025,this.leftBlobPulse=0,this.leftBlobFade=1,this.leftBlobInnerFade=.01,this.rightBlobEnable=!0,this.rightBlobNearSize=.025,this.rightBlobPulse=0,this.rightBlobFade=1,this.rightBlobInnerFade=.01,this.activeFaceDir=new r.Vector3(0,0,-1),this.activeFaceUp=new r.Vector3(0,1,0),this.enableFade=!0,this.fadeWidth=1.5,this.smoothActiveFace=!0,this.showFrame=!1,this.useBlobTexture=!0,this.globalLeftIndexTipPosition=r.Vector3.Zero(),this.globalRightIndexTipPosition=r.Vector3.Zero(),this.alphaMode=r.Constants.ALPHA_ADD,this.disableDepthWrite=!0,this.backFaceCulling=!1,this._blobTexture=new r.Texture(e.BLOB_TEXTURE_URL,this.getScene(),!0,!1,r.Texture.NEAREST_SAMPLINGMODE)}needAlphaBlending(){return!0}needAlphaTesting(){return!0}getAlphaTestTexture(){return null}isReadyForSubMesh(t,i){if(this.isFrozen&&i.effect&&i.effect._wasPreviouslyReady)return!0;i.materialDefines||(i.materialDefines=new d);const o=i.materialDefines,a=this.getScene();if(this._isReadyForSubMesh(i))return!0;const l=a.getEngine();if(r.MaterialHelper.PrepareDefinesForAttributes(t,o,!0,!1),o.isDirty){o.markAsProcessed(),a.resetCachedMaterial();const c=new r.EffectFallbacks;o.FOG&&c.addFallback(1,"FOG"),r.MaterialHelper.HandleFallbacksForShadows(o,c),o.IMAGEPROCESSINGPOSTPROCESS=a.imageProcessingConfiguration.applyByPostProcess;const h=[r.VertexBuffer.PositionKind];o.NORMAL&&h.push(r.VertexBuffer.NormalKind),o.UV1&&h.push(r.VertexBuffer.UVKind),o.UV2&&h.push(r.VertexBuffer.UV2Kind),o.VERTEXCOLOR&&h.push(r.VertexBuffer.ColorKind),o.TANGENT&&h.push(r.VertexBuffer.TangentKind),r.MaterialHelper.PrepareAttributesForInstances(h,o);const u="fluentButton",m=o.toString(),b=["world","viewProjection","cameraPosition","_Edge_Width_","_Edge_Color_","_Relative_Width_","_Proximity_Max_Intensity_","_Proximity_Far_Distance_","_Proximity_Near_Radius_","_Proximity_Anisotropy_","_Selection_Fuzz_","_Selected_","_Selection_Fade_","_Selection_Fade_Size_","_Selected_Distance_","_Selected_Fade_Length_","_Blob_Enable_","_Blob_Position_","_Blob_Intensity_","_Blob_Near_Size_","_Blob_Far_Size_","_Blob_Near_Distance_","_Blob_Far_Distance_","_Blob_Fade_Length_","_Blob_Inner_Fade_","_Blob_Pulse_","_Blob_Fade_","_Blob_Texture_","_Blob_Enable_2_","_Blob_Position_2_","_Blob_Near_Size_2_","_Blob_Inner_Fade_2_","_Blob_Pulse_2_","_Blob_Fade_2_","_Active_Face_Dir_","_Active_Face_Up_","_Enable_Fade_","_Fade_Width_","_Smooth_Active_Face_","_Show_Frame_","_Use_Blob_Texture_","Use_Global_Left_Index","Use_Global_Right_Index","Global_Left_Index_Tip_Position","Global_Right_Index_Tip_Position","Global_Left_Thumb_Tip_Position","Global_Right_Thumb_Tip_Position","Global_Left_Index_Tip_Proximity","Global_Right_Index_Tip_Proximity"],P=["_Blob_Texture_"],B=new Array;r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:b,uniformBuffersNames:B,samplers:P,defines:o,maxSimultaneousLights:4}),i.setEffect(a.getEngine().createEffect(u,{attributes:h,uniformsNames:b,uniformBuffersNames:B,samplers:P,defines:m,fallbacks:c,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},l),o,this._materialContext)}return!i.effect||!i.effect.isReady()?!1:(o._renderId=a.getRenderId(),i.effect._wasPreviouslyReady=!0,!0)}bindForSubMesh(t,i,o){const a=this.getScene();if(!o.materialDefines)return;const c=o.effect;!c||(this._activeEffect=c,this.bindOnlyWorldMatrix(t),this._activeEffect.setMatrix("viewProjection",a.getTransformMatrix()),this._activeEffect.setVector3("cameraPosition",a.activeCamera.position),this._activeEffect.setTexture("_Blob_Texture_",this._blobTexture),this._activeEffect.setFloat("_Edge_Width_",this.edgeWidth),this._activeEffect.setColor4("_Edge_Color_",new r.Color3(this.edgeColor.r,this.edgeColor.g,this.edgeColor.b),this.edgeColor.a),this._activeEffect.setFloat("_Proximity_Max_Intensity_",this.proximityMaxIntensity),this._activeEffect.setFloat("_Proximity_Far_Distance_",this.proximityFarDistance),this._activeEffect.setFloat("_Proximity_Near_Radius_",this.proximityNearRadius),this._activeEffect.setFloat("_Proximity_Anisotropy_",this.proximityAnisotropy),this._activeEffect.setFloat("_Selection_Fuzz_",this.selectionFuzz),this._activeEffect.setFloat("_Selected_",this.selected),this._activeEffect.setFloat("_Selection_Fade_",this.selectionFade),this._activeEffect.setFloat("_Selection_Fade_Size_",this.selectionFadeSize),this._activeEffect.setFloat("_Selected_Distance_",this.selectedDistance),this._activeEffect.setFloat("_Selected_Fade_Length_",this.selectedFadeLength),this._activeEffect.setFloat("_Blob_Enable_",this.leftBlobEnable?1:0),this._activeEffect.setFloat("_Blob_Intensity_",this.blobIntensity),this._activeEffect.setFloat("_Blob_Near_Size_",this.leftBlobNearSize),this._activeEffect.setFloat("_Blob_Far_Size_",this.blobFarSize),this._activeEffect.setFloat("_Blob_Near_Distance_",this.blobNearDistance),this._activeEffect.setFloat("_Blob_Far_Distance_",this.blobFarDistance),this._activeEffect.setFloat("_Blob_Fade_Length_",this.blobFadeLength),this._activeEffect.setFloat("_Blob_Inner_Fade_",this.leftBlobInnerFade),this._activeEffect.setFloat("_Blob_Pulse_",this.leftBlobPulse),this._activeEffect.setFloat("_Blob_Fade_",this.leftBlobFade),this._activeEffect.setFloat("_Blob_Enable_2_",this.rightBlobEnable?1:0),this._activeEffect.setFloat("_Blob_Near_Size_2_",this.rightBlobNearSize),this._activeEffect.setFloat("_Blob_Inner_Fade_2_",this.rightBlobInnerFade),this._activeEffect.setFloat("_Blob_Pulse_2_",this.rightBlobPulse),this._activeEffect.setFloat("_Blob_Fade_2_",this.rightBlobFade),this._activeEffect.setVector3("_Active_Face_Dir_",this.activeFaceDir),this._activeEffect.setVector3("_Active_Face_Up_",this.activeFaceUp),this._activeEffect.setFloat("_Fade_Width_",this.fadeWidth),this._activeEffect.setFloat("_Smooth_Active_Face_",this.smoothActiveFace?1:0),this._activeEffect.setFloat("_Show_Frame_",this.showFrame?1:0),this._activeEffect.setFloat("_Use_Blob_Texture_",this.useBlobTexture?1:0),this._activeEffect.setFloat("Use_Global_Left_Index",1),this._activeEffect.setFloat("Use_Global_Right_Index",1),this._activeEffect.setVector4("Global_Left_Index_Tip_Position",new r.Vector4(this.globalLeftIndexTipPosition.x,this.globalLeftIndexTipPosition.y,this.globalLeftIndexTipPosition.z,1)),this._activeEffect.setVector4("Global_Right_Index_Tip_Position",new r.Vector4(this.globalRightIndexTipPosition.x,this.globalRightIndexTipPosition.y,this.globalRightIndexTipPosition.z,1)),this._afterBind(i,this._activeEffect))}getAnimatables(){return[]}dispose(t){super.dispose(t)}clone(t){return r.SerializationHelper.Clone(()=>new e(t,this.getScene()),this)}serialize(){const t=super.serialize();return t.customType="BABYLON.FluentButtonMaterial",t}getClassName(){return"FluentButtonMaterial"}static Parse(t,i,o){return r.SerializationHelper.Parse(()=>new e(t.name,i),t,i,o)}}e.BLOB_TEXTURE_URL="https://assets.babylonjs.com/meshes/MRTK/mrtk-fluent-button-blob.png",(0,s.__decorate)([(0,r.serialize)()],e.prototype,"edgeWidth",void 0),(0,s.__decorate)([(0,r.serializeAsColor4)()],e.prototype,"edgeColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"proximityMaxIntensity",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"proximityFarDistance",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"proximityNearRadius",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"proximityAnisotropy",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"selectionFuzz",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"selected",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"selectionFade",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"selectionFadeSize",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"selectedDistance",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"selectedFadeLength",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobIntensity",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFarSize",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobNearDistance",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFarDistance",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFadeLength",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"leftBlobEnable",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"leftBlobNearSize",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"leftBlobPulse",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"leftBlobFade",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"leftBlobInnerFade",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rightBlobEnable",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rightBlobNearSize",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rightBlobPulse",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rightBlobFade",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rightBlobInnerFade",void 0),(0,s.__decorate)([(0,r.serializeAsVector3)()],e.prototype,"activeFaceDir",void 0),(0,s.__decorate)([(0,r.serializeAsVector3)()],e.prototype,"activeFaceUp",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"enableFade",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"fadeWidth",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"smoothActiveFace",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"showFrame",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"useBlobTexture",void 0),(0,s.__decorate)([(0,r.serializeAsVector3)()],e.prototype,"globalLeftIndexTipPosition",void 0),(0,s.__decorate)([(0,r.serializeAsVector3)()],e.prototype,"globalRightIndexTipPosition",void 0),(0,r.RegisterClass)("BABYLON.GUI.FluentButtonMaterial",e)},"../../../dev/gui/dist/3D/materials/fluentButton/index.js":(C,v,n)=>{n.r(v),n.d(v,{FluentButtonMaterial:()=>s.FluentButtonMaterial});var s=n("../../../dev/gui/dist/3D/materials/fluentButton/fluentButtonMaterial.js")},"../../../dev/gui/dist/3D/materials/fluentButton/shaders/fluentButton.fragment.js":(C,v,n)=>{n.r(v),n.d(v,{fluentButtonPixelShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="fluentButtonPixelShader",f=`uniform vec3 cameraPosition;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vColor;
varying vec4 vExtra1;
uniform float _Edge_Width_;
uniform vec4 _Edge_Color_;
uniform bool _Relative_Width_;
uniform float _Proximity_Max_Intensity_;
uniform float _Proximity_Far_Distance_;
uniform float _Proximity_Near_Radius_;
uniform float _Proximity_Anisotropy_;
uniform float _Selection_Fuzz_;
uniform float _Selected_;
uniform float _Selection_Fade_;
uniform float _Selection_Fade_Size_;
uniform float _Selected_Distance_;
uniform float _Selected_Fade_Length_;
uniform bool _Blob_Enable_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Inner_Fade_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform sampler2D _Blob_Texture_;
uniform bool _Blob_Enable_2_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Inner_Fade_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform vec3 _Active_Face_Dir_;
uniform vec3 _Active_Face_Up_;
uniform bool Enable_Fade;
uniform float _Fade_Width_;
uniform bool _Smooth_Active_Face_;
uniform bool _Show_Frame_;
uniform bool _Use_Blob_Texture_;
uniform bool Use_Global_Left_Index;
uniform bool Use_Global_Right_Index;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
uniform vec4 Global_Left_Thumb_Tip_Position;
uniform vec4 Global_Right_Thumb_Tip_Position;
uniform float Global_Left_Index_Tip_Proximity;
uniform float Global_Right_Index_Tip_Proximity;
void Holo_Edge_Fragment_B35(
vec4 Edges,
float Edge_Width,
out float NotEdge)
{
vec2 c=vec2(min(Edges.r,Edges.g),min(Edges.b,Edges.a));
vec2 df=fwidth(c)*Edge_Width;
vec2 g=clamp(c/df,0.0,1.0);
NotEdge=g.x*g.y;
}
void Blob_Fragment_B39(
vec2 UV,
vec3 Blob_Info,
sampler2D Blob_Texture,
out vec4 Blob_Color)
{
float k=dot(UV,UV);
Blob_Color=Blob_Info.y*texture(Blob_Texture,vec2(vec2(sqrt(k),Blob_Info.x).x,1.0-vec2(sqrt(k),Blob_Info.x).y))*(1.0-clamp(k,0.0,1.0));
}
vec2 FilterStep(vec2 Edge,vec2 X)
{
vec2 dX=max(fwidth(X),vec2(0.00001,0.00001));
return clamp( (X+dX-max(Edge,X-dX))/(dX*2.0),0.0,1.0);
}
void Wireframe_Fragment_B59(
vec3 Widths,
vec2 UV,
float Proximity,
vec4 Edge_Color,
out vec4 Wireframe)
{
vec2 c=min(UV,vec2(1.0,1.0)-UV);
vec2 g=FilterStep(Widths.xy*0.5,c); 
Wireframe=(1.0-min(g.x,g.y))*Proximity*Edge_Color;
}
void Proximity_B53(
vec3 Proximity_Center,
vec3 Proximity_Center_2,
float Proximity_Max_Intensity,
float Proximity_Near_Radius,
vec3 Position,
vec3 Show_Selection,
vec4 Extra1,
float Dist_To_Face,
float Intensity,
out float Proximity)
{
vec2 delta1=Extra1.xy;
vec2 delta2=Extra1.zw;
float d2=sqrt(min(dot(delta1,delta1),dot(delta2,delta2))+Dist_To_Face*Dist_To_Face);
Proximity=Intensity*Proximity_Max_Intensity*(1.0-clamp(d2/Proximity_Near_Radius,0.0,1.0))*(1.0-Show_Selection.x)+Show_Selection.x;
}
void To_XYZ_B46(
vec3 Vec3,
out float X,
out float Y,
out float Z)
{
X=Vec3.x;
Y=Vec3.y;
Z=Vec3.z;
}
void main()
{
float NotEdge_Q35;
#if ENABLE_FADE
Holo_Edge_Fragment_B35(vColor,_Fade_Width_,NotEdge_Q35);
#else
NotEdge_Q35=1.0;
#endif
vec4 Blob_Color_Q39;
float k=dot(vUV,vUV);
vec2 blobTextureCoord=vec2(vec2(sqrt(k),vTangent.x).x,1.0-vec2(sqrt(k),vTangent.x).y);
vec4 blobColor=mix(vec4(1.0,1.0,1.0,1.0)*step(1.0-vTangent.x,clamp(sqrt(k)+0.1,0.0,1.0)),texture(_Blob_Texture_,blobTextureCoord),float(_Use_Blob_Texture_));
Blob_Color_Q39=vTangent.y*blobColor*(1.0-clamp(k,0.0,1.0));
float Is_Quad_Q24;
Is_Quad_Q24=vNormal.z;
vec3 Blob_Position_Q41= mix(_Blob_Position_,Global_Left_Index_Tip_Position.xyz,float(Use_Global_Left_Index));
vec3 Blob_Position_Q42= mix(_Blob_Position_2_,Global_Right_Index_Tip_Position.xyz,float(Use_Global_Right_Index));
float X_Q46;
float Y_Q46;
float Z_Q46;
To_XYZ_B46(vBinormal,X_Q46,Y_Q46,Z_Q46);
float Proximity_Q53;
Proximity_B53(Blob_Position_Q41,Blob_Position_Q42,_Proximity_Max_Intensity_,_Proximity_Near_Radius_,vPosition,vBinormal,vExtra1,Y_Q46,Z_Q46,Proximity_Q53);
vec4 Wireframe_Q59;
Wireframe_Fragment_B59(vNormal,vUV,Proximity_Q53,_Edge_Color_,Wireframe_Q59);
vec4 Wire_Or_Blob_Q23=mix(Wireframe_Q59,Blob_Color_Q39,Is_Quad_Q24);
vec4 Result_Q22;
Result_Q22=mix(Wire_Or_Blob_Q23,vec4(0.3,0.3,0.3,0.3),float(_Show_Frame_));
vec4 Final_Color_Q37=NotEdge_Q35*Result_Q22;
vec4 Out_Color=Final_Color_Q37;
float Clip_Threshold=0.0;
bool To_sRGB=false;
gl_FragColor=Out_Color;
}`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/materials/fluentButton/shaders/fluentButton.vertex.js":(C,v,n)=>{n.r(v),n.d(v,{fluentButtonVertexShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="fluentButtonVertexShader",f=`uniform mat4 world;
uniform mat4 viewProjection;
uniform vec3 cameraPosition;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec3 tangent;
attribute vec4 color;
uniform float _Edge_Width_;
uniform vec4 _Edge_Color_;
uniform float _Proximity_Max_Intensity_;
uniform float _Proximity_Far_Distance_;
uniform float _Proximity_Near_Radius_;
uniform float _Proximity_Anisotropy_;
uniform float _Selection_Fuzz_;
uniform float _Selected_;
uniform float _Selection_Fade_;
uniform float _Selection_Fade_Size_;
uniform float _Selected_Distance_;
uniform float _Selected_Fade_Length_;
uniform bool _Blob_Enable_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Inner_Fade_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform sampler2D _Blob_Texture_;
uniform bool _Blob_Enable_2_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Inner_Fade_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform vec3 _Active_Face_Dir_;
uniform vec3 _Active_Face_Up_;
uniform bool _Enable_Fade_;
uniform float _Fade_Width_;
uniform bool _Smooth_Active_Face_;
uniform bool _Show_Frame_;
uniform bool Use_Global_Left_Index;
uniform bool Use_Global_Right_Index;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
uniform vec4 Global_Left_Thumb_Tip_Position;
uniform vec4 Global_Right_Thumb_Tip_Position;
uniform float Global_Left_Index_Tip_Proximity;
uniform float Global_Right_Index_Tip_Proximity;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vColor;
varying vec4 vExtra1;
void Blob_Vertex_B47(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
vec4 Vx_Color,
vec2 UV,
vec3 Face_Center,
vec2 Face_Size,
vec2 In_UV,
float Blob_Fade_Length,
float Selection_Fade,
float Selection_Fade_Size,
float Inner_Fade,
vec3 Active_Face_Center,
float Blob_Pulse,
float Blob_Fade,
float Blob_Enabled,
out vec3 Out_Position,
out vec2 Out_UV,
out vec3 Blob_Info)
{
float blobSize,fadeIn;
vec3 Hit_Position;
Blob_Info=vec3(0.0,0.0,0.0);
float Hit_Distance=dot(Blob_Position-Face_Center,Normal);
Hit_Position=Blob_Position-Hit_Distance*Normal;
float absD=abs(Hit_Distance);
float lerpVal=clamp((absD-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);
fadeIn=1.0-clamp((absD-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);
float innerFade=1.0-clamp(-Hit_Distance/Inner_Fade,0.0,1.0);
float farClip=clamp(1.0-step(Blob_Far_Distance+Blob_Fade_Length,absD),0.0,1.0);
float size=mix(Blob_Near_Size,Blob_Far_Size,lerpVal)*farClip;
blobSize=mix(size,Selection_Fade_Size,Selection_Fade)*innerFade*Blob_Enabled;
Blob_Info.x=lerpVal*0.5+0.5;
Blob_Info.y=fadeIn*Intensity*(1.0-Selection_Fade)*Blob_Fade;
Blob_Info.x*=(1.0-Blob_Pulse);
vec3 delta=Hit_Position-Face_Center;
vec2 blobCenterXY=vec2(dot(delta,Tangent),dot(delta,Bitangent));
vec2 quadUVin=2.0*UV-1.0; 
vec2 blobXY=blobCenterXY+quadUVin*blobSize;
vec2 blobClipped=clamp(blobXY,-Face_Size*0.5,Face_Size*0.5);
vec2 blobUV=(blobClipped-blobCenterXY)/max(blobSize,0.0001)*2.0;
vec3 blobCorner=Face_Center+blobClipped.x*Tangent+blobClipped.y*Bitangent;
Out_Position=mix(Position,blobCorner,Vx_Color.rrr);
Out_UV=mix(In_UV,blobUV,Vx_Color.rr);
}
vec2 ProjectProximity(
vec3 blobPosition,
vec3 position,
vec3 center,
vec3 dir,
vec3 xdir,
vec3 ydir,
out float vdistance
)
{
vec3 delta=blobPosition-position;
vec2 xy=vec2(dot(delta,xdir),dot(delta,ydir));
vdistance=abs(dot(delta,dir));
return xy;
}
void Proximity_Vertex_B66(
vec3 Blob_Position,
vec3 Blob_Position_2,
vec3 Active_Face_Center,
vec3 Active_Face_Dir,
vec3 Position,
float Proximity_Far_Distance,
float Relative_Scale,
float Proximity_Anisotropy,
vec3 Up,
out vec4 Extra1,
out float Distance_To_Face,
out float Intensity)
{
vec3 Active_Face_Dir_X=normalize(cross(Active_Face_Dir,Up));
vec3 Active_Face_Dir_Y=cross(Active_Face_Dir,Active_Face_Dir_X);
float distz1,distz2;
Extra1.xy=ProjectProximity(Blob_Position,Position,Active_Face_Center,Active_Face_Dir,Active_Face_Dir_X*Proximity_Anisotropy,Active_Face_Dir_Y,distz1)/Relative_Scale;
Extra1.zw=ProjectProximity(Blob_Position_2,Position,Active_Face_Center,Active_Face_Dir,Active_Face_Dir_X*Proximity_Anisotropy,Active_Face_Dir_Y,distz2)/Relative_Scale;
Distance_To_Face=dot(Active_Face_Dir,Position-Active_Face_Center);
Intensity=1.0-clamp(min(distz1,distz2)/Proximity_Far_Distance,0.0,1.0);
}
void Holo_Edge_Vertex_B44(
vec3 Incident,
vec3 Normal,
vec2 UV,
vec3 Tangent,
vec3 Bitangent,
bool Smooth_Active_Face,
float Active,
out vec4 Holo_Edges)
{
float NdotI=dot(Incident,Normal);
vec2 flip=(UV-vec2(0.5,0.5));
float udot=dot(Incident,Tangent)*flip.x*NdotI;
float uval=1.0-float(udot>0.0);
float vdot=-dot(Incident,Bitangent)*flip.y*NdotI;
float vval=1.0-float(vdot>0.0);
float Smooth_And_Active=step(1.0,float(Smooth_Active_Face && Active>0.0));
uval=mix(uval,max(1.0,uval),Smooth_And_Active); 
vval=mix(vval,max(1.0,vval),Smooth_And_Active);
Holo_Edges=vec4(1.0,1.0,1.0,1.0)-vec4(uval*UV.x,uval*(1.0-UV.x),vval*UV.y,vval*(1.0-UV.y));
}
void Object_To_World_Pos_B13(
vec3 Pos_Object,
out vec3 Pos_World)
{
Pos_World=(world*vec4(Pos_Object,1.0)).xyz;
}
void Choose_Blob_B38(
vec4 Vx_Color,
vec3 Position1,
vec3 Position2,
bool Blob_Enable_1,
bool Blob_Enable_2,
float Near_Size_1,
float Near_Size_2,
float Blob_Inner_Fade_1,
float Blob_Inner_Fade_2,
float Blob_Pulse_1,
float Blob_Pulse_2,
float Blob_Fade_1,
float Blob_Fade_2,
out vec3 Position,
out float Near_Size,
out float Inner_Fade,
out float Blob_Enable,
out float Fade,
out float Pulse)
{
Position=Position1*(1.0-Vx_Color.g)+Vx_Color.g*Position2;
float b1=float(Blob_Enable_1);
float b2=float(Blob_Enable_2);
Blob_Enable=b1+(b2-b1)*Vx_Color.g;
Pulse=Blob_Pulse_1*(1.0-Vx_Color.g)+Vx_Color.g*Blob_Pulse_2;
Fade=Blob_Fade_1*(1.0-Vx_Color.g)+Vx_Color.g*Blob_Fade_2;
Near_Size=Near_Size_1*(1.0-Vx_Color.g)+Vx_Color.g*Near_Size_2;
Inner_Fade=Blob_Inner_Fade_1*(1.0-Vx_Color.g)+Vx_Color.g*Blob_Inner_Fade_2;
}
void Wireframe_Vertex_B51(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
float Edge_Width,
vec2 Face_Size,
out vec3 Wire_Vx_Pos,
out vec2 UV,
out vec2 Widths)
{
Widths.xy=Edge_Width/Face_Size;
float x=dot(Position,Tangent);
float y=dot(Position,Bitangent);
float dx=0.5-abs(x);
float newx=(0.5-dx*Widths.x*2.0)*sign(x);
float dy=0.5-abs(y);
float newy=(0.5-dy*Widths.y*2.0)*sign(y);
Wire_Vx_Pos=Normal*0.5+newx*Tangent+newy*Bitangent;
UV.x=dot(Wire_Vx_Pos,Tangent)+0.5;
UV.y=dot(Wire_Vx_Pos,Bitangent)+0.5;
}
vec2 ramp2(vec2 start,vec2 end,vec2 x)
{
return clamp((x-start)/(end-start),vec2(0.0,0.0),vec2(1.0,1.0));
}
float computeSelection(
vec3 blobPosition,
vec3 normal,
vec3 tangent,
vec3 bitangent,
vec3 faceCenter,
vec2 faceSize,
float selectionFuzz,
float farDistance,
float fadeLength
)
{
vec3 delta=blobPosition-faceCenter;
float absD=abs(dot(delta,normal));
float fadeIn=1.0-clamp((absD-farDistance)/fadeLength,0.0,1.0);
vec2 blobCenterXY=vec2(dot(delta,tangent),dot(delta,bitangent));
vec2 innerFace=faceSize*(1.0-selectionFuzz)*0.5;
vec2 selectPulse=ramp2(-faceSize*0.5,-innerFace,blobCenterXY)-ramp2(innerFace,faceSize*0.5,blobCenterXY);
return selectPulse.x*selectPulse.y*fadeIn;
}
void Selection_Vertex_B48(
vec3 Blob_Position,
vec3 Blob_Position_2,
vec3 Face_Center,
vec2 Face_Size,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
float Selection_Fuzz,
float Selected,
float Far_Distance,
float Fade_Length,
vec3 Active_Face_Dir,
out float Show_Selection)
{
float select1=computeSelection(Blob_Position,Normal,Tangent,Bitangent,Face_Center,Face_Size,Selection_Fuzz,Far_Distance,Fade_Length);
float select2=computeSelection(Blob_Position_2,Normal,Tangent,Bitangent,Face_Center,Face_Size,Selection_Fuzz,Far_Distance,Fade_Length);
float Active=max(0.0,dot(Active_Face_Dir,Normal));
Show_Selection=mix(max(select1,select2),1.0,Selected)*Active;
}
void Proximity_Visibility_B54(
float Selection,
vec3 Proximity_Center,
vec3 Proximity_Center_2,
float Input_Width,
float Proximity_Far_Distance,
float Proximity_Radius,
vec3 Active_Face_Center,
vec3 Active_Face_Dir,
out float Width)
{
vec3 boxEdges=(world*vec4(vec3(0.5,0.5,0.5),0.0)).xyz;
float boxMaxSize=length(boxEdges);
float d1=dot(Proximity_Center-Active_Face_Center,Active_Face_Dir);
vec3 blob1=Proximity_Center-d1*Active_Face_Dir;
float d2=dot(Proximity_Center_2-Active_Face_Center,Active_Face_Dir);
vec3 blob2=Proximity_Center_2-d2*Active_Face_Dir;
vec3 delta1=blob1-Active_Face_Center;
vec3 delta2=blob2-Active_Face_Center;
float dist1=dot(delta1,delta1);
float dist2=dot(delta2,delta2);
float nearestProxDist=sqrt(min(dist1,dist2));
Width=Input_Width*(1.0-step(boxMaxSize+Proximity_Radius,nearestProxDist))*(1.0-step(Proximity_Far_Distance,min(d1,d2))*(1.0-step(0.0001,Selection)));
}
void Object_To_World_Dir_B67(
vec3 Dir_Object,
out vec3 Dir_World)
{
Dir_World=(world*vec4(Dir_Object,0.0)).xyz;
}
void main()
{
vec3 Active_Face_Center_Q49;
Active_Face_Center_Q49=(world*vec4(_Active_Face_Dir_*0.5,1.0)).xyz;
vec3 Blob_Position_Q41= mix(_Blob_Position_,Global_Left_Index_Tip_Position.xyz,float(Use_Global_Left_Index));
vec3 Blob_Position_Q42= mix(_Blob_Position_2_,Global_Right_Index_Tip_Position.xyz,float(Use_Global_Right_Index));
vec3 Active_Face_Dir_Q64=normalize((world*vec4(_Active_Face_Dir_,0.0)).xyz);
float Relative_Scale_Q57;
#if RELATIVE_WIDTH
Relative_Scale_Q57=length((world*vec4(vec3(0,1,0),0.0)).xyz);
#else
Relative_Scale_Q57=1.0;
#endif
vec3 Tangent_World_Q30;
Tangent_World_Q30=(world*vec4(tangent,0.0)).xyz;
vec3 Binormal_World_Q31;
Binormal_World_Q31=(world*vec4((cross(normal,tangent)),0.0)).xyz;
vec3 Normal_World_Q60;
Normal_World_Q60=(world*vec4(normal,0.0)).xyz;
vec3 Result_Q18=0.5*normal;
vec3 Dir_World_Q67;
Object_To_World_Dir_B67(_Active_Face_Up_,Dir_World_Q67);
float Product_Q56=_Edge_Width_*Relative_Scale_Q57;
vec3 Normal_World_N_Q29=normalize(Normal_World_Q60);
vec3 Tangent_World_N_Q28=normalize(Tangent_World_Q30);
vec3 Binormal_World_N_Q32=normalize(Binormal_World_Q31);
vec3 Position_Q38;
float Near_Size_Q38;
float Inner_Fade_Q38;
float Blob_Enable_Q38;
float Fade_Q38;
float Pulse_Q38;
Choose_Blob_B38(color,Blob_Position_Q41,Blob_Position_Q42,_Blob_Enable_,_Blob_Enable_2_,_Blob_Near_Size_,_Blob_Near_Size_2_,_Blob_Inner_Fade_,_Blob_Inner_Fade_2_,_Blob_Pulse_,_Blob_Pulse_2_,_Blob_Fade_,_Blob_Fade_2_,Position_Q38,Near_Size_Q38,Inner_Fade_Q38,Blob_Enable_Q38,Fade_Q38,Pulse_Q38);
vec3 Face_Center_Q33;
Face_Center_Q33=(world*vec4(Result_Q18,1.0)).xyz;
vec2 Face_Size_Q50=vec2(length(Tangent_World_Q30),length(Binormal_World_Q31));
float Show_Selection_Q48;
Selection_Vertex_B48(Blob_Position_Q41,Blob_Position_Q42,Face_Center_Q33,Face_Size_Q50,Normal_World_N_Q29,Tangent_World_N_Q28,Binormal_World_N_Q32,_Selection_Fuzz_,_Selected_,_Selected_Distance_,_Selected_Fade_Length_,Active_Face_Dir_Q64,Show_Selection_Q48);
vec3 Normalized_Q72=normalize(Dir_World_Q67);
float Active_Q34=max(0.0,dot(Active_Face_Dir_Q64,Normal_World_N_Q29));
float Width_Q54;
Proximity_Visibility_B54(Show_Selection_Q48,Blob_Position_Q41,Blob_Position_Q42,Product_Q56,_Proximity_Far_Distance_,_Proximity_Near_Radius_,Active_Face_Center_Q49,Active_Face_Dir_Q64,Width_Q54);
vec3 Wire_Vx_Pos_Q51;
vec2 UV_Q51;
vec2 Widths_Q51;
Wireframe_Vertex_B51(position,normal,tangent,(cross(normal,tangent)),Width_Q54,Face_Size_Q50,Wire_Vx_Pos_Q51,UV_Q51,Widths_Q51);
vec3 Vec3_Q27=vec3(Widths_Q51.x,Widths_Q51.y,color.r);
vec3 Pos_World_Q13;
Object_To_World_Pos_B13(Wire_Vx_Pos_Q51,Pos_World_Q13);
vec3 Incident_Q36=normalize(Pos_World_Q13-cameraPosition);
vec3 Out_Position_Q47;
vec2 Out_UV_Q47;
vec3 Blob_Info_Q47;
Blob_Vertex_B47(Pos_World_Q13,Normal_World_N_Q29,Tangent_World_N_Q28,Binormal_World_N_Q32,Position_Q38,_Blob_Intensity_,Near_Size_Q38,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,color,uv,Face_Center_Q33,Face_Size_Q50,UV_Q51,_Blob_Fade_Length_,_Selection_Fade_,_Selection_Fade_Size_,Inner_Fade_Q38,Active_Face_Center_Q49,Pulse_Q38,Fade_Q38,Blob_Enable_Q38,Out_Position_Q47,Out_UV_Q47,Blob_Info_Q47);
vec4 Extra1_Q66;
float Distance_To_Face_Q66;
float Intensity_Q66;
Proximity_Vertex_B66(Blob_Position_Q41,Blob_Position_Q42,Active_Face_Center_Q49,Active_Face_Dir_Q64,Pos_World_Q13,_Proximity_Far_Distance_,Relative_Scale_Q57,_Proximity_Anisotropy_,Normalized_Q72,Extra1_Q66,Distance_To_Face_Q66,Intensity_Q66);
vec4 Holo_Edges_Q44;
Holo_Edge_Vertex_B44(Incident_Q36,Normal_World_N_Q29,uv,Tangent_World_Q30,Binormal_World_Q31,_Smooth_Active_Face_,Active_Q34,Holo_Edges_Q44);
vec3 Vec3_Q19=vec3(Show_Selection_Q48,Distance_To_Face_Q66,Intensity_Q66);
vec3 Position=Out_Position_Q47;
vec2 UV=Out_UV_Q47;
vec3 Tangent=Blob_Info_Q47;
vec3 Binormal=Vec3_Q19;
vec3 Normal=Vec3_Q27;
vec4 Extra1=Extra1_Q66;
vec4 Color=Holo_Edges_Q44;
gl_Position=viewProjection*vec4(Position,1);
vPosition=Position;
vNormal=Normal;
vUV=UV;
vTangent=Tangent;
vBinormal=Binormal;
vColor=Color;
vExtra1=Extra1;
}`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/materials/handle/handleMaterial.js":(C,v,n)=>{n.r(v),n.d(v,{HandleMaterial:()=>g});var s=n("core/Misc/observable"),r=n.n(s),p=n("../../../dev/gui/dist/3D/materials/handle/shaders/handle.vertex.js"),f=n("../../../dev/gui/dist/3D/materials/handle/shaders/handle.fragment.js");class g extends s.ShaderMaterial{get hover(){return this._hover}set hover(e){this._hover=e,this._updateInterpolationTarget()}get drag(){return this._drag}set drag(e){this._drag=e,this._updateInterpolationTarget()}constructor(e,_){super(e,_,"handle",{attributes:["position"],uniforms:["worldViewProjection","color","scale","positionOffset"],needAlphaBlending:!1,needAlphaTesting:!1});this._hover=!1,this._drag=!1,this._color=new s.Color3,this._scale=1,this._lastTick=-1,this.animationLength=100,this.hoverColor=new s.Color3(0,.467,.84),this.baseColor=new s.Color3(1,1,1),this.hoverScale=.75,this.baseScale=.35,this.dragScale=.55,this._positionOffset=s.Vector3.Zero(),this._updateInterpolationTarget(),this._lastTick=Date.now(),this._onBeforeRender=this.getScene().onBeforeRenderObservable.add(()=>{const t=Date.now(),i=t-this._lastTick,o=this._targetScale-this._scale,a=s.TmpColors.Color3[0].copyFrom(this._targetColor).subtractToRef(this._color,s.TmpColors.Color3[0]);this._scale=this._scale+o*i/this.animationLength,a.scaleToRef(i/this.animationLength,a),this._color.addToRef(a,this._color),this.setColor3("color",this._color),this.setFloat("scale",this._scale),this.setVector3("positionOffset",this._positionOffset),this._lastTick=t})}_updateInterpolationTarget(){this.drag?(this._targetColor=this.hoverColor,this._targetScale=this.dragScale):this.hover?(this._targetColor=this.hoverColor,this._targetScale=this.hoverScale):(this._targetColor=this.baseColor,this._targetScale=this.baseScale)}dispose(){super.dispose(),this.getScene().onBeforeRenderObservable.remove(this._onBeforeRender)}}},"../../../dev/gui/dist/3D/materials/handle/index.js":(C,v,n)=>{n.r(v),n.d(v,{HandleMaterial:()=>s.HandleMaterial});var s=n("../../../dev/gui/dist/3D/materials/handle/handleMaterial.js")},"../../../dev/gui/dist/3D/materials/handle/shaders/handle.fragment.js":(C,v,n)=>{n.r(v),n.d(v,{handlePixelShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="handlePixelShader",f=`uniform vec3 color;
void main(void) {
gl_FragColor=vec4(color,1.0);
}`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/materials/handle/shaders/handle.vertex.js":(C,v,n)=>{n.r(v),n.d(v,{handleVertexShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="handleVertexShader",f=`precision highp float;
attribute vec3 position;
uniform vec3 positionOffset;
uniform mat4 worldViewProjection;
uniform float scale;
void main(void) {
vec4 vPos=vec4((vec3(position)+positionOffset)*scale,1.0);
gl_Position=worldViewProjection*vPos;
}`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/materials/index.js":(C,v,n)=>{n.r(v),n.d(v,{FluentBackplateMaterial:()=>p.FluentBackplateMaterial,FluentButtonMaterial:()=>r.FluentButtonMaterial,FluentMaterial:()=>s.FluentMaterial,FluentMaterialDefines:()=>s.FluentMaterialDefines,HandleMaterial:()=>f.HandleMaterial,MRDLBackplateMaterial:()=>g.MRDLBackplateMaterial,MRDLSliderBarMaterial:()=>g.MRDLSliderBarMaterial,MRDLSliderThumbMaterial:()=>g.MRDLSliderThumbMaterial});var s=n("../../../dev/gui/dist/3D/materials/fluent/index.js"),r=n("../../../dev/gui/dist/3D/materials/fluentButton/index.js"),p=n("../../../dev/gui/dist/3D/materials/fluentBackplate/index.js"),f=n("../../../dev/gui/dist/3D/materials/handle/index.js"),g=n("../../../dev/gui/dist/3D/materials/mrdl/index.js")},"../../../dev/gui/dist/3D/materials/mrdl/index.js":(C,v,n)=>{n.r(v),n.d(v,{MRDLBackplateMaterial:()=>p.MRDLBackplateMaterial,MRDLSliderBarMaterial:()=>s.MRDLSliderBarMaterial,MRDLSliderThumbMaterial:()=>r.MRDLSliderThumbMaterial});var s=n("../../../dev/gui/dist/3D/materials/mrdl/mrdlSliderBarMaterial.js"),r=n("../../../dev/gui/dist/3D/materials/mrdl/mrdlSliderThumbMaterial.js"),p=n("../../../dev/gui/dist/3D/materials/mrdl/mrdlBackplateMaterial.js")},"../../../dev/gui/dist/3D/materials/mrdl/mrdlBackglowMaterial.js":(C,v,n)=>{n.r(v),n.d(v,{MRDLBackglowMaterial:()=>e});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlBackglow.fragment.js"),g=n("../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlBackglow.vertex.js");class d extends r.MaterialDefines{constructor(){super();this._needNormals=!0,this._needUVs=!0,this.rebuild()}}class e extends r.PushMaterial{constructor(t,i){super(t,i);this.bevelRadius=.16,this.lineWidth=.16,this.absoluteSizes=!1,this.tuningMotion=0,this.motion=1,this.maxIntensity=.7,this.intensityFadeInExponent=2,this.outerFuzzStart=.04,this.outerFuzzEnd=.04,this.color=new r.Color4(.682353,.698039,1,1),this.innerColor=new r.Color4(.356863,.392157,.796078,1),this.blendExponent=1.5,this.falloff=2,this.bias=.5,this.alphaMode=r.Constants.ALPHA_ADD,this.disableDepthWrite=!0,this.backFaceCulling=!1}needAlphaBlending(){return!0}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(t,i){if(this.isFrozen&&i.effect&&i.effect._wasPreviouslyReady)return!0;i.materialDefines||(i.materialDefines=new d);const o=i.materialDefines,a=this.getScene();if(this._isReadyForSubMesh(i))return!0;const l=a.getEngine();if(r.MaterialHelper.PrepareDefinesForAttributes(t,o,!1,!1),o.isDirty){o.markAsProcessed(),a.resetCachedMaterial();const c=new r.EffectFallbacks;o.FOG&&c.addFallback(1,"FOG"),r.MaterialHelper.HandleFallbacksForShadows(o,c),o.IMAGEPROCESSINGPOSTPROCESS=a.imageProcessingConfiguration.applyByPostProcess;const h=[r.VertexBuffer.PositionKind];o.NORMAL&&h.push(r.VertexBuffer.NormalKind),o.UV1&&h.push(r.VertexBuffer.UVKind),o.UV2&&h.push(r.VertexBuffer.UV2Kind),o.VERTEXCOLOR&&h.push(r.VertexBuffer.ColorKind),o.TANGENT&&h.push(r.VertexBuffer.TangentKind),r.MaterialHelper.PrepareAttributesForInstances(h,o);const u="mrdlBackglow",m=o.toString(),b=["world","worldView","worldViewProjection","view","projection","viewProjection","cameraPosition","_Bevel_Radius_","_Line_Width_","_Absolute_Sizes_","_Tuning_Motion_","_Motion_","_Max_Intensity_","_Intensity_Fade_In_Exponent_","_Outer_Fuzz_Start_","_Outer_Fuzz_End_","_Color_","_Inner_Color_","_Blend_Exponent_","_Falloff_","_Bias_"],P=[],B=new Array;r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:b,uniformBuffersNames:B,samplers:P,defines:o,maxSimultaneousLights:4}),i.setEffect(a.getEngine().createEffect(u,{attributes:h,uniformsNames:b,uniformBuffersNames:B,samplers:P,defines:m,fallbacks:c,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},l),o)}return!i.effect||!i.effect.isReady()?!1:(o._renderId=a.getRenderId(),i.effect._wasPreviouslyReady=!0,!0)}bindForSubMesh(t,i,o){const a=this.getScene();if(!o.materialDefines)return;const c=o.effect;!c||(this._activeEffect=c,this.bindOnlyWorldMatrix(t),this._activeEffect.setMatrix("viewProjection",a.getTransformMatrix()),this._activeEffect.setVector3("cameraPosition",a.activeCamera.position),this._activeEffect.setFloat("_Bevel_Radius_",this.bevelRadius),this._activeEffect.setFloat("_Line_Width_",this.lineWidth),this._activeEffect.setFloat("_Absolute_Sizes_",this.absoluteSizes?1:0),this._activeEffect.setFloat("_Tuning_Motion_",this.tuningMotion),this._activeEffect.setFloat("_Motion_",this.motion),this._activeEffect.setFloat("_Max_Intensity_",this.maxIntensity),this._activeEffect.setFloat("_Intensity_Fade_In_Exponent_",this.intensityFadeInExponent),this._activeEffect.setFloat("_Outer_Fuzz_Start_",this.outerFuzzStart),this._activeEffect.setFloat("_Outer_Fuzz_End_",this.outerFuzzEnd),this._activeEffect.setDirectColor4("_Color_",this.color),this._activeEffect.setDirectColor4("_Inner_Color_",this.innerColor),this._activeEffect.setFloat("_Blend_Exponent_",this.blendExponent),this._activeEffect.setFloat("_Falloff_",this.falloff),this._activeEffect.setFloat("_Bias_",this.bias),this._afterBind(i,this._activeEffect))}getAnimatables(){return[]}dispose(t){super.dispose(t)}clone(t){return r.SerializationHelper.Clone(()=>new e(t,this.getScene()),this)}serialize(){const t=r.SerializationHelper.Serialize(this);return t.customType="BABYLON.MRDLBackglowMaterial",t}getClassName(){return"MRDLBackglowMaterial"}static Parse(t,i,o){return r.SerializationHelper.Parse(()=>new e(t.name,i),t,i,o)}}(0,s.__decorate)([(0,r.serialize)()],e.prototype,"bevelRadius",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"lineWidth",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"absoluteSizes",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"tuningMotion",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"motion",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"maxIntensity",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"intensityFadeInExponent",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"outerFuzzStart",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"outerFuzzEnd",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"color",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"innerColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blendExponent",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"falloff",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"bias",void 0),(0,r.RegisterClass)("BABYLON.GUI.MRDLBackglowMaterial",e)},"../../../dev/gui/dist/3D/materials/mrdl/mrdlBackplateMaterial.js":(C,v,n)=>{n.r(v),n.d(v,{MRDLBackplateMaterial:()=>e});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlBackplate.fragment.js"),g=n("../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlBackplate.vertex.js");class d extends r.MaterialDefines{constructor(){super();this.IRIDESCENCE_ENABLE=!0,this.SMOOTH_EDGES=!0,this._needNormals=!0,this.rebuild()}}class e extends r.PushMaterial{constructor(t,i){super(t,i);this.radius=.3,this.lineWidth=.003,this.absoluteSizes=!1,this._filterWidth=1,this.baseColor=new r.Color4(0,0,0,1),this.lineColor=new r.Color4(.2,.262745,.4,1),this.radiusTopLeft=1,this.radiusTopRight=1,this.radiusBottomLeft=1,this.radiusBottomRight=1,this._rate=0,this.highlightColor=new r.Color4(.239216,.435294,.827451,1),this.highlightWidth=0,this._highlightTransform=new r.Vector4(1,1,0,0),this._highlight=1,this.iridescenceIntensity=.45,this.iridescenceEdgeIntensity=1,this.iridescenceTint=new r.Color4(1,1,1,1),this._angle=-45,this.fadeOut=1,this._reflected=!0,this._frequency=1,this._verticalOffset=0,this.gradientColor=new r.Color4(.74902,.74902,.74902,1),this.topLeftGradientColor=new r.Color4(.00784314,.294118,.580392,1),this.topRightGradientColor=new r.Color4(.305882,0,1,1),this.bottomLeftGradientColor=new r.Color4(.133333,.258824,.992157,1),this.bottomRightGradientColor=new r.Color4(.176471,.176471,.619608,1),this.edgeWidth=.5,this.edgePower=1,this.edgeLineGradientBlend=.5,this.alphaMode=r.Constants.ALPHA_DISABLE,this.backFaceCulling=!1,this._iridescentMapTexture=new r.Texture(e.IRIDESCENT_MAP_TEXTURE_URL,this.getScene(),!0,!1,r.Texture.NEAREST_SAMPLINGMODE)}needAlphaBlending(){return!1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(t,i){if(this.isFrozen&&i.effect&&i.effect._wasPreviouslyReady)return!0;i.materialDefines||(i.materialDefines=new d);const o=i.materialDefines,a=this.getScene();if(this._isReadyForSubMesh(i))return!0;const l=a.getEngine();if(r.MaterialHelper.PrepareDefinesForAttributes(t,o,!1,!1),o.isDirty){o.markAsProcessed(),a.resetCachedMaterial();const c=new r.EffectFallbacks;o.FOG&&c.addFallback(1,"FOG"),r.MaterialHelper.HandleFallbacksForShadows(o,c),o.IMAGEPROCESSINGPOSTPROCESS=a.imageProcessingConfiguration.applyByPostProcess;const h=[r.VertexBuffer.PositionKind];o.NORMAL&&h.push(r.VertexBuffer.NormalKind),o.UV1&&h.push(r.VertexBuffer.UVKind),o.UV2&&h.push(r.VertexBuffer.UV2Kind),o.VERTEXCOLOR&&h.push(r.VertexBuffer.ColorKind),o.TANGENT&&h.push(r.VertexBuffer.TangentKind),r.MaterialHelper.PrepareAttributesForInstances(h,o);const u="mrdlBackplate",m=o.toString(),b=["world","viewProjection","cameraPosition","_Radius_","_Line_Width_","_Absolute_Sizes_","_Filter_Width_","_Base_Color_","_Line_Color_","_Radius_Top_Left_","_Radius_Top_Right_","_Radius_Bottom_Left_","_Radius_Bottom_Right_","_Rate_","_Highlight_Color_","_Highlight_Width_","_Highlight_Transform_","_Highlight_","_Iridescence_Intensity_","_Iridescence_Edge_Intensity_","_Iridescence_Tint_","_Iridescent_Map_","_Angle_","_Reflected_","_Frequency_","_Vertical_Offset_","_Gradient_Color_","_Top_Left_","_Top_Right_","_Bottom_Left_","_Bottom_Right_","_Edge_Width_","_Edge_Power_","_Line_Gradient_Blend_","_Fade_Out_"],P=["_Iridescent_Map_"],B=new Array;r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:b,uniformBuffersNames:B,samplers:P,defines:o,maxSimultaneousLights:4}),i.setEffect(a.getEngine().createEffect(u,{attributes:h,uniformsNames:b,uniformBuffersNames:B,samplers:P,defines:m,fallbacks:c,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},l),o)}return!i.effect||!i.effect.isReady()?!1:(o._renderId=a.getRenderId(),i.effect._wasPreviouslyReady=!0,!0)}bindForSubMesh(t,i,o){if(!o.materialDefines)return;const l=o.effect;!l||(this._activeEffect=l,this.bindOnlyWorldMatrix(t),this._activeEffect.setMatrix("viewProjection",this.getScene().getTransformMatrix()),this._activeEffect.setVector3("cameraPosition",this.getScene().activeCamera.position),this._activeEffect.setFloat("_Radius_",this.radius),this._activeEffect.setFloat("_Line_Width_",this.lineWidth),this._activeEffect.setFloat("_Absolute_Sizes_",this.absoluteSizes?1:0),this._activeEffect.setFloat("_Filter_Width_",this._filterWidth),this._activeEffect.setDirectColor4("_Base_Color_",this.baseColor),this._activeEffect.setDirectColor4("_Line_Color_",this.lineColor),this._activeEffect.setFloat("_Radius_Top_Left_",this.radiusTopLeft),this._activeEffect.setFloat("_Radius_Top_Right_",this.radiusTopRight),this._activeEffect.setFloat("_Radius_Bottom_Left_",this.radiusBottomLeft),this._activeEffect.setFloat("_Radius_Bottom_Right_",this.radiusBottomRight),this._activeEffect.setFloat("_Rate_",this._rate),this._activeEffect.setDirectColor4("_Highlight_Color_",this.highlightColor),this._activeEffect.setFloat("_Highlight_Width_",this.highlightWidth),this._activeEffect.setVector4("_Highlight_Transform_",this._highlightTransform),this._activeEffect.setFloat("_Highlight_",this._highlight),this._activeEffect.setFloat("_Iridescence_Intensity_",this.iridescenceIntensity),this._activeEffect.setFloat("_Iridescence_Edge_Intensity_",this.iridescenceEdgeIntensity),this._activeEffect.setDirectColor4("_Iridescence_Tint_",this.iridescenceTint),this._activeEffect.setTexture("_Iridescent_Map_",this._iridescentMapTexture),this._activeEffect.setFloat("_Angle_",this._angle),this._activeEffect.setFloat("_Reflected_",this._reflected?1:0),this._activeEffect.setFloat("_Frequency_",this._frequency),this._activeEffect.setFloat("_Vertical_Offset_",this._verticalOffset),this._activeEffect.setDirectColor4("_Gradient_Color_",this.gradientColor),this._activeEffect.setDirectColor4("_Top_Left_",this.topLeftGradientColor),this._activeEffect.setDirectColor4("_Top_Right_",this.topRightGradientColor),this._activeEffect.setDirectColor4("_Bottom_Left_",this.bottomLeftGradientColor),this._activeEffect.setDirectColor4("_Bottom_Right_",this.bottomRightGradientColor),this._activeEffect.setFloat("_Edge_Width_",this.edgeWidth),this._activeEffect.setFloat("_Edge_Power_",this.edgePower),this._activeEffect.setFloat("_Line_Gradient_Blend_",this.edgeLineGradientBlend),this._activeEffect.setFloat("_Fade_Out_",this.fadeOut),this._afterBind(i,this._activeEffect))}getAnimatables(){return[]}dispose(t){super.dispose(t)}clone(t){return r.SerializationHelper.Clone(()=>new e(t,this.getScene()),this)}serialize(){const t=super.serialize();return t.customType="BABYLON.MRDLBackplateMaterial",t}getClassName(){return"MRDLBackplateMaterial"}static Parse(t,i,o){return r.SerializationHelper.Parse(()=>new e(t.name,i),t,i,o)}}e.IRIDESCENT_MAP_TEXTURE_URL="https://assets.babylonjs.com/meshes/MRTK/MRDL/mrtk-mrdl-backplate-iridescence.png",(0,s.__decorate)([(0,r.serialize)()],e.prototype,"radius",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"lineWidth",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"absoluteSizes",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"baseColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"lineColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"radiusTopLeft",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"radiusTopRight",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"radiusBottomLeft",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"radiusBottomRight",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"highlightColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"highlightWidth",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"iridescenceIntensity",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"iridescenceEdgeIntensity",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"iridescenceTint",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"fadeOut",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"gradientColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"topLeftGradientColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"topRightGradientColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"bottomLeftGradientColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"bottomRightGradientColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"edgeWidth",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"edgePower",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"edgeLineGradientBlend",void 0),(0,r.RegisterClass)("BABYLON.GUI.MRDLBackplateMaterial",e)},"../../../dev/gui/dist/3D/materials/mrdl/mrdlFrontplateMaterial.js":(C,v,n)=>{n.r(v),n.d(v,{MRDLFrontplateMaterial:()=>e});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlFrontplate.fragment.js"),g=n("../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlFrontplate.vertex.js");class d extends r.MaterialDefines{constructor(){super();this.SMOOTH_EDGES=!0,this._needNormals=!0,this._needUVs=!0,this.rebuild()}}class e extends r.PushMaterial{constructor(t,i){super(t,i);this.radius=.12,this.lineWidth=.01,this.relativeToHeight=!1,this._filterWidth=1,this.edgeColor=new r.Color4(.53,.53,.53,1),this.blobEnable=!0,this.blobPosition=new r.Vector3(100,100,100),this.blobIntensity=.5,this.blobNearSize=.032,this.blobFarSize=.048,this.blobNearDistance=.008,this.blobFarDistance=.064,this.blobFadeLength=.04,this.blobInnerFade=.01,this.blobPulse=0,this.blobFade=1,this.blobPulseMaxSize=.05,this.blobEnable2=!0,this.blobPosition2=new r.Vector3(10,10.1,-.6),this.blobNearSize2=.008,this.blobInnerFade2=.1,this.blobPulse2=0,this.blobFade2=1,this.gazeIntensity=.8,this.gazeFocus=0,this.selectionFuzz=.5,this.selected=1,this.selectionFade=.2,this.selectionFadeSize=0,this.selectedDistance=.08,this.selectedFadeLength=.08,this.proximityMaxIntensity=.45,this.proximityFarDistance=.16,this.proximityNearRadius=.016,this.proximityAnisotropy=1,this.useGlobalLeftIndex=!0,this.useGlobalRightIndex=!0,this.fadeOut=1,this.alphaMode=r.Constants.ALPHA_ADD,this.disableDepthWrite=!0,this.backFaceCulling=!1,this._blobTexture=new r.Texture(e.BLOB_TEXTURE_URL,i,!0,!1,r.Texture.NEAREST_SAMPLINGMODE)}needAlphaBlending(){return!0}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(t,i){if(this.isFrozen&&i.effect&&i.effect._wasPreviouslyReady)return!0;i.materialDefines||(i.materialDefines=new d);const o=i.materialDefines,a=this.getScene();if(this._isReadyForSubMesh(i))return!0;const l=a.getEngine();if(r.MaterialHelper.PrepareDefinesForAttributes(t,o,!1,!1),o.isDirty){o.markAsProcessed(),a.resetCachedMaterial();const c=new r.EffectFallbacks;o.FOG&&c.addFallback(1,"FOG"),r.MaterialHelper.HandleFallbacksForShadows(o,c),o.IMAGEPROCESSINGPOSTPROCESS=a.imageProcessingConfiguration.applyByPostProcess;const h=[r.VertexBuffer.PositionKind];o.NORMAL&&h.push(r.VertexBuffer.NormalKind),o.UV1&&h.push(r.VertexBuffer.UVKind),o.UV2&&h.push(r.VertexBuffer.UV2Kind),o.VERTEXCOLOR&&h.push(r.VertexBuffer.ColorKind),o.TANGENT&&h.push(r.VertexBuffer.TangentKind),r.MaterialHelper.PrepareAttributesForInstances(h,o);const u="mrdlFrontplate",m=o.toString(),b=["world","worldView","worldViewProjection","view","projection","viewProjection","cameraPosition","_Radius_","_Line_Width_","_Relative_To_Height_","_Filter_Width_","_Edge_Color_","_Fade_Out_","_Smooth_Edges_","_Blob_Enable_","_Blob_Position_","_Blob_Intensity_","_Blob_Near_Size_","_Blob_Far_Size_","_Blob_Near_Distance_","_Blob_Far_Distance_","_Blob_Fade_Length_","_Blob_Inner_Fade_","_Blob_Pulse_","_Blob_Fade_","_Blob_Pulse_Max_Size_","_Blob_Enable_2_","_Blob_Position_2_","_Blob_Near_Size_2_","_Blob_Inner_Fade_2_","_Blob_Pulse_2_","_Blob_Fade_2_","_Gaze_Intensity_","_Gaze_Focus_","_Blob_Texture_","_Selection_Fuzz_","_Selected_","_Selection_Fade_","_Selection_Fade_Size_","_Selected_Distance_","_Selected_Fade_Length_","_Proximity_Max_Intensity_","_Proximity_Far_Distance_","_Proximity_Near_Radius_","_Proximity_Anisotropy_","Global_Left_Index_Tip_Position","Global_Right_Index_Tip_Position","_Use_Global_Left_Index_","_Use_Global_Right_Index_"],P=[],B=new Array;r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:b,uniformBuffersNames:B,samplers:P,defines:o,maxSimultaneousLights:4}),i.setEffect(a.getEngine().createEffect(u,{attributes:h,uniformsNames:b,uniformBuffersNames:B,samplers:P,defines:m,fallbacks:c,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},l),o)}return!i.effect||!i.effect.isReady()?!1:(o._renderId=a.getRenderId(),i.effect._wasPreviouslyReady=!0,!0)}bindForSubMesh(t,i,o){const a=this.getScene();if(!o.materialDefines)return;const c=o.effect;!c||(this._activeEffect=c,this.bindOnlyWorldMatrix(t),this._activeEffect.setMatrix("viewProjection",a.getTransformMatrix()),this._activeEffect.setVector3("cameraPosition",a.activeCamera.position),this._activeEffect.setFloat("_Radius_",this.radius),this._activeEffect.setFloat("_Line_Width_",this.lineWidth),this._activeEffect.setFloat("_Relative_To_Height_",this.relativeToHeight?1:0),this._activeEffect.setFloat("_Filter_Width_",this._filterWidth),this._activeEffect.setDirectColor4("_Edge_Color_",this.edgeColor),this._activeEffect.setFloat("_Fade_Out_",this.fadeOut),this._activeEffect.setFloat("_Blob_Enable_",this.blobEnable?1:0),this._activeEffect.setVector3("_Blob_Position_",this.blobPosition),this._activeEffect.setFloat("_Blob_Intensity_",this.blobIntensity),this._activeEffect.setFloat("_Blob_Near_Size_",this.blobNearSize),this._activeEffect.setFloat("_Blob_Far_Size_",this.blobFarSize),this._activeEffect.setFloat("_Blob_Near_Distance_",this.blobNearDistance),this._activeEffect.setFloat("_Blob_Far_Distance_",this.blobFarDistance),this._activeEffect.setFloat("_Blob_Fade_Length_",this.blobFadeLength),this._activeEffect.setFloat("_Blob_Inner_Fade_",this.blobInnerFade),this._activeEffect.setFloat("_Blob_Pulse_",this.blobPulse),this._activeEffect.setFloat("_Blob_Fade_",this.blobFade),this._activeEffect.setFloat("_Blob_Pulse_Max_Size_",this.blobPulseMaxSize),this._activeEffect.setFloat("_Blob_Enable_2_",this.blobEnable2?1:0),this._activeEffect.setVector3("_Blob_Position_2_",this.blobPosition2),this._activeEffect.setFloat("_Blob_Near_Size_2_",this.blobNearSize2),this._activeEffect.setFloat("_Blob_Inner_Fade_2_",this.blobInnerFade2),this._activeEffect.setFloat("_Blob_Pulse_2_",this.blobPulse2),this._activeEffect.setFloat("_Blob_Fade_2_",this.blobFade2),this._activeEffect.setFloat("_Gaze_Intensity_",this.gazeIntensity),this._activeEffect.setFloat("_Gaze_Focus_",this.gazeFocus),this._activeEffect.setTexture("_Blob_Texture_",this._blobTexture),this._activeEffect.setFloat("_Selection_Fuzz_",this.selectionFuzz),this._activeEffect.setFloat("_Selected_",this.selected),this._activeEffect.setFloat("_Selection_Fade_",this.selectionFade),this._activeEffect.setFloat("_Selection_Fade_Size_",this.selectionFadeSize),this._activeEffect.setFloat("_Selected_Distance_",this.selectedDistance),this._activeEffect.setFloat("_Selected_Fade_Length_",this.selectedFadeLength),this._activeEffect.setFloat("_Proximity_Max_Intensity_",this.proximityMaxIntensity),this._activeEffect.setFloat("_Proximity_Far_Distance_",this.proximityFarDistance),this._activeEffect.setFloat("_Proximity_Near_Radius_",this.proximityNearRadius),this._activeEffect.setFloat("_Proximity_Anisotropy_",this.proximityAnisotropy),this._activeEffect.setFloat("_Use_Global_Left_Index_",this.useGlobalLeftIndex?1:0),this._activeEffect.setFloat("_Use_Global_Right_Index_",this.useGlobalRightIndex?1:0),this._afterBind(i,this._activeEffect))}getAnimatables(){return[]}dispose(t){super.dispose(t)}clone(t){return r.SerializationHelper.Clone(()=>new e(t,this.getScene()),this)}serialize(){const t=r.SerializationHelper.Serialize(this);return t.customType="BABYLON.MRDLFrontplateMaterial",t}getClassName(){return"MRDLFrontplateMaterial"}static Parse(t,i,o){return r.SerializationHelper.Parse(()=>new e(t.name,i),t,i,o)}}e.BLOB_TEXTURE_URL="",(0,s.__decorate)([(0,r.serialize)()],e.prototype,"radius",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"lineWidth",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"relativeToHeight",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"edgeColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobEnable",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobPosition",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobIntensity",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobNearSize",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFarSize",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobNearDistance",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFarDistance",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFadeLength",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobInnerFade",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobPulse",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFade",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobPulseMaxSize",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobEnable2",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobPosition2",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobNearSize2",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobInnerFade2",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobPulse2",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFade2",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"gazeIntensity",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"gazeFocus",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"selectionFuzz",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"selected",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"selectionFade",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"selectionFadeSize",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"selectedDistance",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"selectedFadeLength",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"proximityMaxIntensity",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"proximityFarDistance",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"proximityNearRadius",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"proximityAnisotropy",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"useGlobalLeftIndex",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"useGlobalRightIndex",void 0),(0,r.RegisterClass)("BABYLON.GUI.MRDLFrontplateMaterial",e)},"../../../dev/gui/dist/3D/materials/mrdl/mrdlInnerquadMaterial.js":(C,v,n)=>{n.r(v),n.d(v,{MRDLInnerquadMaterial:()=>e});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlInnerquad.fragment.js"),g=n("../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlInnerquad.vertex.js");class d extends r.MaterialDefines{constructor(){super();this._needNormals=!0,this._needUVs=!0,this.rebuild()}}class e extends r.PushMaterial{constructor(t,i){super(t,i);this.color=new r.Color4(1,1,1,.05),this.radius=.12,this.fixedRadius=!0,this._filterWidth=1,this.glowFraction=0,this.glowMax=.5,this.glowFalloff=2,this.alphaMode=r.Constants.ALPHA_COMBINE,this.backFaceCulling=!1}needAlphaBlending(){return!0}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(t,i){if(this.isFrozen&&i.effect&&i.effect._wasPreviouslyReady)return!0;i.materialDefines||(i.materialDefines=new d);const o=i.materialDefines,a=this.getScene();if(this._isReadyForSubMesh(i))return!0;const l=a.getEngine();if(r.MaterialHelper.PrepareDefinesForAttributes(t,o,!0,!1),o.isDirty){o.markAsProcessed(),a.resetCachedMaterial();const c=new r.EffectFallbacks;o.FOG&&c.addFallback(1,"FOG"),r.MaterialHelper.HandleFallbacksForShadows(o,c),o.IMAGEPROCESSINGPOSTPROCESS=a.imageProcessingConfiguration.applyByPostProcess;const h=[r.VertexBuffer.PositionKind];o.NORMAL&&h.push(r.VertexBuffer.NormalKind),o.UV1&&h.push(r.VertexBuffer.UVKind),o.UV2&&h.push(r.VertexBuffer.UV2Kind),o.VERTEXCOLOR&&h.push(r.VertexBuffer.ColorKind),o.TANGENT&&h.push(r.VertexBuffer.TangentKind),r.MaterialHelper.PrepareAttributesForInstances(h,o);const u="mrdlInnerquad",m=o.toString(),b=["world","worldView","worldViewProjection","view","projection","viewProjection","cameraPosition","_Color_","_Radius_","_Fixed_Radius_","_Filter_Width_","_Glow_Fraction_","_Glow_Max_","_Glow_Falloff_"],P=[],B=new Array;r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:b,uniformBuffersNames:B,samplers:P,defines:o,maxSimultaneousLights:4}),i.setEffect(a.getEngine().createEffect(u,{attributes:h,uniformsNames:b,uniformBuffersNames:B,samplers:P,defines:m,fallbacks:c,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},l),o)}return!i.effect||!i.effect.isReady()?!1:(o._renderId=a.getRenderId(),i.effect._wasPreviouslyReady=!0,!0)}bindForSubMesh(t,i,o){const a=this.getScene();if(!o.materialDefines)return;const c=o.effect;!c||(this._activeEffect=c,this.bindOnlyWorldMatrix(t),this._activeEffect.setMatrix("viewProjection",a.getTransformMatrix()),this._activeEffect.setVector3("cameraPosition",a.activeCamera.position),this._activeEffect.setDirectColor4("_Color_",this.color),this._activeEffect.setFloat("_Radius_",this.radius),this._activeEffect.setFloat("_Fixed_Radius_",this.fixedRadius?1:0),this._activeEffect.setFloat("_Filter_Width_",this._filterWidth),this._activeEffect.setFloat("_Glow_Fraction_",this.glowFraction),this._activeEffect.setFloat("_Glow_Max_",this.glowMax),this._activeEffect.setFloat("_Glow_Falloff_",this.glowFalloff),this._afterBind(i,this._activeEffect))}getAnimatables(){return[]}dispose(t){super.dispose(t)}clone(t){return r.SerializationHelper.Clone(()=>new e(t,this.getScene()),this)}serialize(){const t=r.SerializationHelper.Serialize(this);return t.customType="BABYLON.MRDLInnerquadMaterial",t}getClassName(){return"MRDLInnerquadMaterial"}static Parse(t,i,o){return r.SerializationHelper.Parse(()=>new e(t.name,i),t,i,o)}}(0,s.__decorate)([(0,r.serialize)()],e.prototype,"color",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"radius",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"fixedRadius",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"glowFraction",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"glowMax",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"glowFalloff",void 0),(0,r.RegisterClass)("BABYLON.GUI.MRDLInnerquadMaterial",e)},"../../../dev/gui/dist/3D/materials/mrdl/mrdlSliderBarMaterial.js":(C,v,n)=>{n.r(v),n.d(v,{MRDLSliderBarMaterial:()=>e});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlSliderBar.fragment.js"),g=n("../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlSliderBar.vertex.js");class d extends r.MaterialDefines{constructor(){super();this.SKY_ENABLED=!0,this.BLOB_ENABLE_2=!0,this.IRIDESCENCE_ENABLED=!0,this._needNormals=!0,this._needUVs=!0,this.rebuild()}}class e extends r.PushMaterial{constructor(t,i){super(t,i);this.radius=.6,this.bevelFront=.6,this.bevelFrontStretch=.077,this.bevelBack=0,this.bevelBackStretch=0,this.radiusTopLeft=1,this.radiusTopRight=1,this.radiusBottomLeft=1,this.radiusBottomRight=1,this.bulgeEnabled=!1,this.bulgeHeight=-.323,this.bulgeRadius=.73,this.sunIntensity=1.102,this.sunTheta=.76,this.sunPhi=.526,this.indirectDiffuse=.658,this.albedo=new r.Color4(.0117647,.505882,.996078,1),this.specular=0,this.shininess=10,this.sharpness=0,this.subsurface=0,this.leftGradientColor=new r.Color4(.0117647,.505882,.996078,1),this.rightGradientColor=new r.Color4(.0117647,.505882,.996078,1),this.reflection=.749,this.frontReflect=0,this.edgeReflect=.09,this.power=8.13,this.skyColor=new r.Color4(.0117647,.964706,.996078,1),this.horizonColor=new r.Color4(.0117647,.333333,.996078,1),this.groundColor=new r.Color4(0,.254902,.996078,1),this.horizonPower=1,this.width=.02,this.fuzz=.5,this.minFuzz=.001,this.clipFade=.01,this.hueShift=0,this.saturationShift=0,this.valueShift=0,this.blobPosition=new r.Vector3(0,0,.1),this.blobIntensity=.5,this.blobNearSize=.01,this.blobFarSize=.03,this.blobNearDistance=0,this.blobFarDistance=.08,this.blobFadeLength=.576,this.blobPulse=0,this.blobFade=1,this.blobPosition2=new r.Vector3(.2,0,.1),this.blobNearSize2=.01,this.blobPulse2=0,this.blobFade2=1,this.blobTexture=new r.Texture("",this.getScene()),this.leftIndexPosition=new r.Vector3(0,0,1),this.rightIndexPosition=new r.Vector3(-1,-1,-1),this.leftIndexMiddlePosition=new r.Vector3(0,0,0),this.rightIndexMiddlePosition=new r.Vector3(0,0,0),this.decalScaleXY=new r.Vector2(1.5,1.5),this.decalFrontOnly=!0,this.rimIntensity=.287,this.rimHueShift=0,this.rimSaturationShift=0,this.rimValueShift=-1,this.iridescenceIntensity=0,this.useGlobalLeftIndex=1,this.useGlobalRightIndex=1,this.globalLeftIndexTipProximity=0,this.globalRightIndexTipProximity=0,this.globalLeftIndexTipPosition=new r.Vector4(.5,0,-.55,1),this.globaRightIndexTipPosition=new r.Vector4(0,0,0,1),this.globalLeftThumbTipPosition=new r.Vector4(.5,0,-.55,1),this.globalRightThumbTipPosition=new r.Vector4(0,0,0,1),this.globalLeftIndexMiddlePosition=new r.Vector4(.5,0,-.55,1),this.globalRightIndexMiddlePosition=new r.Vector4(0,0,0,1),this.alphaMode=r.Constants.ALPHA_DISABLE,this.backFaceCulling=!1,this._blueGradientTexture=new r.Texture(e.BLUE_GRADIENT_TEXTURE_URL,this.getScene(),!0,!1,r.Texture.NEAREST_SAMPLINGMODE),this._decalTexture=new r.Texture("",this.getScene()),this._reflectionMapTexture=new r.Texture("",this.getScene()),this._indirectEnvTexture=new r.Texture("",this.getScene())}needAlphaBlending(){return!1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(t,i){if(this.isFrozen&&i.effect&&i.effect._wasPreviouslyReady)return!0;i.materialDefines||(i.materialDefines=new d);const o=i.materialDefines,a=this.getScene();if(this._isReadyForSubMesh(i))return!0;const l=a.getEngine();if(r.MaterialHelper.PrepareDefinesForAttributes(t,o,!1,!1),o.isDirty){o.markAsProcessed(),a.resetCachedMaterial();const c=new r.EffectFallbacks;o.FOG&&c.addFallback(1,"FOG"),r.MaterialHelper.HandleFallbacksForShadows(o,c),o.IMAGEPROCESSINGPOSTPROCESS=a.imageProcessingConfiguration.applyByPostProcess;const h=[r.VertexBuffer.PositionKind];o.NORMAL&&h.push(r.VertexBuffer.NormalKind),o.UV1&&h.push(r.VertexBuffer.UVKind),o.UV2&&h.push(r.VertexBuffer.UV2Kind),o.VERTEXCOLOR&&h.push(r.VertexBuffer.ColorKind),o.TANGENT&&h.push(r.VertexBuffer.TangentKind),r.MaterialHelper.PrepareAttributesForInstances(h,o);const u="mrdlSliderBar",m=o.toString(),b=["world","viewProjection","cameraPosition","_Radius_","_Bevel_Front_","_Bevel_Front_Stretch_","_Bevel_Back_","_Bevel_Back_Stretch_","_Radius_Top_Left_","_Radius_Top_Right_","_Radius_Bottom_Left_","_Radius_Bottom_Right_","_Bulge_Enabled_","_Bulge_Height_","_Bulge_Radius_","_Sun_Intensity_","_Sun_Theta_","_Sun_Phi_","_Indirect_Diffuse_","_Albedo_","_Specular_","_Shininess_","_Sharpness_","_Subsurface_","_Left_Color_","_Right_Color_","_Reflection_","_Front_Reflect_","_Edge_Reflect_","_Power_","_Sky_Color_","_Horizon_Color_","_Ground_Color_","_Horizon_Power_","_Reflection_Map_","_Indirect_Environment_","_Width_","_Fuzz_","_Min_Fuzz_","_Clip_Fade_","_Hue_Shift_","_Saturation_Shift_","_Value_Shift_","_Blob_Position_","_Blob_Intensity_","_Blob_Near_Size_","_Blob_Far_Size_","_Blob_Near_Distance_","_Blob_Far_Distance_","_Blob_Fade_Length_","_Blob_Pulse_","_Blob_Fade_","_Blob_Texture_","_Blob_Position_2_","_Blob_Near_Size_2_","_Blob_Pulse_2_","_Blob_Fade_2_","_Left_Index_Pos_","_Right_Index_Pos_","_Left_Index_Middle_Pos_","_Right_Index_Middle_Pos_","_Decal_","_Decal_Scale_XY_","_Decal_Front_Only_","_Rim_Intensity_","_Rim_Texture_","_Rim_Hue_Shift_","_Rim_Saturation_Shift_","_Rim_Value_Shift_","_Iridescence_Intensity_","_Iridescence_Texture_","Use_Global_Left_Index","Use_Global_Right_Index","Global_Left_Index_Tip_Position","Global_Right_Index_Tip_Position","Global_Left_Thumb_Tip_Position","Global_Right_Thumb_Tip_Position","Global_Left_Index_Middle_Position;","Global_Right_Index_Middle_Position","Global_Left_Index_Tip_Proximity","Global_Right_Index_Tip_Proximity"],P=["_Rim_Texture_","_Iridescence_Texture_"],B=new Array;r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:b,uniformBuffersNames:B,samplers:P,defines:o,maxSimultaneousLights:4}),i.setEffect(a.getEngine().createEffect(u,{attributes:h,uniformsNames:b,uniformBuffersNames:B,samplers:P,defines:m,fallbacks:c,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},l),o,this._materialContext)}return!i.effect||!i.effect.isReady()?!1:(o._renderId=a.getRenderId(),i.effect._wasPreviouslyReady=!0,!0)}bindForSubMesh(t,i,o){if(!o.materialDefines)return;const l=o.effect;!l||(this._activeEffect=l,this.bindOnlyWorldMatrix(t),this._activeEffect.setMatrix("viewProjection",this.getScene().getTransformMatrix()),this._activeEffect.setVector3("cameraPosition",this.getScene().activeCamera.position),this._activeEffect.setFloat("_Radius_",this.radius),this._activeEffect.setFloat("_Bevel_Front_",this.bevelFront),this._activeEffect.setFloat("_Bevel_Front_Stretch_",this.bevelFrontStretch),this._activeEffect.setFloat("_Bevel_Back_",this.bevelBack),this._activeEffect.setFloat("_Bevel_Back_Stretch_",this.bevelBackStretch),this._activeEffect.setFloat("_Radius_Top_Left_",this.radiusTopLeft),this._activeEffect.setFloat("_Radius_Top_Right_",this.radiusTopRight),this._activeEffect.setFloat("_Radius_Bottom_Left_",this.radiusBottomLeft),this._activeEffect.setFloat("_Radius_Bottom_Right_",this.radiusBottomRight),this._activeEffect.setFloat("_Bulge_Enabled_",this.bulgeEnabled?1:0),this._activeEffect.setFloat("_Bulge_Height_",this.bulgeHeight),this._activeEffect.setFloat("_Bulge_Radius_",this.bulgeRadius),this._activeEffect.setFloat("_Sun_Intensity_",this.sunIntensity),this._activeEffect.setFloat("_Sun_Theta_",this.sunTheta),this._activeEffect.setFloat("_Sun_Phi_",this.sunPhi),this._activeEffect.setFloat("_Indirect_Diffuse_",this.indirectDiffuse),this._activeEffect.setDirectColor4("_Albedo_",this.albedo),this._activeEffect.setFloat("_Specular_",this.specular),this._activeEffect.setFloat("_Shininess_",this.shininess),this._activeEffect.setFloat("_Sharpness_",this.sharpness),this._activeEffect.setFloat("_Subsurface_",this.subsurface),this._activeEffect.setDirectColor4("_Left_Color_",this.leftGradientColor),this._activeEffect.setDirectColor4("_Right_Color_",this.rightGradientColor),this._activeEffect.setFloat("_Reflection_",this.reflection),this._activeEffect.setFloat("_Front_Reflect_",this.frontReflect),this._activeEffect.setFloat("_Edge_Reflect_",this.edgeReflect),this._activeEffect.setFloat("_Power_",this.power),this._activeEffect.setDirectColor4("_Sky_Color_",this.skyColor),this._activeEffect.setDirectColor4("_Horizon_Color_",this.horizonColor),this._activeEffect.setDirectColor4("_Ground_Color_",this.groundColor),this._activeEffect.setFloat("_Horizon_Power_",this.horizonPower),this._activeEffect.setTexture("_Reflection_Map_",this._reflectionMapTexture),this._activeEffect.setTexture("_Indirect_Environment_",this._indirectEnvTexture),this._activeEffect.setFloat("_Width_",this.width),this._activeEffect.setFloat("_Fuzz_",this.fuzz),this._activeEffect.setFloat("_Min_Fuzz_",this.minFuzz),this._activeEffect.setFloat("_Clip_Fade_",this.clipFade),this._activeEffect.setFloat("_Hue_Shift_",this.hueShift),this._activeEffect.setFloat("_Saturation_Shift_",this.saturationShift),this._activeEffect.setFloat("_Value_Shift_",this.valueShift),this._activeEffect.setVector3("_Blob_Position_",this.blobPosition),this._activeEffect.setFloat("_Blob_Intensity_",this.blobIntensity),this._activeEffect.setFloat("_Blob_Near_Size_",this.blobNearSize),this._activeEffect.setFloat("_Blob_Far_Size_",this.blobFarSize),this._activeEffect.setFloat("_Blob_Near_Distance_",this.blobNearDistance),this._activeEffect.setFloat("_Blob_Far_Distance_",this.blobFarDistance),this._activeEffect.setFloat("_Blob_Fade_Length_",this.blobFadeLength),this._activeEffect.setFloat("_Blob_Pulse_",this.blobPulse),this._activeEffect.setFloat("_Blob_Fade_",this.blobFade),this._activeEffect.setTexture("_Blob_Texture_",this.blobTexture),this._activeEffect.setVector3("_Blob_Position_2_",this.blobPosition2),this._activeEffect.setFloat("_Blob_Near_Size_2_",this.blobNearSize2),this._activeEffect.setFloat("_Blob_Pulse_2_",this.blobPulse2),this._activeEffect.setFloat("_Blob_Fade_2_",this.blobFade2),this._activeEffect.setVector3("_Left_Index_Pos_",this.leftIndexPosition),this._activeEffect.setVector3("_Right_Index_Pos_",this.rightIndexPosition),this._activeEffect.setVector3("_Left_Index_Middle_Pos_",this.leftIndexMiddlePosition),this._activeEffect.setVector3("_Right_Index_Middle_Pos_",this.rightIndexMiddlePosition),this._activeEffect.setTexture("_Decal_",this._decalTexture),this._activeEffect.setVector2("_Decal_Scale_XY_",this.decalScaleXY),this._activeEffect.setFloat("_Decal_Front_Only_",this.decalFrontOnly?1:0),this._activeEffect.setFloat("_Rim_Intensity_",this.rimIntensity),this._activeEffect.setTexture("_Rim_Texture_",this._blueGradientTexture),this._activeEffect.setFloat("_Rim_Hue_Shift_",this.rimHueShift),this._activeEffect.setFloat("_Rim_Saturation_Shift_",this.rimSaturationShift),this._activeEffect.setFloat("_Rim_Value_Shift_",this.rimValueShift),this._activeEffect.setFloat("_Iridescence_Intensity_",this.iridescenceIntensity),this._activeEffect.setTexture("_Iridescence_Texture_",this._blueGradientTexture),this._activeEffect.setFloat("Use_Global_Left_Index",this.useGlobalLeftIndex),this._activeEffect.setFloat("Use_Global_Right_Index",this.useGlobalRightIndex),this._activeEffect.setVector4("Global_Left_Index_Tip_Position",this.globalLeftIndexTipPosition),this._activeEffect.setVector4("Global_Right_Index_Tip_Position",this.globaRightIndexTipPosition),this._activeEffect.setVector4("Global_Left_Thumb_Tip_Position",this.globalLeftThumbTipPosition),this._activeEffect.setVector4("Global_Right_Thumb_Tip_Position",this.globalRightThumbTipPosition),this._activeEffect.setVector4("Global_Left_Index_Middle_Position",this.globalLeftIndexMiddlePosition),this._activeEffect.setVector4("Global_Right_Index_Middle_Position",this.globalRightIndexMiddlePosition),this._activeEffect.setFloat("Global_Left_Index_Tip_Proximity",this.globalLeftIndexTipProximity),this._activeEffect.setFloat("Global_Right_Index_Tip_Proximity",this.globalRightIndexTipProximity),this._afterBind(i,this._activeEffect))}getAnimatables(){return[]}dispose(t){super.dispose(t),this._reflectionMapTexture.dispose(),this._indirectEnvTexture.dispose(),this._blueGradientTexture.dispose(),this._decalTexture.dispose()}clone(t){return r.SerializationHelper.Clone(()=>new e(t,this.getScene()),this)}serialize(){const t=super.serialize();return t.customType="BABYLON.MRDLSliderBarMaterial",t}getClassName(){return"MRDLSliderBarMaterial"}static Parse(t,i,o){return r.SerializationHelper.Parse(()=>new e(t.name,i),t,i,o)}}e.BLUE_GRADIENT_TEXTURE_URL="https://assets.babylonjs.com/meshes/MRTK/MRDL/mrtk-mrdl-blue-gradient.png",(0,s.__decorate)([(0,r.serialize)()],e.prototype,"radius",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"bevelFront",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"bevelFrontStretch",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"bevelBack",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"bevelBackStretch",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"radiusTopLeft",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"radiusTopRight",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"radiusBottomLeft",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"radiusBottomRight",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"bulgeEnabled",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"bulgeHeight",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"bulgeRadius",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"sunIntensity",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"sunTheta",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"sunPhi",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"indirectDiffuse",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"albedo",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"specular",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"shininess",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"sharpness",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"subsurface",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"leftGradientColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rightGradientColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"reflection",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"frontReflect",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"edgeReflect",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"power",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"skyColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"horizonColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"groundColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"horizonPower",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"width",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"fuzz",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"minFuzz",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"clipFade",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"hueShift",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"saturationShift",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"valueShift",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobPosition",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobIntensity",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobNearSize",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFarSize",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobNearDistance",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFarDistance",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFadeLength",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobPulse",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFade",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobPosition2",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobNearSize2",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobPulse2",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFade2",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobTexture",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"leftIndexPosition",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rightIndexPosition",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"leftIndexMiddlePosition",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rightIndexMiddlePosition",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"decalScaleXY",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"decalFrontOnly",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rimIntensity",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rimHueShift",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rimSaturationShift",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rimValueShift",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"iridescenceIntensity",void 0),(0,r.RegisterClass)("BABYLON.GUI.MRDLSliderBarMaterial",e)},"../../../dev/gui/dist/3D/materials/mrdl/mrdlSliderThumbMaterial.js":(C,v,n)=>{n.r(v),n.d(v,{MRDLSliderThumbMaterial:()=>e});var s=n("../../../../node_modules/tslib/tslib.es6.mjs"),r=n("core/Misc/observable"),p=n.n(r),f=n("../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlSliderThumb.fragment.js"),g=n("../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlSliderThumb.vertex.js");class d extends r.MaterialDefines{constructor(){super();this.SKY_ENABLED=!0,this.BLOB_ENABLE_2=!0,this.IRIDESCENCE_ENABLED=!0,this._needNormals=!0,this._needUVs=!0,this.rebuild()}}class e extends r.PushMaterial{constructor(t,i){super(t,i);this.radius=.157,this.bevelFront=.065,this.bevelFrontStretch=.077,this.bevelBack=.031,this.bevelBackStretch=0,this.radiusTopLeft=1,this.radiusTopRight=1,this.radiusBottomLeft=1,this.radiusBottomRight=1,this.bulgeEnabled=!1,this.bulgeHeight=-.323,this.bulgeRadius=.73,this.sunIntensity=2,this.sunTheta=.937,this.sunPhi=.555,this.indirectDiffuse=1,this.albedo=new r.Color4(.0117647,.505882,.996078,1),this.specular=0,this.shininess=10,this.sharpness=0,this.subsurface=.31,this.leftGradientColor=new r.Color4(.0117647,.505882,.996078,1),this.rightGradientColor=new r.Color4(.0117647,.505882,.996078,1),this.reflection=.749,this.frontReflect=0,this.edgeReflect=.09,this.power=8.1,this.skyColor=new r.Color4(.0117647,.960784,.996078,1),this.horizonColor=new r.Color4(.0117647,.333333,.996078,1),this.groundColor=new r.Color4(0,.254902,.996078,1),this.horizonPower=1,this.width=.02,this.fuzz=.5,this.minFuzz=.001,this.clipFade=.01,this.hueShift=0,this.saturationShift=0,this.valueShift=0,this.blobPosition=new r.Vector3(0,0,.1),this.blobIntensity=.5,this.blobNearSize=.01,this.blobFarSize=.03,this.blobNearDistance=0,this.blobFarDistance=.08,this.blobFadeLength=.576,this.blobPulse=0,this.blobFade=1,this.blobPosition2=new r.Vector3(.2,0,.1),this.blobNearSize2=.01,this.blobPulse2=0,this.blobFade2=1,this.blobTexture=new r.Texture("",this.getScene()),this.leftIndexPosition=new r.Vector3(0,0,1),this.rightIndexPosition=new r.Vector3(-1,-1,-1),this.leftIndexMiddlePosition=new r.Vector3(0,0,0),this.rightIndexMiddlePosition=new r.Vector3(0,0,0),this.decalScaleXY=new r.Vector2(1.5,1.5),this.decalFrontOnly=!0,this.rimIntensity=.287,this.rimHueShift=0,this.rimSaturationShift=0,this.rimValueShift=-1,this.iridescenceIntensity=0,this.useGlobalLeftIndex=1,this.useGlobalRightIndex=1,this.globalLeftIndexTipProximity=0,this.globalRightIndexTipProximity=0,this.globalLeftIndexTipPosition=new r.Vector4(.5,0,-.55,1),this.globaRightIndexTipPosition=new r.Vector4(0,0,0,1),this.globalLeftThumbTipPosition=new r.Vector4(.5,0,-.55,1),this.globalRightThumbTipPosition=new r.Vector4(0,0,0,1),this.globalLeftIndexMiddlePosition=new r.Vector4(.5,0,-.55,1),this.globalRightIndexMiddlePosition=new r.Vector4(0,0,0,1),this.alphaMode=r.Constants.ALPHA_DISABLE,this.backFaceCulling=!1,this._blueGradientTexture=new r.Texture(e.BLUE_GRADIENT_TEXTURE_URL,i,!0,!1,r.Texture.NEAREST_SAMPLINGMODE),this._decalTexture=new r.Texture("",this.getScene()),this._reflectionMapTexture=new r.Texture("",this.getScene()),this._indirectEnvTexture=new r.Texture("",this.getScene())}needAlphaBlending(){return!1}needAlphaTesting(){return!1}getAlphaTestTexture(){return null}isReadyForSubMesh(t,i){if(this.isFrozen&&i.effect&&i.effect._wasPreviouslyReady)return!0;i.materialDefines||(i.materialDefines=new d);const o=i.materialDefines,a=this.getScene();if(this._isReadyForSubMesh(i))return!0;const l=a.getEngine();if(r.MaterialHelper.PrepareDefinesForAttributes(t,o,!1,!1),o.isDirty){o.markAsProcessed(),a.resetCachedMaterial();const c=new r.EffectFallbacks;o.FOG&&c.addFallback(1,"FOG"),r.MaterialHelper.HandleFallbacksForShadows(o,c),o.IMAGEPROCESSINGPOSTPROCESS=a.imageProcessingConfiguration.applyByPostProcess;const h=[r.VertexBuffer.PositionKind];o.NORMAL&&h.push(r.VertexBuffer.NormalKind),o.UV1&&h.push(r.VertexBuffer.UVKind),o.UV2&&h.push(r.VertexBuffer.UV2Kind),o.VERTEXCOLOR&&h.push(r.VertexBuffer.ColorKind),o.TANGENT&&h.push(r.VertexBuffer.TangentKind),r.MaterialHelper.PrepareAttributesForInstances(h,o);const u="mrdlSliderThumb",m=o.toString(),b=["world","viewProjection","cameraPosition","_Radius_","_Bevel_Front_","_Bevel_Front_Stretch_","_Bevel_Back_","_Bevel_Back_Stretch_","_Radius_Top_Left_","_Radius_Top_Right_","_Radius_Bottom_Left_","_Radius_Bottom_Right_","_Bulge_Enabled_","_Bulge_Height_","_Bulge_Radius_","_Sun_Intensity_","_Sun_Theta_","_Sun_Phi_","_Indirect_Diffuse_","_Albedo_","_Specular_","_Shininess_","_Sharpness_","_Subsurface_","_Left_Color_","_Right_Color_","_Reflection_","_Front_Reflect_","_Edge_Reflect_","_Power_","_Sky_Color_","_Horizon_Color_","_Ground_Color_","_Horizon_Power_","_Reflection_Map_","_Indirect_Environment_","_Width_","_Fuzz_","_Min_Fuzz_","_Clip_Fade_","_Hue_Shift_","_Saturation_Shift_","_Value_Shift_","_Blob_Position_","_Blob_Intensity_","_Blob_Near_Size_","_Blob_Far_Size_","_Blob_Near_Distance_","_Blob_Far_Distance_","_Blob_Fade_Length_","_Blob_Pulse_","_Blob_Fade_","_Blob_Texture_","_Blob_Position_2_","_Blob_Near_Size_2_","_Blob_Pulse_2_","_Blob_Fade_2_","_Left_Index_Pos_","_Right_Index_Pos_","_Left_Index_Middle_Pos_","_Right_Index_Middle_Pos_","_Decal_","_Decal_Scale_XY_","_Decal_Front_Only_","_Rim_Intensity_","_Rim_Texture_","_Rim_Hue_Shift_","_Rim_Saturation_Shift_","_Rim_Value_Shift_","_Iridescence_Intensity_","_Iridescence_Texture_","Use_Global_Left_Index","Use_Global_Right_Index","Global_Left_Index_Tip_Position","Global_Right_Index_Tip_Position","Global_Left_Thumb_Tip_Position","Global_Right_Thumb_Tip_Position","Global_Left_Index_Middle_Position;","Global_Right_Index_Middle_Position","Global_Left_Index_Tip_Proximity","Global_Right_Index_Tip_Proximity"],P=["_Rim_Texture_","_Iridescence_Texture_"],B=new Array;r.MaterialHelper.PrepareUniformsAndSamplersList({uniformsNames:b,uniformBuffersNames:B,samplers:P,defines:o,maxSimultaneousLights:4}),i.setEffect(a.getEngine().createEffect(u,{attributes:h,uniformsNames:b,uniformBuffersNames:B,samplers:P,defines:m,fallbacks:c,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{maxSimultaneousLights:4}},l),o)}return!i.effect||!i.effect.isReady()?!1:(o._renderId=a.getRenderId(),i.effect._wasPreviouslyReady=!0,!0)}bindForSubMesh(t,i,o){if(!o.materialDefines)return;const l=o.effect;!l||(this._activeEffect=l,this.bindOnlyWorldMatrix(t),this._activeEffect.setMatrix("viewProjection",this.getScene().getTransformMatrix()),this._activeEffect.setVector3("cameraPosition",this.getScene().activeCamera.position),this._activeEffect.setFloat("_Radius_",this.radius),this._activeEffect.setFloat("_Bevel_Front_",this.bevelFront),this._activeEffect.setFloat("_Bevel_Front_Stretch_",this.bevelFrontStretch),this._activeEffect.setFloat("_Bevel_Back_",this.bevelBack),this._activeEffect.setFloat("_Bevel_Back_Stretch_",this.bevelBackStretch),this._activeEffect.setFloat("_Radius_Top_Left_",this.radiusTopLeft),this._activeEffect.setFloat("_Radius_Top_Right_",this.radiusTopRight),this._activeEffect.setFloat("_Radius_Bottom_Left_",this.radiusBottomLeft),this._activeEffect.setFloat("_Radius_Bottom_Right_",this.radiusBottomRight),this._activeEffect.setFloat("_Bulge_Enabled_",this.bulgeEnabled?1:0),this._activeEffect.setFloat("_Bulge_Height_",this.bulgeHeight),this._activeEffect.setFloat("_Bulge_Radius_",this.bulgeRadius),this._activeEffect.setFloat("_Sun_Intensity_",this.sunIntensity),this._activeEffect.setFloat("_Sun_Theta_",this.sunTheta),this._activeEffect.setFloat("_Sun_Phi_",this.sunPhi),this._activeEffect.setFloat("_Indirect_Diffuse_",this.indirectDiffuse),this._activeEffect.setDirectColor4("_Albedo_",this.albedo),this._activeEffect.setFloat("_Specular_",this.specular),this._activeEffect.setFloat("_Shininess_",this.shininess),this._activeEffect.setFloat("_Sharpness_",this.sharpness),this._activeEffect.setFloat("_Subsurface_",this.subsurface),this._activeEffect.setDirectColor4("_Left_Color_",this.leftGradientColor),this._activeEffect.setDirectColor4("_Right_Color_",this.rightGradientColor),this._activeEffect.setFloat("_Reflection_",this.reflection),this._activeEffect.setFloat("_Front_Reflect_",this.frontReflect),this._activeEffect.setFloat("_Edge_Reflect_",this.edgeReflect),this._activeEffect.setFloat("_Power_",this.power),this._activeEffect.setDirectColor4("_Sky_Color_",this.skyColor),this._activeEffect.setDirectColor4("_Horizon_Color_",this.horizonColor),this._activeEffect.setDirectColor4("_Ground_Color_",this.groundColor),this._activeEffect.setFloat("_Horizon_Power_",this.horizonPower),this._activeEffect.setTexture("_Reflection_Map_",this._reflectionMapTexture),this._activeEffect.setTexture("_Indirect_Environment_",this._indirectEnvTexture),this._activeEffect.setFloat("_Width_",this.width),this._activeEffect.setFloat("_Fuzz_",this.fuzz),this._activeEffect.setFloat("_Min_Fuzz_",this.minFuzz),this._activeEffect.setFloat("_Clip_Fade_",this.clipFade),this._activeEffect.setFloat("_Hue_Shift_",this.hueShift),this._activeEffect.setFloat("_Saturation_Shift_",this.saturationShift),this._activeEffect.setFloat("_Value_Shift_",this.valueShift),this._activeEffect.setVector3("_Blob_Position_",this.blobPosition),this._activeEffect.setFloat("_Blob_Intensity_",this.blobIntensity),this._activeEffect.setFloat("_Blob_Near_Size_",this.blobNearSize),this._activeEffect.setFloat("_Blob_Far_Size_",this.blobFarSize),this._activeEffect.setFloat("_Blob_Near_Distance_",this.blobNearDistance),this._activeEffect.setFloat("_Blob_Far_Distance_",this.blobFarDistance),this._activeEffect.setFloat("_Blob_Fade_Length_",this.blobFadeLength),this._activeEffect.setFloat("_Blob_Pulse_",this.blobPulse),this._activeEffect.setFloat("_Blob_Fade_",this.blobFade),this._activeEffect.setTexture("_Blob_Texture_",this.blobTexture),this._activeEffect.setVector3("_Blob_Position_2_",this.blobPosition2),this._activeEffect.setFloat("_Blob_Near_Size_2_",this.blobNearSize2),this._activeEffect.setFloat("_Blob_Pulse_2_",this.blobPulse2),this._activeEffect.setFloat("_Blob_Fade_2_",this.blobFade2),this._activeEffect.setVector3("_Left_Index_Pos_",this.leftIndexPosition),this._activeEffect.setVector3("_Right_Index_Pos_",this.rightIndexPosition),this._activeEffect.setVector3("_Left_Index_Middle_Pos_",this.leftIndexMiddlePosition),this._activeEffect.setVector3("_Right_Index_Middle_Pos_",this.rightIndexMiddlePosition),this._activeEffect.setTexture("_Decal_",this._decalTexture),this._activeEffect.setVector2("_Decal_Scale_XY_",this.decalScaleXY),this._activeEffect.setFloat("_Decal_Front_Only_",this.decalFrontOnly?1:0),this._activeEffect.setFloat("_Rim_Intensity_",this.rimIntensity),this._activeEffect.setTexture("_Rim_Texture_",this._blueGradientTexture),this._activeEffect.setFloat("_Rim_Hue_Shift_",this.rimHueShift),this._activeEffect.setFloat("_Rim_Saturation_Shift_",this.rimSaturationShift),this._activeEffect.setFloat("_Rim_Value_Shift_",this.rimValueShift),this._activeEffect.setFloat("_Iridescence_Intensity_",this.iridescenceIntensity),this._activeEffect.setTexture("_Iridescence_Texture_",this._blueGradientTexture),this._activeEffect.setFloat("Use_Global_Left_Index",this.useGlobalLeftIndex),this._activeEffect.setFloat("Use_Global_Right_Index",this.useGlobalRightIndex),this._activeEffect.setVector4("Global_Left_Index_Tip_Position",this.globalLeftIndexTipPosition),this._activeEffect.setVector4("Global_Right_Index_Tip_Position",this.globaRightIndexTipPosition),this._activeEffect.setVector4("Global_Left_Thumb_Tip_Position",this.globalLeftThumbTipPosition),this._activeEffect.setVector4("Global_Right_Thumb_Tip_Position",this.globalRightThumbTipPosition),this._activeEffect.setVector4("Global_Left_Index_Middle_Position",this.globalLeftIndexMiddlePosition),this._activeEffect.setVector4("Global_Right_Index_Middle_Position",this.globalRightIndexMiddlePosition),this._activeEffect.setFloat("Global_Left_Index_Tip_Proximity",this.globalLeftIndexTipProximity),this._activeEffect.setFloat("Global_Right_Index_Tip_Proximity",this.globalRightIndexTipProximity),this._afterBind(i,this._activeEffect))}getAnimatables(){return[]}dispose(t){super.dispose(t),this._reflectionMapTexture.dispose(),this._indirectEnvTexture.dispose(),this._blueGradientTexture.dispose(),this._decalTexture.dispose()}clone(t){return r.SerializationHelper.Clone(()=>new e(t,this.getScene()),this)}serialize(){const t=super.serialize();return t.customType="BABYLON.MRDLSliderThumbMaterial",t}getClassName(){return"MRDLSliderThumbMaterial"}static Parse(t,i,o){return r.SerializationHelper.Parse(()=>new e(t.name,i),t,i,o)}}e.BLUE_GRADIENT_TEXTURE_URL="https://assets.babylonjs.com/meshes/MRTK/MRDL/mrtk-mrdl-blue-gradient.png",(0,s.__decorate)([(0,r.serialize)()],e.prototype,"radius",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"bevelFront",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"bevelFrontStretch",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"bevelBack",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"bevelBackStretch",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"radiusTopLeft",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"radiusTopRight",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"radiusBottomLeft",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"radiusBottomRight",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"bulgeEnabled",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"bulgeHeight",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"bulgeRadius",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"sunIntensity",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"sunTheta",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"sunPhi",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"indirectDiffuse",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"albedo",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"specular",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"shininess",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"sharpness",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"subsurface",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"leftGradientColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rightGradientColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"reflection",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"frontReflect",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"edgeReflect",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"power",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"skyColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"horizonColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"groundColor",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"horizonPower",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"width",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"fuzz",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"minFuzz",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"clipFade",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"hueShift",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"saturationShift",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"valueShift",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobPosition",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobIntensity",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobNearSize",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFarSize",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobNearDistance",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFarDistance",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFadeLength",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobPulse",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFade",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobPosition2",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobNearSize2",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobPulse2",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobFade2",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"blobTexture",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"leftIndexPosition",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rightIndexPosition",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"leftIndexMiddlePosition",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rightIndexMiddlePosition",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"decalScaleXY",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"decalFrontOnly",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rimIntensity",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rimHueShift",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rimSaturationShift",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"rimValueShift",void 0),(0,s.__decorate)([(0,r.serialize)()],e.prototype,"iridescenceIntensity",void 0),(0,r.RegisterClass)("BABYLON.GUI.MRDLSliderThumbMaterial",e)},"../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlBackglow.fragment.js":(C,v,n)=>{n.r(v),n.d(v,{mrdlBackglowPixelShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="mrdlBackglowPixelShader",f=`uniform vec3 cameraPosition;
varying vec3 vNormal;
varying vec2 vUV;
uniform float _Bevel_Radius_;
uniform float _Line_Width_;
uniform bool _Absolute_Sizes_;
uniform float _Tuning_Motion_;
uniform float _Motion_;
uniform float _Max_Intensity_;
uniform float _Intensity_Fade_In_Exponent_;
uniform float _Outer_Fuzz_Start_;
uniform float _Outer_Fuzz_End_;
uniform vec4 _Color_;
uniform vec4 _Inner_Color_;
uniform float _Blend_Exponent_;
uniform float _Falloff_;
uniform float _Bias_;
float BiasFunc(float b,float v) {
return pow(v,log(clamp(b,0.001,0.999))/log(0.5));
}
void Fuzzy_Round_Rect_B33(
float Size_X,
float Size_Y,
float Radius_X,
float Radius_Y,
float Line_Width,
vec2 UV,
float Outer_Fuzz,
float Max_Outer_Fuzz,
out float Rect_Distance,
out float Inner_Distance)
{
vec2 halfSize=vec2(Size_X,Size_Y)*0.5;
vec2 r=max(min(vec2(Radius_X,Radius_Y),halfSize),vec2(0.001,0.001));
float radius=min(r.x,r.y)-Max_Outer_Fuzz;
vec2 v=abs(UV);
vec2 nearestp=min(v,halfSize-r);
float d=distance(nearestp,v);
Inner_Distance=clamp(1.0-(radius-d)/Line_Width,0.0,1.0);
Rect_Distance=clamp(1.0-(d-radius)/Outer_Fuzz,0.0,1.0)*Inner_Distance;
}
void main()
{
float X_Q42;
float Y_Q42;
X_Q42=vNormal.x;
Y_Q42=vNormal.y;
float MaxAB_Q24=max(_Tuning_Motion_,_Motion_);
float Sqrt_F_Q27=sqrt(MaxAB_Q24);
float Power_Q43=pow(MaxAB_Q24,_Intensity_Fade_In_Exponent_);
float Value_At_T_Q26=mix(_Outer_Fuzz_Start_,_Outer_Fuzz_End_,Sqrt_F_Q27);
float Product_Q23=_Max_Intensity_*Power_Q43;
float Rect_Distance_Q33;
float Inner_Distance_Q33;
Fuzzy_Round_Rect_B33(X_Q42,Y_Q42,_Bevel_Radius_,_Bevel_Radius_,_Line_Width_,vUV,Value_At_T_Q26,_Outer_Fuzz_Start_,Rect_Distance_Q33,Inner_Distance_Q33);
float Power_Q44=pow(Inner_Distance_Q33,_Blend_Exponent_);
float Result_Q45=pow(BiasFunc(_Bias_,Rect_Distance_Q33),_Falloff_);
vec4 Color_At_T_Q25=mix(_Inner_Color_,_Color_,Power_Q44);
float Product_Q22=Result_Q45*Product_Q23;
vec4 Result_Q28=Product_Q22*Color_At_T_Q25;
vec4 Out_Color=Result_Q28;
float Clip_Threshold=0.0;
gl_FragColor=Out_Color;
}`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlBackglow.vertex.js":(C,v,n)=>{n.r(v),n.d(v,{mrdlBackglowVertexShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="mrdlBackglowVertexShader",f=`uniform mat4 world;
uniform mat4 viewProjection;
uniform vec3 cameraPosition;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec3 tangent;
uniform float _Bevel_Radius_;
uniform float _Line_Width_;
uniform bool _Absolute_Sizes_;
uniform float _Tuning_Motion_;
uniform float _Motion_;
uniform float _Max_Intensity_;
uniform float _Intensity_Fade_In_Exponent_;
uniform float _Outer_Fuzz_Start_;
uniform float _Outer_Fuzz_End_;
uniform vec4 _Color_;
uniform vec4 _Inner_Color_;
uniform float _Blend_Exponent_;
uniform float _Falloff_;
uniform float _Bias_;
varying vec3 vNormal;
varying vec2 vUV;
void main()
{
vec3 Dir_World_Q41=(world*vec4(tangent,0.0)).xyz;
vec3 Dir_World_Q40=(world*vec4((cross(normal,tangent)),0.0)).xyz;
float MaxAB_Q24=max(_Tuning_Motion_,_Motion_);
float Length_Q16=length(Dir_World_Q41);
float Length_Q17=length(Dir_World_Q40);
bool Greater_Than_Q37=MaxAB_Q24>0.0;
vec3 Sizes_Q35;
vec2 XY_Q35;
Sizes_Q35=(_Absolute_Sizes_ ? vec3(Length_Q16,Length_Q17,0) : vec3(Length_Q16/Length_Q17,1,0));
XY_Q35=(uv-vec2(0.5,0.5))*Sizes_Q35.xy;
vec3 Result_Q38=Greater_Than_Q37 ? position : vec3(0,0,0);
vec3 Pos_World_Q39=(world*vec4(Result_Q38,1.0)).xyz;
vec3 Position=Pos_World_Q39;
vec3 Normal=Sizes_Q35;
vec2 UV=XY_Q35;
vec3 Tangent=vec3(0,0,0);
vec3 Binormal=vec3(0,0,0);
vec4 Color=vec4(1,1,1,1);
gl_Position=viewProjection*vec4(Position,1);
vNormal=Normal;
vUV=UV;
}`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlBackplate.fragment.js":(C,v,n)=>{n.r(v),n.d(v,{mrdlBackplatePixelShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="mrdlBackplatePixelShader",f=`uniform vec3 cameraPosition;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vExtra1;
varying vec4 vExtra2;
uniform float _Radius_;
uniform float _Line_Width_;
uniform bool _Absolute_Sizes_;
uniform float _Filter_Width_;
uniform vec4 _Base_Color_;
uniform vec4 _Line_Color_;
uniform float _Radius_Top_Left_;
uniform float _Radius_Top_Right_;
uniform float _Radius_Bottom_Left_;
uniform float _Radius_Bottom_Right_;
uniform float _Rate_;
uniform vec4 _Highlight_Color_;
uniform float _Highlight_Width_;
uniform vec4 _Highlight_Transform_;
uniform float _Highlight_;
uniform float _Iridescence_Intensity_;
uniform float _Iridescence_Edge_Intensity_;
uniform vec4 _Iridescence_Tint_;
uniform sampler2D _Iridescent_Map_;
uniform float _Angle_;
uniform bool _Reflected_;
uniform float _Frequency_;
uniform float _Vertical_Offset_;
uniform vec4 _Gradient_Color_;
uniform vec4 _Top_Left_;
uniform vec4 _Top_Right_;
uniform vec4 _Bottom_Left_;
uniform vec4 _Bottom_Right_;
uniform float _Edge_Width_;
uniform float _Edge_Power_;
uniform float _Line_Gradient_Blend_;
uniform float _Fade_Out_;
void FastLinearTosRGB_B353(
vec4 Linear,
out vec4 sRGB)
{
sRGB.rgb=sqrt(clamp(Linear.rgb,0.0,1.0));
sRGB.a=Linear.a;
}
void Round_Rect_Fragment_B332(
float Radius,
float Line_Width,
vec4 Line_Color,
float Filter_Width,
vec2 UV,
float Line_Visibility,
vec4 Rect_Parms,
vec4 Fill_Color,
out vec4 Color)
{
float d=length(max(abs(UV)-Rect_Parms.xy,0.0));
float dx=max(fwidth(d)*Filter_Width,0.00001);
float g=min(Rect_Parms.z,Rect_Parms.w);
float dgrad=max(fwidth(g)*Filter_Width,0.00001);
float Inside_Rect=clamp(g/dgrad,0.0,1.0);
float inner=clamp((d+dx*0.5-max(Radius-Line_Width,d-dx*0.5))/dx,0.0,1.0);
Color=clamp(mix(Fill_Color,Line_Color,inner),0.0,1.0)*Inside_Rect;
}
void Iridescence_B343(
vec3 Position,
vec3 Normal,
vec2 UV,
vec3 Axis,
vec3 Eye,
vec4 Tint,
sampler2D Texture,
bool Reflected,
float Frequency,
float Vertical_Offset,
out vec4 Color)
{
vec3 i=normalize(Position-Eye);
vec3 r=reflect(i,Normal);
float idota=dot(i,Axis);
float idotr=dot(i,r);
float x=Reflected ? idotr : idota;
vec2 xy;
xy.x=fract((x*Frequency+1.0)*0.5+UV.y*Vertical_Offset);
xy.y=0.5;
Color=texture(Texture,xy);
Color.rgb*=Tint.rgb;
}
void Scale_RGB_B346(
vec4 Color,
float Scalar,
out vec4 Result)
{
Result=vec4(Scalar,Scalar,Scalar,1)*Color;
}
void Scale_RGB_B344(
float Scalar,
vec4 Color,
out vec4 Result)
{
Result=vec4(Scalar,Scalar,Scalar,1)*Color;
}
void Line_Fragment_B362(
vec4 Base_Color,
vec4 Highlight_Color,
float Highlight_Width,
vec3 Line_Vertex,
float Highlight,
out vec4 Line_Color)
{
float k2=1.0-clamp(abs(Line_Vertex.y/Highlight_Width),0.0,1.0);
Line_Color=mix(Base_Color,Highlight_Color,Highlight*k2);
}
void Edge_B356(
vec4 RectParms,
float Radius,
float Line_Width,
vec2 UV,
float Edge_Width,
float Edge_Power,
out float Result)
{
float d=length(max(abs(UV)-RectParms.xy,0.0));
float edge=1.0-clamp((1.0-d/(Radius-Line_Width))/Edge_Width,0.0,1.0);
Result=pow(edge,Edge_Power);
}
void Gradient_B355(
vec4 Gradient_Color,
vec4 Top_Left,
vec4 Top_Right,
vec4 Bottom_Left,
vec4 Bottom_Right,
vec2 UV,
out vec4 Result)
{
vec3 top=Top_Left.rgb+(Top_Right.rgb-Top_Left.rgb)*UV.x;
vec3 bottom=Bottom_Left.rgb+(Bottom_Right.rgb-Bottom_Left.rgb)*UV.x;
Result.rgb=Gradient_Color.rgb*(bottom+(top-bottom)*UV.y);
Result.a=1.0;
}
void main()
{
float X_Q338;
float Y_Q338;
float Z_Q338;
float W_Q338;
X_Q338=vExtra2.x;
Y_Q338=vExtra2.y;
Z_Q338=vExtra2.z;
W_Q338=vExtra2.w;
vec4 Color_Q343;
#if IRIDESCENCE_ENABLE
Iridescence_B343(vPosition,vNormal,vUV,vBinormal,cameraPosition,_Iridescence_Tint_,_Iridescent_Map_,_Reflected_,_Frequency_,_Vertical_Offset_,Color_Q343);
#else
Color_Q343=vec4(0,0,0,0);
#endif
vec4 Result_Q344;
Scale_RGB_B344(_Iridescence_Intensity_,Color_Q343,Result_Q344);
vec4 Line_Color_Q362;
Line_Fragment_B362(_Line_Color_,_Highlight_Color_,_Highlight_Width_,vTangent,_Highlight_,Line_Color_Q362);
float Result_Q356;
#if EDGE_ONLY
Edge_B356(vExtra1,Z_Q338,W_Q338,vUV,_Edge_Width_,_Edge_Power_,Result_Q356);
#else
Result_Q356=1.0;
#endif
vec2 Vec2_Q339=vec2(X_Q338,Y_Q338);
vec4 Result_Q355;
Gradient_B355(_Gradient_Color_,_Top_Left_,_Top_Right_,_Bottom_Left_,_Bottom_Right_,Vec2_Q339,Result_Q355);
vec4 Linear_Q348;
Linear_Q348.rgb=clamp(Result_Q355.rgb*Result_Q355.rgb,0.0,1.0);
Linear_Q348.a=Result_Q355.a;
vec4 Result_Q346;
Scale_RGB_B346(Linear_Q348,Result_Q356,Result_Q346);
vec4 Sum_Q345=Result_Q346+Result_Q344;
vec4 Color_At_T_Q347=mix(Line_Color_Q362,Result_Q346,_Line_Gradient_Blend_);
vec4 Base_And_Iridescent_Q350;
Base_And_Iridescent_Q350=_Base_Color_+vec4(Sum_Q345.rgb,0.0);
vec4 Sum_Q349=Color_At_T_Q347+_Iridescence_Edge_Intensity_*Color_Q343;
vec4 Result_Q351=Sum_Q349; Result_Q351.a=1.0;
vec4 Color_Q332;
Round_Rect_Fragment_B332(Z_Q338,W_Q338,Result_Q351,_Filter_Width_,vUV,1.0,vExtra1,Base_And_Iridescent_Q350,Color_Q332);
vec4 Result_Q354=_Fade_Out_*Color_Q332;
vec4 sRGB_Q353;
FastLinearTosRGB_B353(Result_Q354,sRGB_Q353);
vec4 Out_Color=sRGB_Q353;
float Clip_Threshold=0.001;
bool To_sRGB=false;
gl_FragColor=Out_Color;
}`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlBackplate.vertex.js":(C,v,n)=>{n.r(v),n.d(v,{mrdlBackplateVertexShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="mrdlBackplateVertexShader",f=`uniform mat4 world;
uniform mat4 viewProjection;
uniform vec3 cameraPosition;
attribute vec3 position;
attribute vec3 normal;
attribute vec3 tangent;
uniform float _Radius_;
uniform float _Line_Width_;
uniform bool _Absolute_Sizes_;
uniform float _Filter_Width_;
uniform vec4 _Base_Color_;
uniform vec4 _Line_Color_;
uniform float _Radius_Top_Left_;
uniform float _Radius_Top_Right_;
uniform float _Radius_Bottom_Left_;
uniform float _Radius_Bottom_Right_;
uniform float _Rate_;
uniform vec4 _Highlight_Color_;
uniform float _Highlight_Width_;
uniform vec4 _Highlight_Transform_;
uniform float _Highlight_;
uniform float _Iridescence_Intensity_;
uniform float _Iridescence_Edge_Intensity_;
uniform vec4 _Iridescence_Tint_;
uniform sampler2D _Iridescent_Map_;
uniform float _Angle_;
uniform bool _Reflected_;
uniform float _Frequency_;
uniform float _Vertical_Offset_;
uniform vec4 _Gradient_Color_;
uniform vec4 _Top_Left_;
uniform vec4 _Top_Right_;
uniform vec4 _Bottom_Left_;
uniform vec4 _Bottom_Right_;
uniform float _Edge_Width_;
uniform float _Edge_Power_;
uniform float _Line_Gradient_Blend_;
uniform float _Fade_Out_;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vExtra1;
varying vec4 vExtra2;
void Object_To_World_Pos_B314(
vec3 Pos_Object,
out vec3 Pos_World)
{
Pos_World=(world*vec4(Pos_Object,1.0)).xyz;
}
void Round_Rect_Vertex_B357(
vec2 UV,
float Radius,
float Margin,
float Anisotropy,
float Gradient1,
float Gradient2,
vec3 Normal,
vec4 Color_Scale_Translate,
out vec2 Rect_UV,
out vec4 Rect_Parms,
out vec2 Scale_XY,
out vec2 Line_UV,
out vec2 Color_UV_Info)
{
Scale_XY=vec2(Anisotropy,1.0);
Line_UV=(UV-vec2(0.5,0.5));
Rect_UV=Line_UV*Scale_XY;
Rect_Parms.xy=Scale_XY*0.5-vec2(Radius,Radius)-vec2(Margin,Margin);
Rect_Parms.z=Gradient1; 
Rect_Parms.w=Gradient2;
Color_UV_Info=(Line_UV+vec2(0.5,0.5))*Color_Scale_Translate.xy+Color_Scale_Translate.zw;
}
void Line_Vertex_B333(
vec2 Scale_XY,
vec2 UV,
float Time,
float Rate,
vec4 Highlight_Transform,
out vec3 Line_Vertex)
{
float angle2=(Rate*Time)*2.0*3.1416;
float sinAngle2=sin(angle2);
float cosAngle2=cos(angle2);
vec2 xformUV=UV*Highlight_Transform.xy+Highlight_Transform.zw;
Line_Vertex.x=0.0;
Line_Vertex.y=cosAngle2*xformUV.x-sinAngle2*xformUV.y;
Line_Vertex.z=0.0; 
}
void PickDir_B334(
float Degrees,
vec3 DirX,
vec3 DirY,
out vec3 Dir)
{
float a=Degrees*3.14159/180.0;
Dir=cos(a)*DirX+sin(a)*DirY;
}
void Move_Verts_B327(
float Anisotropy,
vec3 P,
float Radius,
out vec3 New_P,
out vec2 New_UV,
out float Radial_Gradient,
out vec3 Radial_Dir)
{
vec2 UV=P.xy*2.0+0.5;
vec2 center=clamp(UV,0.0,1.0);
vec2 delta=UV-center;
vec2 r2=2.0*vec2(Radius/Anisotropy,Radius);
New_UV=center+r2*(UV-2.0*center+0.5);
New_P=vec3(New_UV-0.5,P.z);
Radial_Gradient=1.0-length(delta)*2.0;
Radial_Dir=vec3(delta*r2,0.0);
}
void Pick_Radius_B336(
float Radius,
float Radius_Top_Left,
float Radius_Top_Right,
float Radius_Bottom_Left,
float Radius_Bottom_Right,
vec3 Position,
out float Result)
{
bool whichY=Position.y>0.0;
Result=Position.x<0.0 ? (whichY ? Radius_Top_Left : Radius_Bottom_Left) : (whichY ? Radius_Top_Right : Radius_Bottom_Right);
Result*=Radius;
}
void Edge_AA_Vertex_B328(
vec3 Position_World,
vec3 Position_Object,
vec3 Normal_Object,
vec3 Eye,
float Radial_Gradient,
vec3 Radial_Dir,
vec3 Tangent,
out float Gradient1,
out float Gradient2)
{
vec3 I=(Eye-Position_World);
vec3 T=(vec4(Tangent,0.0)).xyz;
float g=(dot(T,I)<0.0) ? 0.0 : 1.0;
if (Normal_Object.z==0.0) { 
Gradient1=Position_Object.z>0.0 ? g : 1.0;
Gradient2=Position_Object.z>0.0 ? 1.0 : g;
} else {
Gradient1=g+(1.0-g)*(Radial_Gradient);
Gradient2=1.0;
}
}
void Object_To_World_Dir_B330(
vec3 Dir_Object,
out vec3 Binormal_World,
out vec3 Binormal_World_N,
out float Binormal_Length)
{
Binormal_World=(world*vec4(Dir_Object,0.0)).xyz;
Binormal_Length=length(Binormal_World);
Binormal_World_N=Binormal_World/Binormal_Length;
}
void RelativeOrAbsoluteDetail_B341(
float Nominal_Radius,
float Nominal_LineWidth,
bool Absolute_Measurements,
float Height,
out float Radius,
out float Line_Width)
{
float scale=Absolute_Measurements ? 1.0/Height : 1.0;
Radius=Nominal_Radius*scale;
Line_Width=Nominal_LineWidth*scale;
}
void main()
{
vec3 Nrm_World_Q326;
Nrm_World_Q326=normalize((world*vec4(normal,0.0)).xyz);
vec3 Tangent_World_Q329;
vec3 Tangent_World_N_Q329;
float Tangent_Length_Q329;
Tangent_World_Q329=(world*vec4(vec3(1,0,0),0.0)).xyz;
Tangent_Length_Q329=length(Tangent_World_Q329);
Tangent_World_N_Q329=Tangent_World_Q329/Tangent_Length_Q329;
vec3 Binormal_World_Q330;
vec3 Binormal_World_N_Q330;
float Binormal_Length_Q330;
Object_To_World_Dir_B330(vec3(0,1,0),Binormal_World_Q330,Binormal_World_N_Q330,Binormal_Length_Q330);
float Radius_Q341;
float Line_Width_Q341;
RelativeOrAbsoluteDetail_B341(_Radius_,_Line_Width_,_Absolute_Sizes_,Binormal_Length_Q330,Radius_Q341,Line_Width_Q341);
vec3 Dir_Q334;
PickDir_B334(_Angle_,Tangent_World_N_Q329,Binormal_World_N_Q330,Dir_Q334);
float Result_Q336;
Pick_Radius_B336(Radius_Q341,_Radius_Top_Left_,_Radius_Top_Right_,_Radius_Bottom_Left_,_Radius_Bottom_Right_,position,Result_Q336);
float Anisotropy_Q331=Tangent_Length_Q329/Binormal_Length_Q330;
vec4 Out_Color_Q337=vec4(Result_Q336,Line_Width_Q341,0,1);
vec3 New_P_Q327;
vec2 New_UV_Q327;
float Radial_Gradient_Q327;
vec3 Radial_Dir_Q327;
Move_Verts_B327(Anisotropy_Q331,position,Result_Q336,New_P_Q327,New_UV_Q327,Radial_Gradient_Q327,Radial_Dir_Q327);
vec3 Pos_World_Q314;
Object_To_World_Pos_B314(New_P_Q327,Pos_World_Q314);
float Gradient1_Q328;
float Gradient2_Q328;
#if SMOOTH_EDGES
Edge_AA_Vertex_B328(Pos_World_Q314,position,normal,cameraPosition,Radial_Gradient_Q327,Radial_Dir_Q327,tangent,Gradient1_Q328,Gradient2_Q328);
#else
Gradient1_Q328=1.0;
Gradient2_Q328=1.0;
#endif
vec2 Rect_UV_Q357;
vec4 Rect_Parms_Q357;
vec2 Scale_XY_Q357;
vec2 Line_UV_Q357;
vec2 Color_UV_Info_Q357;
Round_Rect_Vertex_B357(New_UV_Q327,Result_Q336,0.0,Anisotropy_Q331,Gradient1_Q328,Gradient2_Q328,normal,vec4(1,1,0,0),Rect_UV_Q357,Rect_Parms_Q357,Scale_XY_Q357,Line_UV_Q357,Color_UV_Info_Q357);
vec3 Line_Vertex_Q333;
Line_Vertex_B333(Scale_XY_Q357,Line_UV_Q357,(20.0),_Rate_,_Highlight_Transform_,Line_Vertex_Q333);
float X_Q359;
float Y_Q359;
X_Q359=Color_UV_Info_Q357.x;
Y_Q359=Color_UV_Info_Q357.y;
vec4 Vec4_Q358=vec4(X_Q359,Y_Q359,Result_Q336,Line_Width_Q341);
vec3 Position=Pos_World_Q314;
vec3 Normal=Nrm_World_Q326;
vec2 UV=Rect_UV_Q357;
vec3 Tangent=Line_Vertex_Q333;
vec3 Binormal=Dir_Q334;
vec4 Color=Out_Color_Q337;
vec4 Extra1=Rect_Parms_Q357;
vec4 Extra2=Vec4_Q358;
vec4 Extra3=vec4(0,0,0,0);
gl_Position=viewProjection*vec4(Position,1);
vPosition=Position;
vNormal=Normal;
vUV=UV;
vTangent=Tangent;
vBinormal=Binormal;
vExtra1=Extra1;
vExtra2=Extra2;
}`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlFrontplate.fragment.js":(C,v,n)=>{n.r(v),n.d(v,{mrdlFrontplatePixelShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="mrdlFrontplatePixelShader",f=`uniform vec3 cameraPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec4 vExtra1;
varying vec4 vExtra2;
varying vec4 vExtra3;
uniform float _Radius_;
uniform float _Line_Width_;
uniform bool _Relative_To_Height_;
uniform float _Filter_Width_;
uniform vec4 _Edge_Color_;
uniform float _Fade_Out_;
uniform bool _Smooth_Edges_;
uniform bool _Blob_Enable_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Inner_Fade_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform float _Blob_Pulse_Max_Size_;
uniform bool _Blob_Enable_2_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Inner_Fade_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform float _Gaze_Intensity_;
uniform float _Gaze_Focus_;
uniform sampler2D _Blob_Texture_;
uniform float _Selection_Fuzz_;
uniform float _Selected_;
uniform float _Selection_Fade_;
uniform float _Selection_Fade_Size_;
uniform float _Selected_Distance_;
uniform float _Selected_Fade_Length_;
uniform float _Proximity_Max_Intensity_;
uniform float _Proximity_Far_Distance_;
uniform float _Proximity_Near_Radius_;
uniform float _Proximity_Anisotropy_;
uniform bool _Use_Global_Left_Index_;
uniform bool _Use_Global_Right_Index_;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
void Scale_Color_B54(
vec4 Color,
float Scalar,
out vec4 Result)
{
Result=Scalar*Color;
}
void Scale_RGB_B50(
vec4 Color,
float Scalar,
out vec4 Result)
{
Result=vec4(Scalar,Scalar,Scalar,1)*Color;
}
void Proximity_Fragment_B51(
float Proximity_Max_Intensity,
float Proximity_Near_Radius,
vec4 Deltas,
float Show_Selection,
float Distance_Fade1,
float Distance_Fade2,
float Strength,
out float Proximity)
{
float proximity1=(1.0-clamp(length(Deltas.xy)/Proximity_Near_Radius,0.0,1.0))*Distance_Fade1;
float proximity2=(1.0-clamp(length(Deltas.zw)/Proximity_Near_Radius,0.0,1.0))*Distance_Fade2;
Proximity=Strength*(Proximity_Max_Intensity*max(proximity1,proximity2) *(1.0-Show_Selection)+Show_Selection);
}
void Blob_Fragment_B56(
vec2 UV,
vec3 Blob_Info,
sampler2D Blob_Texture,
out vec4 Blob_Color)
{
float k=dot(UV,UV);
Blob_Color=Blob_Info.y*texture(Blob_Texture,vec2(vec2(sqrt(k),Blob_Info.x).x,1.0-vec2(sqrt(k),Blob_Info.x).y))*(1.0-clamp(k,0.0,1.0));
}
void Round_Rect_Fragment_B61(
float Radius,
vec4 Line_Color,
float Filter_Width,
float Line_Visibility,
vec4 Fill_Color,
bool Smooth_Edges,
vec4 Rect_Parms,
out float Inside_Rect)
{
float d=length(max(abs(Rect_Parms.zw)-Rect_Parms.xy,0.0));
float dx=max(fwidth(d)*Filter_Width,0.00001);
Inside_Rect=Smooth_Edges ? clamp((Radius-d)/dx,0.0,1.0) : 1.0-step(Radius,d);
}
void main()
{
float Is_Quad_Q53;
Is_Quad_Q53=vNormal.z;
vec4 Blob_Color_Q56;
Blob_Fragment_B56(vUV,vTangent,_Blob_Texture_,Blob_Color_Q56);
float X_Q52;
float Y_Q52;
float Z_Q52;
float W_Q52;
X_Q52=vExtra3.x;
Y_Q52=vExtra3.y;
Z_Q52=vExtra3.z;
W_Q52=vExtra3.w;
float Proximity_Q51;
Proximity_Fragment_B51(_Proximity_Max_Intensity_,_Proximity_Near_Radius_,vExtra2,X_Q52,Y_Q52,Z_Q52,1.0,Proximity_Q51);
float Inside_Rect_Q61;
Round_Rect_Fragment_B61(W_Q52,vec4(1,1,1,1),_Filter_Width_,1.0,vec4(0,0,0,0),_Smooth_Edges_,vExtra1,Inside_Rect_Q61);
vec4 Result_Q50;
Scale_RGB_B50(_Edge_Color_,Proximity_Q51,Result_Q50);
vec4 Result_Q47=Inside_Rect_Q61*Blob_Color_Q56;
vec4 Color_At_T_Q48=mix(Result_Q50,Result_Q47,Is_Quad_Q53);
vec4 Result_Q54;
Scale_Color_B54(Color_At_T_Q48,_Fade_Out_,Result_Q54);
vec4 Out_Color=Result_Q54;
float Clip_Threshold=0.001;
bool To_sRGB=false;
gl_FragColor=Out_Color;
}`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlFrontplate.vertex.js":(C,v,n)=>{n.r(v),n.d(v,{mrdlFrontplateVertexShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="mrdlFrontplateVertexShader",f=`uniform mat4 world;
uniform mat4 viewProjection;
uniform vec3 cameraPosition;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec3 tangent;
attribute vec4 color;
uniform float _Radius_;
uniform float _Line_Width_;
uniform bool _Relative_To_Height_;
uniform float _Filter_Width_;
uniform vec4 _Edge_Color_;
uniform float _Fade_Out_;
uniform bool _Smooth_Edges_;
uniform bool _Blob_Enable_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Inner_Fade_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform float _Blob_Pulse_Max_Size_;
uniform bool _Blob_Enable_2_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Inner_Fade_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform float _Gaze_Intensity_;
uniform float _Gaze_Focus_;
uniform sampler2D _Blob_Texture_;
uniform float _Selection_Fuzz_;
uniform float _Selected_;
uniform float _Selection_Fade_;
uniform float _Selection_Fade_Size_;
uniform float _Selected_Distance_;
uniform float _Selected_Fade_Length_;
uniform float _Proximity_Max_Intensity_;
uniform float _Proximity_Far_Distance_;
uniform float _Proximity_Near_Radius_;
uniform float _Proximity_Anisotropy_;
uniform bool _Use_Global_Left_Index_;
uniform bool _Use_Global_Right_Index_;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec4 vExtra1;
varying vec4 vExtra2;
varying vec4 vExtra3;
void Blob_Vertex_B40(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
vec4 Vx_Color,
vec2 UV,
vec3 Face_Center,
vec2 Face_Size,
vec2 In_UV,
float Blob_Fade_Length,
float Selection_Fade,
float Selection_Fade_Size,
float Inner_Fade,
float Blob_Pulse,
float Blob_Fade,
float Blob_Enabled,
float DistanceOffset,
out vec3 Out_Position,
out vec2 Out_UV,
out vec3 Blob_Info,
out vec2 Blob_Relative_UV)
{
float blobSize,fadeIn;
vec3 Hit_Position;
Blob_Info=vec3(0.0,0.0,0.0);
float Hit_Distance=dot(Blob_Position-Face_Center,Normal)+DistanceOffset*Blob_Far_Distance;
Hit_Position=Blob_Position-Hit_Distance*Normal;
float absD=abs(Hit_Distance);
float lerpVal=clamp((absD-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);
fadeIn=1.0-clamp((absD-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);
float innerFade=1.0-clamp(-Hit_Distance/Inner_Fade,0.0,1.0);
float farClip=clamp(1.0-step(Blob_Far_Distance+Blob_Fade_Length,absD),0.0,1.0);
float size=mix(Blob_Near_Size,Blob_Far_Size,lerpVal)*farClip;
blobSize=mix(size,Selection_Fade_Size,Selection_Fade)*innerFade*Blob_Enabled;
Blob_Info.x=lerpVal*0.5+0.5;
Blob_Info.y=fadeIn*Intensity*(1.0-Selection_Fade)*Blob_Fade;
Blob_Info.x*=(1.0-Blob_Pulse);
vec3 delta=Hit_Position-Face_Center;
vec2 blobCenterXY=vec2(dot(delta,Tangent),dot(delta,Bitangent));
vec2 quadUVin=2.0*UV-1.0; 
vec2 blobXY=blobCenterXY+quadUVin*blobSize;
vec2 blobClipped=clamp(blobXY,-Face_Size*0.5,Face_Size*0.5);
vec2 blobUV=(blobClipped-blobCenterXY)/max(blobSize,0.0001)*2.0;
vec3 blobCorner=Face_Center+blobClipped.x*Tangent+blobClipped.y*Bitangent;
Out_Position=mix(Position,blobCorner,Vx_Color.rrr);
Out_UV=mix(In_UV,blobUV,Vx_Color.rr);
Blob_Relative_UV=blobClipped/Face_Size.y;
}
void Round_Rect_Vertex_B36(
vec2 UV,
vec3 Tangent,
vec3 Binormal,
float Radius,
float Anisotropy,
vec2 Blob_Center_UV,
out vec2 Rect_UV,
out vec2 Scale_XY,
out vec4 Rect_Parms)
{
Scale_XY=vec2(Anisotropy,1.0);
Rect_UV=(UV-vec2(0.5,0.5))*Scale_XY;
Rect_Parms.xy=Scale_XY*0.5-vec2(Radius,Radius);
Rect_Parms.zw=Blob_Center_UV;
}
vec2 ProjectProximity(
vec3 blobPosition,
vec3 position,
vec3 center,
vec3 dir,
vec3 xdir,
vec3 ydir,
out float vdistance
)
{
vec3 delta=blobPosition-position;
vec2 xy=vec2(dot(delta,xdir),dot(delta,ydir));
vdistance=abs(dot(delta,dir));
return xy;
}
void Proximity_Vertex_B33(
vec3 Blob_Position,
vec3 Blob_Position_2,
vec3 Face_Center,
vec3 Position,
float Proximity_Far_Distance,
float Relative_Scale,
float Proximity_Anisotropy,
vec3 Normal,
vec3 Tangent,
vec3 Binormal,
out vec4 Extra,
out float Distance_To_Face,
out float Distance_Fade1,
out float Distance_Fade2)
{
float distz1,distz2;
Extra.xy=ProjectProximity(Blob_Position,Position,Face_Center,Normal,Tangent*Proximity_Anisotropy,Binormal,distz1)/Relative_Scale;
Extra.zw=ProjectProximity(Blob_Position_2,Position,Face_Center,Normal,Tangent*Proximity_Anisotropy,Binormal,distz2)/Relative_Scale;
Distance_To_Face=dot(Normal,Position-Face_Center);
Distance_Fade1=1.0-clamp(distz1/Proximity_Far_Distance,0.0,1.0);
Distance_Fade2=1.0-clamp(distz2/Proximity_Far_Distance,0.0,1.0);
}
void Object_To_World_Pos_B12(
vec3 Pos_Object,
out vec3 Pos_World)
{
Pos_World=(world*vec4(Pos_Object,1.0)).xyz;
}
void Choose_Blob_B27(
vec4 Vx_Color,
vec3 Position1,
vec3 Position2,
bool Blob_Enable_1,
bool Blob_Enable_2,
float Near_Size_1,
float Near_Size_2,
float Blob_Inner_Fade_1,
float Blob_Inner_Fade_2,
float Blob_Pulse_1,
float Blob_Pulse_2,
float Blob_Fade_1,
float Blob_Fade_2,
out vec3 Position,
out float Near_Size,
out float Inner_Fade,
out float Blob_Enable,
out float Fade,
out float Pulse)
{
Position=Position1*(1.0-Vx_Color.g)+Vx_Color.g*Position2;
float b1=Blob_Enable_1 ? 1.0 : 0.0;
float b2=Blob_Enable_2 ? 1.0 : 0.0;
Blob_Enable=b1+(b2-b1)*Vx_Color.g;
Pulse=Blob_Pulse_1*(1.0-Vx_Color.g)+Vx_Color.g*Blob_Pulse_2;
Fade=Blob_Fade_1*(1.0-Vx_Color.g)+Vx_Color.g*Blob_Fade_2;
Near_Size=Near_Size_1*(1.0-Vx_Color.g)+Vx_Color.g*Near_Size_2;
Inner_Fade=Blob_Inner_Fade_1*(1.0-Vx_Color.g)+Vx_Color.g*Blob_Inner_Fade_2;
}
void Move_Verts_B32(
vec2 UV,
float Radius,
float Anisotropy,
float Line_Width,
float Visible,
out vec3 New_P,
out vec2 New_UV)
{
vec2 xy=2.0*UV-vec2(0.5,0.5);
vec2 center=clamp(xy,0.0,1.0);
vec2 delta=2.0*(xy-center);
float deltaLength=length(delta);
vec2 aniso=vec2(1.0/Anisotropy,1.0);
center=(center-vec2(0.5,0.5))*(1.0-2.0*Radius*aniso);
New_UV=vec2((2.0-2.0*deltaLength)*Visible,0.0);
float deltaRadius= (Radius-Line_Width*New_UV.x);
New_P.xy=(center+deltaRadius/deltaLength *aniso*delta);
New_P.z=0.0;
}
void Object_To_World_Dir_B14(
vec3 Dir_Object,
out vec3 Binormal_World)
{
Binormal_World=(world*vec4(Dir_Object,0.0)).xyz;
}
void Proximity_Visibility_B55(
float Selection,
vec3 Proximity_Center,
vec3 Proximity_Center_2,
float Proximity_Far_Distance,
float Proximity_Radius,
vec3 Face_Center,
vec3 Normal,
vec2 Face_Size,
float Gaze,
out float Width)
{
float boxMaxSize=length(Face_Size)*0.5;
float d1=dot(Proximity_Center-Face_Center,Normal);
vec3 blob1=Proximity_Center-d1*Normal;
float d2=dot(Proximity_Center_2-Face_Center,Normal);
vec3 blob2=Proximity_Center_2-d2*Normal;
vec3 delta1=blob1-Face_Center;
vec3 delta2=blob2-Face_Center;
float dist1=dot(delta1,delta1);
float dist2=dot(delta2,delta2);
float nearestProxDist=sqrt(min(dist1,dist2));
Width=(1.0-step(boxMaxSize+Proximity_Radius,nearestProxDist))*(1.0-step(Proximity_Far_Distance,min(d1,d2))*(1.0-step(0.0001,Selection)));
Width=max(Gaze,Width);
}
vec2 ramp2(vec2 start,vec2 end,vec2 x)
{
return clamp((x-start)/(end-start),vec2(0.0,0.0),vec2(1.0,1.0));
}
float computeSelection(
vec3 blobPosition,
vec3 normal,
vec3 tangent,
vec3 bitangent,
vec3 faceCenter,
vec2 faceSize,
float selectionFuzz,
float farDistance,
float fadeLength
)
{
vec3 delta=blobPosition-faceCenter;
float absD=abs(dot(delta,normal));
float fadeIn=1.0-clamp((absD-farDistance)/fadeLength,0.0,1.0);
vec2 blobCenterXY=vec2(dot(delta,tangent),dot(delta,bitangent));
vec2 innerFace=faceSize*(1.0-selectionFuzz)*0.5;
vec2 selectPulse=ramp2(-faceSize*0.5,-innerFace,blobCenterXY)-ramp2(innerFace,faceSize*0.5,blobCenterXY);
return selectPulse.x*selectPulse.y*fadeIn;
}
void Selection_Vertex_B31(
vec3 Blob_Position,
vec3 Blob_Position_2,
vec3 Face_Center,
vec2 Face_Size,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
float Selection_Fuzz,
float Selected,
float Far_Distance,
float Fade_Length,
vec3 Active_Face_Dir,
out float Show_Selection)
{
float select1=computeSelection(Blob_Position,Normal,Tangent,Bitangent,Face_Center,Face_Size,Selection_Fuzz,Far_Distance,Fade_Length);
float select2=computeSelection(Blob_Position_2,Normal,Tangent,Bitangent,Face_Center,Face_Size,Selection_Fuzz,Far_Distance,Fade_Length);
Show_Selection=mix(max(select1,select2),1.0,Selected);
}
void main()
{
vec3 Vec3_Q29=vec3(vec2(0,0).x,vec2(0,0).y,color.r);
vec3 Nrm_World_Q24;
Nrm_World_Q24=normalize((world*vec4(normal,0.0)).xyz);
vec3 Face_Center_Q30;
Face_Center_Q30=(world*vec4(vec3(0,0,0),1.0)).xyz;
vec3 Tangent_World_Q13;
Tangent_World_Q13=(world*vec4(tangent,0.0)).xyz;
vec3 Result_Q42;
Result_Q42=_Use_Global_Left_Index_ ? Global_Left_Index_Tip_Position.xyz : _Blob_Position_;
vec3 Result_Q43;
Result_Q43=_Use_Global_Right_Index_ ? Global_Right_Index_Tip_Position.xyz : _Blob_Position_2_;
float Value_At_T_Q58=mix(_Blob_Near_Size_,_Blob_Pulse_Max_Size_,_Blob_Pulse_);
float Value_At_T_Q59=mix(_Blob_Near_Size_2_,_Blob_Pulse_Max_Size_,_Blob_Pulse_2_);
vec3 Cross_Q70=cross(normal,tangent);
float Product_Q45=_Gaze_Intensity_*_Gaze_Focus_;
float Step_Q46=step(0.0001,Product_Q45);
vec3 Tangent_World_N_Q15=normalize(Tangent_World_Q13);
vec3 Position_Q27;
float Near_Size_Q27;
float Inner_Fade_Q27;
float Blob_Enable_Q27;
float Fade_Q27;
float Pulse_Q27;
Choose_Blob_B27(color,Result_Q42,Result_Q43,_Blob_Enable_,_Blob_Enable_2_,Value_At_T_Q58,Value_At_T_Q59,_Blob_Inner_Fade_,_Blob_Inner_Fade_2_,_Blob_Pulse_,_Blob_Pulse_2_,_Blob_Fade_,_Blob_Fade_2_,Position_Q27,Near_Size_Q27,Inner_Fade_Q27,Blob_Enable_Q27,Fade_Q27,Pulse_Q27);
vec3 Binormal_World_Q14;
Object_To_World_Dir_B14(Cross_Q70,Binormal_World_Q14);
float Anisotropy_Q21=length(Tangent_World_Q13)/length(Binormal_World_Q14);
vec3 Binormal_World_N_Q16=normalize(Binormal_World_Q14);
vec2 Face_Size_Q35;
float ScaleY_Q35;
Face_Size_Q35=vec2(length(Tangent_World_Q13),length(Binormal_World_Q14));
ScaleY_Q35=Face_Size_Q35.y;
float Out_Radius_Q38;
float Out_Line_Width_Q38;
Out_Radius_Q38=_Relative_To_Height_ ? _Radius_ : _Radius_/ScaleY_Q35;
Out_Line_Width_Q38=_Relative_To_Height_ ? _Line_Width_ : _Line_Width_/ScaleY_Q35;
float Show_Selection_Q31;
Selection_Vertex_B31(Result_Q42,Result_Q43,Face_Center_Q30,Face_Size_Q35,Nrm_World_Q24,Tangent_World_N_Q15,Binormal_World_N_Q16,_Selection_Fuzz_,_Selected_,_Selected_Distance_,_Selected_Fade_Length_,vec3(0,0,-1),Show_Selection_Q31);
float MaxAB_Q41=max(Show_Selection_Q31,Product_Q45);
float Width_Q55;
Proximity_Visibility_B55(Show_Selection_Q31,Result_Q42,Result_Q43,_Proximity_Far_Distance_,_Proximity_Near_Radius_,Face_Center_Q30,Nrm_World_Q24,Face_Size_Q35,Step_Q46,Width_Q55);
vec3 New_P_Q32;
vec2 New_UV_Q32;
Move_Verts_B32(uv,Out_Radius_Q38,Anisotropy_Q21,Out_Line_Width_Q38,Width_Q55,New_P_Q32,New_UV_Q32);
vec3 Pos_World_Q12;
Object_To_World_Pos_B12(New_P_Q32,Pos_World_Q12);
vec3 Out_Position_Q40;
vec2 Out_UV_Q40;
vec3 Blob_Info_Q40;
vec2 Blob_Relative_UV_Q40;
Blob_Vertex_B40(Pos_World_Q12,Nrm_World_Q24,Tangent_World_N_Q15,Binormal_World_N_Q16,Position_Q27,_Blob_Intensity_,Near_Size_Q27,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,color,uv,Face_Center_Q30,Face_Size_Q35,New_UV_Q32,_Blob_Fade_Length_,_Selection_Fade_,_Selection_Fade_Size_,Inner_Fade_Q27,Pulse_Q27,Fade_Q27,Blob_Enable_Q27,0.0,Out_Position_Q40,Out_UV_Q40,Blob_Info_Q40,Blob_Relative_UV_Q40);
vec2 Rect_UV_Q36;
vec2 Scale_XY_Q36;
vec4 Rect_Parms_Q36;
Round_Rect_Vertex_B36(New_UV_Q32,Tangent_World_Q13,Binormal_World_Q14,Out_Radius_Q38,Anisotropy_Q21,Blob_Relative_UV_Q40,Rect_UV_Q36,Scale_XY_Q36,Rect_Parms_Q36);
vec4 Extra_Q33;
float Distance_To_Face_Q33;
float Distance_Fade1_Q33;
float Distance_Fade2_Q33;
Proximity_Vertex_B33(Result_Q42,Result_Q43,Face_Center_Q30,Pos_World_Q12,_Proximity_Far_Distance_,1.0,_Proximity_Anisotropy_,Nrm_World_Q24,Tangent_World_N_Q15,Binormal_World_N_Q16,Extra_Q33,Distance_To_Face_Q33,Distance_Fade1_Q33,Distance_Fade2_Q33);
vec4 Vec4_Q37=vec4(MaxAB_Q41,Distance_Fade1_Q33,Distance_Fade2_Q33,Out_Radius_Q38);
vec3 Position=Out_Position_Q40;
vec3 Normal=Vec3_Q29;
vec2 UV=Out_UV_Q40;
vec3 Tangent=Blob_Info_Q40;
vec3 Binormal=vec3(0,0,0);
vec4 Color=vec4(1,1,1,1);
vec4 Extra1=Rect_Parms_Q36;
vec4 Extra2=Extra_Q33;
vec4 Extra3=Vec4_Q37;
gl_Position=viewProjection*vec4(Position,1);
vNormal=Normal;
vUV=UV;
vTangent=Tangent;
vExtra1=Extra1;
vExtra2=Extra2;
vExtra3=Extra3;
}`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlInnerquad.fragment.js":(C,v,n)=>{n.r(v),n.d(v,{mrdlInnerquadPixelShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="mrdlInnerquadPixelShader",f=`uniform vec3 cameraPosition;
varying vec2 vUV;
varying vec3 vTangent;
uniform vec4 _Color_;
uniform float _Radius_;
uniform bool _Fixed_Radius_;
uniform float _Filter_Width_;
uniform float _Glow_Fraction_;
uniform float _Glow_Max_;
uniform float _Glow_Falloff_;
float FilterStep_Bid194(float edge,float x,float filterWidth)
{
float dx=max(1.0E-5,fwidth(x)*filterWidth);
return max((x+dx*0.5-max(edge,x-dx*0.5))/dx,0.0);
}
void Round_Rect_B194(
float Size_X,
float Size_Y,
float Radius,
vec4 Rect_Color,
float Filter_Width,
vec2 UV,
float Glow_Fraction,
float Glow_Max,
float Glow_Falloff,
out vec4 Color)
{
vec2 halfSize=vec2(Size_X,Size_Y)*0.5;
vec2 r=max(min(vec2(Radius,Radius),halfSize),vec2(0.01,0.01));
vec2 v=abs(UV);
vec2 nearestp=min(v,halfSize-r);
vec2 delta=(v-nearestp)/max(vec2(0.01,0.01),r);
float Distance=length(delta);
float insideRect=1.0-FilterStep_Bid194(1.0-Glow_Fraction,Distance,Filter_Width);
float glow=clamp((1.0-Distance)/Glow_Fraction,0.0,1.0);
glow=pow(glow,Glow_Falloff);
Color=Rect_Color*max(insideRect,glow*Glow_Max);
}
void main()
{
float X_Q192;
float Y_Q192;
float Z_Q192;
X_Q192=vTangent.x;
Y_Q192=vTangent.y;
Z_Q192=vTangent.z;
vec4 Color_Q194;
Round_Rect_B194(X_Q192,1.0,Y_Q192,_Color_,_Filter_Width_,vUV,_Glow_Fraction_,_Glow_Max_,_Glow_Falloff_,Color_Q194);
vec4 Out_Color=Color_Q194;
float Clip_Threshold=0.0;
gl_FragColor=Out_Color;
}
`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlInnerquad.vertex.js":(C,v,n)=>{n.r(v),n.d(v,{mrdlInnerquadVertexShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="mrdlInnerquadVertexShader",f=`uniform mat4 world;
uniform mat4 viewProjection;
uniform vec3 cameraPosition;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec3 tangent;
attribute vec4 color;
uniform vec4 _Color_;
uniform float _Radius_;
uniform bool _Fixed_Radius_;
uniform float _Filter_Width_;
uniform float _Glow_Fraction_;
uniform float _Glow_Max_;
uniform float _Glow_Falloff_;
varying vec2 vUV;
varying vec3 vTangent;
void main()
{
vec3 Pos_World_Q189;
Pos_World_Q189=(world*vec4(position,1.0)).xyz;
vec3 Dir_World_Q190;
Dir_World_Q190=(world*vec4(tangent,0.0)).xyz;
vec3 Dir_World_Q191;
Dir_World_Q191=(world*vec4((cross(normal,tangent)),0.0)).xyz;
float Length_Q180=length(Dir_World_Q190);
float Length_Q181=length(Dir_World_Q191);
float Quotient_Q184=Length_Q180/Length_Q181;
float Quotient_Q195=_Radius_/Length_Q181;
vec2 Result_Q193;
Result_Q193=vec2((uv.x-0.5)*Length_Q180/Length_Q181,(uv.y-0.5));
float Result_Q198=_Fixed_Radius_ ? Quotient_Q195 : _Radius_;
vec3 Vec3_Q183=vec3(Quotient_Q184,Result_Q198,0);
vec3 Position=Pos_World_Q189;
vec3 Normal=vec3(0,0,0);
vec2 UV=Result_Q193;
vec3 Tangent=Vec3_Q183;
vec3 Binormal=vec3(0,0,0);
vec4 Color=color;
gl_Position=viewProjection*vec4(Position,1);
vUV=UV;
vTangent=Tangent;
}
`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlSliderBar.fragment.js":(C,v,n)=>{n.r(v),n.d(v,{mrdlSliderBarPixelShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="mrdlSliderBarPixelShader",f=`uniform vec3 cameraPosition;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vColor;
varying vec4 vExtra1;
varying vec4 vExtra2;
varying vec4 vExtra3;
uniform float _Radius_;
uniform float _Bevel_Front_;
uniform float _Bevel_Front_Stretch_;
uniform float _Bevel_Back_;
uniform float _Bevel_Back_Stretch_;
uniform float _Radius_Top_Left_;
uniform float _Radius_Top_Right_;
uniform float _Radius_Bottom_Left_;
uniform float _Radius_Bottom_Right_;
uniform bool _Bulge_Enabled_;
uniform float _Bulge_Height_;
uniform float _Bulge_Radius_;
uniform float _Sun_Intensity_;
uniform float _Sun_Theta_;
uniform float _Sun_Phi_;
uniform float _Indirect_Diffuse_;
uniform vec4 _Albedo_;
uniform float _Specular_;
uniform float _Shininess_;
uniform float _Sharpness_;
uniform float _Subsurface_;
uniform vec4 _Left_Color_;
uniform vec4 _Right_Color_;
uniform float _Reflection_;
uniform float _Front_Reflect_;
uniform float _Edge_Reflect_;
uniform float _Power_;
uniform vec4 _Sky_Color_;
uniform vec4 _Horizon_Color_;
uniform vec4 _Ground_Color_;
uniform float _Horizon_Power_;
uniform sampler2D _Reflection_Map_;
uniform sampler2D _Indirect_Environment_;
uniform float _Width_;
uniform float _Fuzz_;
uniform float _Min_Fuzz_;
uniform float _Clip_Fade_;
uniform float _Hue_Shift_;
uniform float _Saturation_Shift_;
uniform float _Value_Shift_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform sampler2D _Blob_Texture_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform vec3 _Left_Index_Pos_;
uniform vec3 _Right_Index_Pos_;
uniform vec3 _Left_Index_Middle_Pos_;
uniform vec3 _Right_Index_Middle_Pos_;
uniform sampler2D _Decal_;
uniform vec2 _Decal_Scale_XY_;
uniform bool _Decal_Front_Only_;
uniform float _Rim_Intensity_;
uniform sampler2D _Rim_Texture_;
uniform float _Rim_Hue_Shift_;
uniform float _Rim_Saturation_Shift_;
uniform float _Rim_Value_Shift_;
uniform float _Iridescence_Intensity_;
uniform sampler2D _Iridescence_Texture_;
uniform bool Use_Global_Left_Index;
uniform bool Use_Global_Right_Index;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
uniform vec4 Global_Left_Thumb_Tip_Position;
uniform vec4 Global_Right_Thumb_Tip_Position;
uniform vec4 Global_Left_Index_Middle_Position;
uniform vec4 Global_Right_Index_Middle_Position;
uniform float Global_Left_Index_Tip_Proximity;
uniform float Global_Right_Index_Tip_Proximity;
void Blob_Fragment_B30(
sampler2D Blob_Texture,
vec4 Blob_Info1,
vec4 Blob_Info2,
out vec4 Blob_Color)
{
float k1=dot(Blob_Info1.xy,Blob_Info1.xy);
float k2=dot(Blob_Info2.xy,Blob_Info2.xy);
vec3 closer=k1<k2 ? vec3(k1,Blob_Info1.z,Blob_Info1.w) : vec3(k2,Blob_Info2.z,Blob_Info2.w);
Blob_Color=closer.z*texture(Blob_Texture,vec2(vec2(sqrt(closer.x),closer.y).x,1.0-vec2(sqrt(closer.x),closer.y).y))*clamp(1.0-closer.x,0.0,1.0);
}
void FastLinearTosRGB_B42(
vec4 Linear,
out vec4 sRGB)
{
sRGB.rgb=sqrt(clamp(Linear.rgb,0.0,1.0));
sRGB.a=Linear.a;
}
void Scale_RGB_B59(
vec4 Color,
float Scalar,
out vec4 Result)
{
Result=vec4(Scalar,Scalar,Scalar,1)*Color;
}
void Fragment_Main_B121(
float Sun_Intensity,
float Sun_Theta,
float Sun_Phi,
vec3 Normal,
vec4 Albedo,
float Fresnel_Reflect,
float Shininess,
vec3 Incident,
vec4 Horizon_Color,
vec4 Sky_Color,
vec4 Ground_Color,
float Indirect_Diffuse,
float Specular,
float Horizon_Power,
float Reflection,
vec4 Reflection_Sample,
vec4 Indirect_Sample,
float Sharpness,
float SSS,
float Subsurface,
vec4 Translucence,
vec4 Rim_Light,
vec4 Iridescence,
out vec4 Result)
{
float theta=Sun_Theta*2.0*3.14159;
float phi=Sun_Phi*3.14159;
vec3 lightDir= vec3(cos(phi)*cos(theta),sin(phi),cos(phi)*sin(theta));
float NdotL=max(dot(lightDir,Normal),0.0);
vec3 R=reflect(Incident,Normal);
float RdotL=max(0.0,dot(R,lightDir));
float specular=pow(RdotL,Shininess);
specular=mix(specular,smoothstep(0.495*Sharpness,1.0-0.495*Sharpness,specular),Sharpness);
vec4 gi=mix(Ground_Color,Sky_Color,Normal.y*0.5+0.5);
Result=((Sun_Intensity*NdotL+Indirect_Sample*Indirect_Diffuse+Translucence)*(1.0+SSS*Subsurface))*Albedo*(1.0-Fresnel_Reflect)+(Sun_Intensity*specular*Specular+Fresnel_Reflect*Reflection*Reflection_Sample)+Fresnel_Reflect*Rim_Light+Iridescence;
}
void Bulge_B79(
bool Enabled,
vec3 Normal,
vec3 Tangent,
float Bulge_Height,
vec4 UV,
float Bulge_Radius,
vec3 ButtonN,
out vec3 New_Normal)
{
vec2 xy=clamp(UV.xy*2.0,vec2(-1,-1),vec2(1,1));
vec3 B=(cross(Normal,Tangent));
float k=-clamp(1.0-length(xy)/Bulge_Radius,0.0,1.0)*Bulge_Height;
k=sin(k*3.14159*0.5);
k*=smoothstep(0.9998,0.9999,abs(dot(ButtonN,Normal)));
New_Normal=Normal*sqrt(1.0-k*k)+(xy.x*Tangent+xy.y*B)*k;
New_Normal=Enabled ? New_Normal : Normal;
}
void SSS_B77(
vec3 ButtonN,
vec3 Normal,
vec3 Incident,
out float Result)
{
float NdotI=abs(dot(Normal,Incident));
float BdotI=abs(dot(ButtonN,Incident));
Result=(abs(NdotI-BdotI)); 
}
void FingerOcclusion_B67(
float Width,
float DistToCenter,
float Fuzz,
float Min_Fuzz,
vec3 Position,
vec3 Forward,
vec3 Nearest,
float Fade_Out,
out float NotInShadow)
{
float d=dot((Nearest-Position),Forward);
float sh=smoothstep(Width*0.5,Width*0.5+Fuzz*max(d,0.0)+Min_Fuzz,DistToCenter);
NotInShadow=1.0-(1.0-sh)*smoothstep(-Fade_Out,0.0,d);
}
void FingerOcclusion_B68(
float Width,
float DistToCenter,
float Fuzz,
float Min_Fuzz,
vec3 Position,
vec3 Forward,
vec3 Nearest,
float Fade_Out,
out float NotInShadow)
{
float d=dot((Nearest-Position),Forward);
float sh=smoothstep(Width*0.5,Width*0.5+Fuzz*max(d,0.0)+Min_Fuzz,DistToCenter);
NotInShadow=1.0-(1.0-sh)*smoothstep(-Fade_Out,0.0,d);
}
void Scale_Color_B91(
vec4 Color,
float Scalar,
out vec4 Result)
{
Result=Scalar*Color;
}
void From_HSV_B73(
float Hue,
float Saturation,
float Value,
float Alpha,
out vec4 Color)
{
vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);
vec3 p=abs(fract(vec3(Hue,Hue,Hue)+K.xyz)*6.0-K.www);
Color.rgb=Value*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),Saturation);
Color.a=Alpha;
}
void Fast_Fresnel_B122(
float Front_Reflect,
float Edge_Reflect,
float Power,
vec3 Normal,
vec3 Incident,
out float Transmit,
out float Reflect)
{
float d=max(-dot(Incident,Normal),0.0);
Reflect=Front_Reflect+(Edge_Reflect-Front_Reflect)*pow(.01-d,Power);
Transmit=1.0-Reflect;
}
void Mapped_Environment_B51(
sampler2D Reflected_Environment,
sampler2D Indirect_Environment,
vec3 Dir,
out vec4 Reflected_Color,
out vec4 Indirect_Diffuse)
{
Reflected_Color=texture(Reflected_Environment,vec2(atan(Dir.z,Dir.x)/3.14159*0.5,asin(Dir.y)/3.14159+0.5));
Indirect_Diffuse=texture(Indirect_Environment,vec2(atan(Dir.z,Dir.x)/3.14159*0.5,asin(Dir.y)/3.14159+0.5));
}
vec4 SampleEnv_Bid50(vec3 D,vec4 S,vec4 H,vec4 G,float exponent)
{
float k=pow(abs(D.y),exponent);
vec4 C;
if (D.y>0.0) {
C=mix(H,S,k);
} else {
C=mix(H,G,k); 
}
return C;
}
void Sky_Environment_B50(
vec3 Normal,
vec3 Reflected,
vec4 Sky_Color,
vec4 Horizon_Color,
vec4 Ground_Color,
float Horizon_Power,
out vec4 Reflected_Color,
out vec4 Indirect_Color)
{
Reflected_Color=SampleEnv_Bid50(Reflected,Sky_Color,Horizon_Color,Ground_Color,Horizon_Power);
Indirect_Color=mix(Ground_Color,Sky_Color,Normal.y*0.5+0.5);
}
void Min_Segment_Distance_B65(
vec3 P0,
vec3 P1,
vec3 Q0,
vec3 Q1,
out vec3 NearP,
out vec3 NearQ,
out float Distance)
{
vec3 u=P1-P0;
vec3 v=Q1-Q0;
vec3 w=P0-Q0;
float a=dot(u,u);
float b=dot(u,v);
float c=dot(v,v);
float d=dot(u,w);
float e=dot(v,w);
float D=a*c-b*b;
float sD=D;
float tD=D;
float sc,sN,tc,tN;
if (D<0.00001) {
sN=0.0;
sD=1.0;
tN=e;
tD=c;
} else {
sN=(b*e-c*d);
tN=(a*e-b*d);
if (sN<0.0) {
sN=0.0;
tN=e;
tD=c;
} else if (sN>sD) {
sN=sD;
tN=e+b;
tD=c;
}
}
if (tN<0.0) {
tN=0.0;
if (-d<0.0) {
sN=0.0;
} else if (-d>a) {
sN=sD;
} else {
sN=-d;
sD=a;
}
} else if (tN>tD) {
tN=tD;
if ((-d+b)<0.0) {
sN=0.0;
} else if ((-d+b)>a) {
sN=sD;
} else {
sN=(-d+b);
sD=a;
}
}
sc=abs(sN)<0.000001 ? 0.0 : sN/sD;
tc=abs(tN)<0.000001 ? 0.0 : tN/tD;
NearP=P0+sc*u;
NearQ=Q0+tc*v;
Distance=distance(NearP,NearQ);
}
void To_XYZ_B74(
vec3 Vec3,
out float X,
out float Y,
out float Z)
{
X=Vec3.x;
Y=Vec3.y;
Z=Vec3.z;
}
void Finger_Positions_B64(
vec3 Left_Index_Pos,
vec3 Right_Index_Pos,
vec3 Left_Index_Middle_Pos,
vec3 Right_Index_Middle_Pos,
out vec3 Left_Index,
out vec3 Right_Index,
out vec3 Left_Index_Middle,
out vec3 Right_Index_Middle)
{
Left_Index= (Use_Global_Left_Index ? Global_Left_Index_Tip_Position.xyz : Left_Index_Pos);
Right_Index= (Use_Global_Right_Index ? Global_Right_Index_Tip_Position.xyz : Right_Index_Pos);
Left_Index_Middle= (Use_Global_Left_Index ? Global_Left_Index_Middle_Position.xyz : Left_Index_Middle_Pos);
Right_Index_Middle= (Use_Global_Right_Index ? Global_Right_Index_Middle_Position.xyz : Right_Index_Middle_Pos);
}
void VaryHSV_B108(
vec3 HSV_In,
float Hue_Shift,
float Saturation_Shift,
float Value_Shift,
out vec3 HSV_Out)
{
HSV_Out=vec3(fract(HSV_In.x+Hue_Shift),clamp(HSV_In.y+Saturation_Shift,0.0,1.0),clamp(HSV_In.z+Value_Shift,0.0,1.0));
}
void Remap_Range_B114(
float In_Min,
float In_Max,
float Out_Min,
float Out_Max,
float In,
out float Out)
{
Out=mix(Out_Min,Out_Max,clamp((In-In_Min)/(In_Max-In_Min),0.0,1.0));
}
void To_HSV_B75(
vec4 Color,
out float Hue,
out float Saturation,
out float Value,
out float Alpha,
out vec3 HSV)
{
vec4 K=vec4(0.0,-1.0/3.0,2.0/3.0,-1.0);
vec4 p=Color.g<Color.b ? vec4(Color.bg,K.wz) : vec4(Color.gb,K.xy);
vec4 q=Color.r<p.x ? vec4(p.xyw,Color.r) : vec4(Color.r,p.yzx);
float d=q.x-min(q.w,q.y);
float e=1.0e-10;
Hue=abs(q.z+(q.w-q.y)/(6.0*d+e));
Saturation=d/(q.x+e);
Value=q.x;
Alpha=Color.a;
HSV=vec3(Hue,Saturation,Value);
}
void Code_B110(
float X,
out float Result)
{
Result=(acos(X)/3.14159-0.5)*2.0;
}
void Rim_Light_B132(
vec3 Front,
vec3 Normal,
vec3 Incident,
float Rim_Intensity,
sampler2D Texture,
out vec4 Result)
{
vec3 R=reflect(Incident,Normal);
float RdotF=dot(R,Front);
float RdotL=sqrt(1.0-RdotF*RdotF);
vec2 UV=vec2(R.y*0.5+0.5,0.5);
vec4 Color=texture(Texture,UV);
Result=Color;
}
void main()
{
vec4 Blob_Color_Q30;
#if BLOB_ENABLE
Blob_Fragment_B30(_Blob_Texture_,vExtra2,vExtra3,Blob_Color_Q30);
#else
Blob_Color_Q30=vec4(0,0,0,0);
#endif
vec3 Incident_Q39=normalize(vPosition-cameraPosition);
vec3 Normalized_Q38=normalize(vNormal);
vec3 Normalized_Q71=normalize(vTangent);
vec4 Color_Q83;
#if DECAL_ENABLE
Color_Q83=texture(_Decal_,vUV);
#else
Color_Q83=vec4(0,0,0,0);
#endif
float X_Q90;
float Y_Q90;
float Z_Q90;
float W_Q90;
X_Q90=vExtra1.x;
Y_Q90=vExtra1.y;
Z_Q90=vExtra1.z;
W_Q90=vExtra1.w;
vec4 Linear_Q43;
Linear_Q43.rgb=clamp(_Sky_Color_.rgb*_Sky_Color_.rgb,0.0,1.0);
Linear_Q43.a=_Sky_Color_.a;
vec4 Linear_Q44;
Linear_Q44.rgb=clamp(_Horizon_Color_.rgb*_Horizon_Color_.rgb,0.0,1.0);
Linear_Q44.a=_Horizon_Color_.a;
vec4 Linear_Q45;
Linear_Q45.rgb=clamp(_Ground_Color_.rgb*_Ground_Color_.rgb,0.0,1.0);
Linear_Q45.a=_Ground_Color_.a;
vec3 Left_Index_Q64;
vec3 Right_Index_Q64;
vec3 Left_Index_Middle_Q64;
vec3 Right_Index_Middle_Q64;
Finger_Positions_B64(_Left_Index_Pos_,_Right_Index_Pos_,_Left_Index_Middle_Pos_,_Right_Index_Middle_Pos_,Left_Index_Q64,Right_Index_Q64,Left_Index_Middle_Q64,Right_Index_Middle_Q64);
vec4 Linear_Q46;
Linear_Q46.rgb=clamp(_Albedo_.rgb*_Albedo_.rgb,0.0,1.0);
Linear_Q46.a=_Albedo_.a;
vec3 Normalized_Q107=normalize(vBinormal);
vec3 Incident_Q70=normalize(vPosition-cameraPosition);
vec3 New_Normal_Q79;
Bulge_B79(_Bulge_Enabled_,Normalized_Q38,Normalized_Q71,_Bulge_Height_,vColor,_Bulge_Radius_,vBinormal,New_Normal_Q79);
float Result_Q77;
SSS_B77(vBinormal,New_Normal_Q79,Incident_Q39,Result_Q77);
vec4 Result_Q91;
Scale_Color_B91(Color_Q83,X_Q90,Result_Q91);
float Transmit_Q122;
float Reflect_Q122;
Fast_Fresnel_B122(_Front_Reflect_,_Edge_Reflect_,_Power_,New_Normal_Q79,Incident_Q39,Transmit_Q122,Reflect_Q122);
float Product_Q125=Y_Q90*Y_Q90;
vec3 NearP_Q65;
vec3 NearQ_Q65;
float Distance_Q65;
Min_Segment_Distance_B65(Left_Index_Q64,Left_Index_Middle_Q64,vPosition,cameraPosition,NearP_Q65,NearQ_Q65,Distance_Q65);
vec3 NearP_Q63;
vec3 NearQ_Q63;
float Distance_Q63;
Min_Segment_Distance_B65(Right_Index_Q64,Right_Index_Middle_Q64,vPosition,cameraPosition,NearP_Q63,NearQ_Q63,Distance_Q63);
vec3 Reflected_Q47=reflect(Incident_Q39,New_Normal_Q79);
vec4 Product_Q103=Linear_Q46*vec4(1,1,1,1);
vec4 Result_Q132;
Rim_Light_B132(Normalized_Q107,Normalized_Q38,Incident_Q70,_Rim_Intensity_,_Rim_Texture_,Result_Q132);
float Dot_Q72=dot(Incident_Q70, Normalized_Q71);
float MaxAB_Q123=max(Reflect_Q122,Product_Q125);
float NotInShadow_Q67;
#if OCCLUSION_ENABLED
FingerOcclusion_B67(_Width_,Distance_Q65,_Fuzz_,_Min_Fuzz_,vPosition,vBinormal,NearP_Q65,_Clip_Fade_,NotInShadow_Q67);
#else
NotInShadow_Q67=1.0;
#endif
float NotInShadow_Q68;
#if OCCLUSION_ENABLED
FingerOcclusion_B68(_Width_,Distance_Q63,_Fuzz_,_Min_Fuzz_,vPosition,vBinormal,NearP_Q63,_Clip_Fade_,NotInShadow_Q68);
#else
NotInShadow_Q68=1.0;
#endif
vec4 Reflected_Color_Q51;
vec4 Indirect_Diffuse_Q51;
#if ENV_ENABLE
Mapped_Environment_B51(_Reflection_Map_,_Indirect_Environment_,Reflected_Q47,Reflected_Color_Q51,Indirect_Diffuse_Q51);
#else
Reflected_Color_Q51=vec4(0,0,0,1);
Indirect_Diffuse_Q51=vec4(0,0,0,1);
#endif
vec4 Reflected_Color_Q50;
vec4 Indirect_Color_Q50;
#if SKY_ENABLED
Sky_Environment_B50(New_Normal_Q79,Reflected_Q47,Linear_Q43,Linear_Q44,Linear_Q45,_Horizon_Power_,Reflected_Color_Q50,Indirect_Color_Q50);
#else
Reflected_Color_Q50=vec4(0,0,0,1);
Indirect_Color_Q50=vec4(0,0,0,1);
#endif
float Hue_Q75;
float Saturation_Q75;
float Value_Q75;
float Alpha_Q75;
vec3 HSV_Q75;
To_HSV_B75(Product_Q103,Hue_Q75,Saturation_Q75,Value_Q75,Alpha_Q75,HSV_Q75);
float Hue_Q127;
float Saturation_Q127;
float Value_Q127;
float Alpha_Q127;
vec3 HSV_Q127;
To_HSV_B75(Result_Q132,Hue_Q127,Saturation_Q127,Value_Q127,Alpha_Q127,HSV_Q127);
float Result_Q110;
Code_B110(Dot_Q72,Result_Q110);
float AbsA_Q76=abs(Result_Q110);
float MinAB_Q58=min(NotInShadow_Q67,NotInShadow_Q68);
vec4 Sum_Q48=Reflected_Color_Q51+Reflected_Color_Q50;
vec4 Sum_Q49=Indirect_Diffuse_Q51+Indirect_Color_Q50;
vec3 HSV_Out_Q126;
VaryHSV_B108(HSV_Q127,_Rim_Hue_Shift_,_Rim_Saturation_Shift_,_Rim_Value_Shift_,HSV_Out_Q126);
float Out_Q114;
Remap_Range_B114(-1.0,1.0,0.0,1.0,Result_Q110,Out_Q114);
float Product_Q106;
Product_Q106=AbsA_Q76*_Hue_Shift_;
float X_Q128;
float Y_Q128;
float Z_Q128;
To_XYZ_B74(HSV_Out_Q126,X_Q128,Y_Q128,Z_Q128);
vec2 Vec2_Q112=vec2(Out_Q114,0.5);
vec3 HSV_Out_Q108;
VaryHSV_B108(HSV_Q75,Product_Q106,_Saturation_Shift_,_Value_Shift_,HSV_Out_Q108);
vec4 Color_Q129;
From_HSV_B73(X_Q128,Y_Q128,Z_Q128,0.0,Color_Q129);
vec4 Color_Q111;
#if IRIDESCENCE_ENABLED
Color_Q111=texture(_Iridescence_Texture_,Vec2_Q112);
#else
Color_Q111=vec4(0,0,0,0);
#endif
float X_Q74;
float Y_Q74;
float Z_Q74;
To_XYZ_B74(HSV_Out_Q108,X_Q74,Y_Q74,Z_Q74);
vec4 Result_Q131=_Rim_Intensity_*Color_Q129;
vec4 Result_Q113=_Iridescence_Intensity_*Color_Q111;
vec4 Color_Q73;
From_HSV_B73(X_Q74,Y_Q74,Z_Q74,0.0,Color_Q73);
vec4 Result_Q84=Result_Q91+(1.0-Result_Q91.a)*Color_Q73;
vec4 Result_Q121;
Fragment_Main_B121(_Sun_Intensity_,_Sun_Theta_,_Sun_Phi_,New_Normal_Q79,Result_Q84,MaxAB_Q123,_Shininess_,Incident_Q39,_Horizon_Color_,_Sky_Color_,_Ground_Color_,_Indirect_Diffuse_,_Specular_,_Horizon_Power_,_Reflection_,Sum_Q48,Sum_Q49,_Sharpness_,Result_Q77,_Subsurface_,vec4(0,0,0,0),Result_Q131,Result_Q113,Result_Q121);
vec4 Result_Q59;
Scale_RGB_B59(Result_Q121,MinAB_Q58,Result_Q59);
vec4 sRGB_Q42;
FastLinearTosRGB_B42(Result_Q59,sRGB_Q42);
vec4 Result_Q31=Blob_Color_Q30+(1.0-Blob_Color_Q30.a)*sRGB_Q42;
vec4 Result_Q40=Result_Q31; Result_Q40.a=1.0;
vec4 Out_Color=Result_Q40;
float Clip_Threshold=0.001;
bool To_sRGB=false;
gl_FragColor=Out_Color;
}`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlSliderBar.vertex.js":(C,v,n)=>{n.r(v),n.d(v,{mrdlSliderBarVertexShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="mrdlSliderBarVertexShader",f=`uniform mat4 world;
uniform mat4 viewProjection;
uniform vec3 cameraPosition;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
#ifdef TANGENT
attribute vec3 tangent;
#else
const vec3 tangent=vec3(0.);
#endif
uniform float _Radius_;
uniform float _Bevel_Front_;
uniform float _Bevel_Front_Stretch_;
uniform float _Bevel_Back_;
uniform float _Bevel_Back_Stretch_;
uniform float _Radius_Top_Left_;
uniform float _Radius_Top_Right_;
uniform float _Radius_Bottom_Left_;
uniform float _Radius_Bottom_Right_;
uniform bool _Bulge_Enabled_;
uniform float _Bulge_Height_;
uniform float _Bulge_Radius_;
uniform float _Sun_Intensity_;
uniform float _Sun_Theta_;
uniform float _Sun_Phi_;
uniform float _Indirect_Diffuse_;
uniform vec4 _Albedo_;
uniform float _Specular_;
uniform float _Shininess_;
uniform float _Sharpness_;
uniform float _Subsurface_;
uniform vec4 _Left_Color_;
uniform vec4 _Right_Color_;
uniform float _Reflection_;
uniform float _Front_Reflect_;
uniform float _Edge_Reflect_;
uniform float _Power_;
uniform vec4 _Sky_Color_;
uniform vec4 _Horizon_Color_;
uniform vec4 _Ground_Color_;
uniform float _Horizon_Power_;
uniform sampler2D _Reflection_Map_;
uniform sampler2D _Indirect_Environment_;
uniform float _Width_;
uniform float _Fuzz_;
uniform float _Min_Fuzz_;
uniform float _Clip_Fade_;
uniform float _Hue_Shift_;
uniform float _Saturation_Shift_;
uniform float _Value_Shift_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform sampler2D _Blob_Texture_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform vec3 _Left_Index_Pos_;
uniform vec3 _Right_Index_Pos_;
uniform vec3 _Left_Index_Middle_Pos_;
uniform vec3 _Right_Index_Middle_Pos_;
uniform sampler2D _Decal_;
uniform vec2 _Decal_Scale_XY_;
uniform bool _Decal_Front_Only_;
uniform float _Rim_Intensity_;
uniform sampler2D _Rim_Texture_;
uniform float _Rim_Hue_Shift_;
uniform float _Rim_Saturation_Shift_;
uniform float _Rim_Value_Shift_;
uniform float _Iridescence_Intensity_;
uniform sampler2D _Iridescence_Texture_;
uniform bool Use_Global_Left_Index;
uniform bool Use_Global_Right_Index;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
uniform vec4 Global_Left_Thumb_Tip_Position;
uniform vec4 Global_Right_Thumb_Tip_Position;
uniform float Global_Left_Index_Tip_Proximity;
uniform float Global_Right_Index_Tip_Proximity;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vColor;
varying vec4 vExtra1;
varying vec4 vExtra2;
varying vec4 vExtra3;
void Object_To_World_Pos_B12(
vec3 Pos_Object,
out vec3 Pos_World)
{
Pos_World=(world*vec4(Pos_Object,1.0)).xyz;
}
void Object_To_World_Normal_B32(
vec3 Nrm_Object,
out vec3 Nrm_World)
{
Nrm_World=(vec4(Nrm_Object,0.0)).xyz;
}
void Blob_Vertex_B23(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
float Blob_Fade_Length,
float Blob_Pulse,
float Blob_Fade,
out vec4 Blob_Info)
{
vec3 blob= (Use_Global_Left_Index ? Global_Left_Index_Tip_Position.xyz : Blob_Position);
vec3 delta=blob-Position;
float dist=dot(Normal,delta);
float lerpValue=clamp((abs(dist)-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);
float fadeValue=1.0-clamp((abs(dist)-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);
float size=Blob_Near_Size+(Blob_Far_Size-Blob_Near_Size)*lerpValue;
vec2 blobXY=vec2(dot(delta,Tangent),dot(delta,Bitangent))/(0.0001+size);
float Fade=fadeValue*Intensity*Blob_Fade;
float Distance=(lerpValue*0.5+0.5)*(1.0-Blob_Pulse);
Blob_Info=vec4(blobXY.x,blobXY.y,Distance,Fade);
}
void Blob_Vertex_B24(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
float Blob_Fade_Length,
float Blob_Pulse,
float Blob_Fade,
out vec4 Blob_Info)
{
vec3 blob= (Use_Global_Right_Index ? Global_Right_Index_Tip_Position.xyz : Blob_Position);
vec3 delta=blob-Position;
float dist=dot(Normal,delta);
float lerpValue=clamp((abs(dist)-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);
float fadeValue=1.0-clamp((abs(dist)-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);
float size=Blob_Near_Size+(Blob_Far_Size-Blob_Near_Size)*lerpValue;
vec2 blobXY=vec2(dot(delta,Tangent),dot(delta,Bitangent))/(0.0001+size);
float Fade=fadeValue*Intensity*Blob_Fade;
float Distance=(lerpValue*0.5+0.5)*(1.0-Blob_Pulse);
Blob_Info=vec4(blobXY.x,blobXY.y,Distance,Fade);
}
void Move_Verts_B130(
float Anisotropy,
vec3 P,
float Radius,
float Bevel,
vec3 Normal_Object,
float ScaleZ,
float Stretch,
out vec3 New_P,
out vec2 New_UV,
out float Radial_Gradient,
out vec3 Radial_Dir,
out vec3 New_Normal)
{
vec2 UV=P.xy*2.0+0.5;
vec2 center=clamp(UV,0.0,1.0);
vec2 delta=UV-center;
float deltad=(length(delta)*2.0);
float f=(Bevel+(Radius-Bevel)*Stretch)/Radius;
float innerd=clamp(deltad*2.0,0.0,1.0);
float outerd=clamp(deltad*2.0-1.0,0.0,1.0);
float bevelAngle=outerd*3.14159*0.5;
float sinb=sin(bevelAngle);
float cosb=cos(bevelAngle);
float beveld=(1.0-f)*innerd+f*sinb;
float br=outerd;
vec2 r2=2.0*vec2(Radius/Anisotropy,Radius);
float dir=P.z<0.0001 ? 1.0 : -1.0;
New_UV=center+r2*((0.5-center)+normalize(delta+vec2(0.0,0.000001))*beveld*0.5);
New_P=vec3(New_UV-0.5,P.z+dir*(1.0-cosb)*Bevel*ScaleZ);
Radial_Gradient=clamp((deltad-0.5)*2.0,0.0,1.0);
Radial_Dir=vec3(delta*r2,0.0);
vec3 beveledNormal=cosb*Normal_Object+sinb*vec3(delta.x,delta.y,0.0);
New_Normal=Normal_Object.z==0.0 ? Normal_Object : beveledNormal;
}
void Object_To_World_Dir_B60(
vec3 Dir_Object,
out vec3 Normal_World,
out vec3 Normal_World_N,
out float Normal_Length)
{
Normal_World=(world*vec4(Dir_Object,0.0)).xyz;
Normal_Length=length(Normal_World);
Normal_World_N=Normal_World/Normal_Length;
}
void To_XYZ_B78(
vec3 Vec3,
out float X,
out float Y,
out float Z)
{
X=Vec3.x;
Y=Vec3.y;
Z=Vec3.z;
}
void Conditional_Float_B93(
bool Which,
float If_True,
float If_False,
out float Result)
{
Result=Which ? If_True : If_False;
}
void Object_To_World_Dir_B28(
vec3 Dir_Object,
out vec3 Binormal_World,
out vec3 Binormal_World_N,
out float Binormal_Length)
{
Binormal_World=(world*vec4(Dir_Object,0.0)).xyz;
Binormal_Length=length(Binormal_World);
Binormal_World_N=Binormal_World/Binormal_Length;
}
void Pick_Radius_B69(
float Radius,
float Radius_Top_Left,
float Radius_Top_Right,
float Radius_Bottom_Left,
float Radius_Bottom_Right,
vec3 Position,
out float Result)
{
bool whichY=Position.y>0.0;
Result=Position.x<0.0 ? (whichY ? Radius_Top_Left : Radius_Bottom_Left) : (whichY ? Radius_Top_Right : Radius_Bottom_Right);
Result*=Radius;
}
void Conditional_Float_B36(
bool Which,
float If_True,
float If_False,
out float Result)
{
Result=Which ? If_True : If_False;
}
void Greater_Than_B37(
float Left,
float Right,
out bool Not_Greater_Than,
out bool Greater_Than)
{
Greater_Than=Left>Right;
Not_Greater_Than=!Greater_Than;
}
void Remap_Range_B105(
float In_Min,
float In_Max,
float Out_Min,
float Out_Max,
float In,
out float Out)
{
Out=mix(Out_Min,Out_Max,clamp((In-In_Min)/(In_Max-In_Min),0.0,1.0));
}
void main()
{
vec2 XY_Q85;
XY_Q85=(uv-vec2(0.5,0.5))*_Decal_Scale_XY_+vec2(0.5,0.5);
vec3 Tangent_World_Q27;
vec3 Tangent_World_N_Q27;
float Tangent_Length_Q27;
Tangent_World_Q27=(world*vec4(vec3(1,0,0),0.0)).xyz;
Tangent_Length_Q27=length(Tangent_World_Q27);
Tangent_World_N_Q27=Tangent_World_Q27/Tangent_Length_Q27;
vec3 Normal_World_Q60;
vec3 Normal_World_N_Q60;
float Normal_Length_Q60;
Object_To_World_Dir_B60(vec3(0,0,1),Normal_World_Q60,Normal_World_N_Q60,Normal_Length_Q60);
float X_Q78;
float Y_Q78;
float Z_Q78;
To_XYZ_B78(position,X_Q78,Y_Q78,Z_Q78);
vec3 Nrm_World_Q26;
Nrm_World_Q26=normalize((world*vec4(normal,0.0)).xyz);
vec3 Binormal_World_Q28;
vec3 Binormal_World_N_Q28;
float Binormal_Length_Q28;
Object_To_World_Dir_B28(vec3(0,1,0),Binormal_World_Q28,Binormal_World_N_Q28,Binormal_Length_Q28);
float Anisotropy_Q29=Tangent_Length_Q27/Binormal_Length_Q28;
float Result_Q69;
Pick_Radius_B69(_Radius_,_Radius_Top_Left_,_Radius_Top_Right_,_Radius_Bottom_Left_,_Radius_Bottom_Right_,position,Result_Q69);
float Anisotropy_Q53=Binormal_Length_Q28/Normal_Length_Q60;
bool Not_Greater_Than_Q37;
bool Greater_Than_Q37;
Greater_Than_B37(Z_Q78,0.0,Not_Greater_Than_Q37,Greater_Than_Q37);
vec4 Linear_Q101;
Linear_Q101.rgb=clamp(_Left_Color_.rgb*_Left_Color_.rgb,0.0,1.0);
Linear_Q101.a=_Left_Color_.a;
vec4 Linear_Q102;
Linear_Q102.rgb=clamp(_Right_Color_.rgb*_Right_Color_.rgb,0.0,1.0);
Linear_Q102.a=_Right_Color_.a;
vec3 Difference_Q61=vec3(0,0,0)-Normal_World_N_Q60;
vec4 Out_Color_Q34=vec4(X_Q78,Y_Q78,Z_Q78,1);
float Result_Q36;
Conditional_Float_B36(Greater_Than_Q37,_Bevel_Back_,_Bevel_Front_,Result_Q36);
float Result_Q94;
Conditional_Float_B36(Greater_Than_Q37,_Bevel_Back_Stretch_,_Bevel_Front_Stretch_,Result_Q94);
vec3 New_P_Q130;
vec2 New_UV_Q130;
float Radial_Gradient_Q130;
vec3 Radial_Dir_Q130;
vec3 New_Normal_Q130;
Move_Verts_B130(Anisotropy_Q29,position,Result_Q69,Result_Q36,normal,Anisotropy_Q53,Result_Q94,New_P_Q130,New_UV_Q130,Radial_Gradient_Q130,Radial_Dir_Q130,New_Normal_Q130);
float X_Q98;
float Y_Q98;
X_Q98=New_UV_Q130.x;
Y_Q98=New_UV_Q130.y;
vec3 Pos_World_Q12;
Object_To_World_Pos_B12(New_P_Q130,Pos_World_Q12);
vec3 Nrm_World_Q32;
Object_To_World_Normal_B32(New_Normal_Q130,Nrm_World_Q32);
vec4 Blob_Info_Q23;
#if BLOB_ENABLE
Blob_Vertex_B23(Pos_World_Q12,Nrm_World_Q26,Tangent_World_N_Q27,Binormal_World_N_Q28,_Blob_Position_,_Blob_Intensity_,_Blob_Near_Size_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_,_Blob_Fade_,Blob_Info_Q23);
#else
Blob_Info_Q23=vec4(0,0,0,0);
#endif
vec4 Blob_Info_Q24;
#if BLOB_ENABLE_2
Blob_Vertex_B24(Pos_World_Q12,Nrm_World_Q26,Tangent_World_N_Q27,Binormal_World_N_Q28,_Blob_Position_2_,_Blob_Intensity_,_Blob_Near_Size_2_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_2_,_Blob_Fade_2_,Blob_Info_Q24);
#else
Blob_Info_Q24=vec4(0,0,0,0);
#endif
float Out_Q105;
Remap_Range_B105(0.0,1.0,0.0,1.0,X_Q98,Out_Q105);
float X_Q86;
float Y_Q86;
float Z_Q86;
To_XYZ_B78(Nrm_World_Q32,X_Q86,Y_Q86,Z_Q86);
vec4 Color_At_T_Q97=mix(Linear_Q101,Linear_Q102,Out_Q105);
float Minus_F_Q87=-Z_Q86;
float R_Q99;
float G_Q99;
float B_Q99;
float A_Q99;
R_Q99=Color_At_T_Q97.r; G_Q99=Color_At_T_Q97.g; B_Q99=Color_At_T_Q97.b; A_Q99=Color_At_T_Q97.a;
float ClampF_Q88=clamp(0.0,Minus_F_Q87,1.0);
float Result_Q93;
Conditional_Float_B93(_Decal_Front_Only_,ClampF_Q88,1.0,Result_Q93);
vec4 Vec4_Q89=vec4(Result_Q93,Radial_Gradient_Q130,G_Q99,B_Q99);
vec3 Position=Pos_World_Q12;
vec3 Normal=Nrm_World_Q32;
vec2 UV=XY_Q85;
vec3 Tangent=Tangent_World_N_Q27;
vec3 Binormal=Difference_Q61;
vec4 Color=Out_Color_Q34;
vec4 Extra1=Vec4_Q89;
vec4 Extra2=Blob_Info_Q23;
vec4 Extra3=Blob_Info_Q24;
gl_Position=viewProjection*vec4(Position,1);
vPosition=Position;
vNormal=Normal;
vUV=UV;
vTangent=Tangent;
vBinormal=Binormal;
vColor=Color;
vExtra1=Extra1;
vExtra2=Extra2;
vExtra3=Extra3;
}`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlSliderThumb.fragment.js":(C,v,n)=>{n.r(v),n.d(v,{mrdlSliderThumbPixelShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="mrdlSliderThumbPixelShader",f=`uniform vec3 cameraPosition;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vColor;
varying vec4 vExtra1;
varying vec4 vExtra2;
varying vec4 vExtra3;
uniform float _Radius_;
uniform float _Bevel_Front_;
uniform float _Bevel_Front_Stretch_;
uniform float _Bevel_Back_;
uniform float _Bevel_Back_Stretch_;
uniform float _Radius_Top_Left_;
uniform float _Radius_Top_Right_;
uniform float _Radius_Bottom_Left_;
uniform float _Radius_Bottom_Right_;
uniform bool _Bulge_Enabled_;
uniform float _Bulge_Height_;
uniform float _Bulge_Radius_;
uniform float _Sun_Intensity_;
uniform float _Sun_Theta_;
uniform float _Sun_Phi_;
uniform float _Indirect_Diffuse_;
uniform vec4 _Albedo_;
uniform float _Specular_;
uniform float _Shininess_;
uniform float _Sharpness_;
uniform float _Subsurface_;
uniform vec4 _Left_Color_;
uniform vec4 _Right_Color_;
uniform float _Reflection_;
uniform float _Front_Reflect_;
uniform float _Edge_Reflect_;
uniform float _Power_;
uniform vec4 _Sky_Color_;
uniform vec4 _Horizon_Color_;
uniform vec4 _Ground_Color_;
uniform float _Horizon_Power_;
uniform sampler2D _Reflection_Map_;
uniform sampler2D _Indirect_Environment_;
uniform float _Width_;
uniform float _Fuzz_;
uniform float _Min_Fuzz_;
uniform float _Clip_Fade_;
uniform float _Hue_Shift_;
uniform float _Saturation_Shift_;
uniform float _Value_Shift_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform sampler2D _Blob_Texture_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform vec3 _Left_Index_Pos_;
uniform vec3 _Right_Index_Pos_;
uniform vec3 _Left_Index_Middle_Pos_;
uniform vec3 _Right_Index_Middle_Pos_;
uniform sampler2D _Decal_;
uniform vec2 _Decal_Scale_XY_;
uniform bool _Decal_Front_Only_;
uniform float _Rim_Intensity_;
uniform sampler2D _Rim_Texture_;
uniform float _Rim_Hue_Shift_;
uniform float _Rim_Saturation_Shift_;
uniform float _Rim_Value_Shift_;
uniform float _Iridescence_Intensity_;
uniform sampler2D _Iridescence_Texture_;
uniform bool Use_Global_Left_Index;
uniform bool Use_Global_Right_Index;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
uniform vec4 Global_Left_Thumb_Tip_Position;
uniform vec4 Global_Right_Thumb_Tip_Position;
uniform vec4 Global_Left_Index_Middle_Position;
uniform vec4 Global_Right_Index_Middle_Position;
uniform float Global_Left_Index_Tip_Proximity;
uniform float Global_Right_Index_Tip_Proximity;
void Blob_Fragment_B180(
sampler2D Blob_Texture,
vec4 Blob_Info1,
vec4 Blob_Info2,
out vec4 Blob_Color)
{
float k1=dot(Blob_Info1.xy,Blob_Info1.xy);
float k2=dot(Blob_Info2.xy,Blob_Info2.xy);
vec3 closer=k1<k2 ? vec3(k1,Blob_Info1.z,Blob_Info1.w) : vec3(k2,Blob_Info2.z,Blob_Info2.w);
Blob_Color=closer.z*texture(Blob_Texture,vec2(vec2(sqrt(closer.x),closer.y).x,1.0-vec2(sqrt(closer.x),closer.y).y))*clamp(1.0-closer.x,0.0,1.0);
}
void FastLinearTosRGB_B192(
vec4 Linear,
out vec4 sRGB)
{
sRGB.rgb=sqrt(clamp(Linear.rgb,0.0,1.0));
sRGB.a=Linear.a;
}
void Scale_RGB_B209(
vec4 Color,
float Scalar,
out vec4 Result)
{
Result=vec4(Scalar,Scalar,Scalar,1)*Color;
}
void Fragment_Main_B271(
float Sun_Intensity,
float Sun_Theta,
float Sun_Phi,
vec3 Normal,
vec4 Albedo,
float Fresnel_Reflect,
float Shininess,
vec3 Incident,
vec4 Horizon_Color,
vec4 Sky_Color,
vec4 Ground_Color,
float Indirect_Diffuse,
float Specular,
float Horizon_Power,
float Reflection,
vec4 Reflection_Sample,
vec4 Indirect_Sample,
float Sharpness,
float SSS,
float Subsurface,
vec4 Translucence,
vec4 Rim_Light,
vec4 Iridescence,
out vec4 Result)
{
float theta=Sun_Theta*2.0*3.14159;
float phi=Sun_Phi*3.14159;
vec3 lightDir= vec3(cos(phi)*cos(theta),sin(phi),cos(phi)*sin(theta));
float NdotL=max(dot(lightDir,Normal),0.0);
vec3 R=reflect(Incident,Normal);
float RdotL=max(0.0,dot(R,lightDir));
float specular=pow(RdotL,Shininess);
specular=mix(specular,smoothstep(0.495*Sharpness,1.0-0.495*Sharpness,specular),Sharpness);
vec4 gi=mix(Ground_Color,Sky_Color,Normal.y*0.5+0.5);
Result=((Sun_Intensity*NdotL+Indirect_Sample*Indirect_Diffuse+Translucence)*(1.0+SSS*Subsurface))*Albedo*(1.0-Fresnel_Reflect)+(Sun_Intensity*specular*Specular+Fresnel_Reflect*Reflection*Reflection_Sample)+Fresnel_Reflect*Rim_Light+Iridescence;
}
void Bulge_B229(
bool Enabled,
vec3 Normal,
vec3 Tangent,
float Bulge_Height,
vec4 UV,
float Bulge_Radius,
vec3 ButtonN,
out vec3 New_Normal)
{
vec2 xy=clamp(UV.xy*2.0,vec2(-1,-1),vec2(1,1));
vec3 B=(cross(Normal,Tangent));
float k=-clamp(1.0-length(xy)/Bulge_Radius,0.0,1.0)*Bulge_Height;
k=sin(k*3.14159*0.5);
k*=smoothstep(0.9998,0.9999,abs(dot(ButtonN,Normal)));
New_Normal=Normal*sqrt(1.0-k*k)+(xy.x*Tangent+xy.y*B)*k;
New_Normal=Enabled ? New_Normal : Normal;
}
void SSS_B227(
vec3 ButtonN,
vec3 Normal,
vec3 Incident,
out float Result)
{
float NdotI=abs(dot(Normal,Incident));
float BdotI=abs(dot(ButtonN,Incident));
Result=(abs(NdotI-BdotI)); 
}
void FingerOcclusion_B217(
float Width,
float DistToCenter,
float Fuzz,
float Min_Fuzz,
vec3 Position,
vec3 Forward,
vec3 Nearest,
float Fade_Out,
out float NotInShadow)
{
float d=dot((Nearest-Position),Forward);
float sh=smoothstep(Width*0.5,Width*0.5+Fuzz*max(d,0.0)+Min_Fuzz,DistToCenter);
NotInShadow=1.0-(1.0-sh)*smoothstep(-Fade_Out,0.0,d);
}
void FingerOcclusion_B218(
float Width,
float DistToCenter,
float Fuzz,
float Min_Fuzz,
vec3 Position,
vec3 Forward,
vec3 Nearest,
float Fade_Out,
out float NotInShadow)
{
float d=dot((Nearest-Position),Forward);
float sh=smoothstep(Width*0.5,Width*0.5+Fuzz*max(d,0.0)+Min_Fuzz,DistToCenter);
NotInShadow=1.0-(1.0-sh)*smoothstep(-Fade_Out,0.0,d);
}
void Scale_Color_B241(
vec4 Color,
float Scalar,
out vec4 Result)
{
Result=Scalar*Color;
}
void From_HSV_B223(
float Hue,
float Saturation,
float Value,
float Alpha,
out vec4 Color)
{
vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);
vec3 p=abs(fract(vec3(Hue,Hue,Hue)+K.xyz)*6.0-K.www);
Color.rgb=Value*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),Saturation);
Color.a=Alpha;
}
void Fast_Fresnel_B272(
float Front_Reflect,
float Edge_Reflect,
float Power,
vec3 Normal,
vec3 Incident,
out float Transmit,
out float Reflect)
{
float d=max(-dot(Incident,Normal),0.0);
Reflect=Front_Reflect+(Edge_Reflect-Front_Reflect)*pow(1.0-d,Power);
Transmit=1.0-Reflect;
}
void Mapped_Environment_B201(
sampler2D Reflected_Environment,
sampler2D Indirect_Environment,
vec3 Dir,
out vec4 Reflected_Color,
out vec4 Indirect_Diffuse)
{
Reflected_Color=texture(Reflected_Environment,vec2(atan(Dir.z,Dir.x)/3.14159*0.5,asin(Dir.y)/3.14159+0.5));
Indirect_Diffuse=texture(Indirect_Environment,vec2(atan(Dir.z,Dir.x)/3.14159*0.5,asin(Dir.y)/3.14159+0.5));
}
vec4 SampleEnv_Bid200(vec3 D,vec4 S,vec4 H,vec4 G,float exponent)
{
float k=pow(abs(D.y),exponent);
vec4 C;
if (D.y>0.0) {
C=mix(H,S,k);
} else {
C=mix(H,G,k); 
}
return C;
}
void Sky_Environment_B200(
vec3 Normal,
vec3 Reflected,
vec4 Sky_Color,
vec4 Horizon_Color,
vec4 Ground_Color,
float Horizon_Power,
out vec4 Reflected_Color,
out vec4 Indirect_Color)
{
Reflected_Color=SampleEnv_Bid200(Reflected,Sky_Color,Horizon_Color,Ground_Color,Horizon_Power);
Indirect_Color=mix(Ground_Color,Sky_Color,Normal.y*0.5+0.5);
}
void Min_Segment_Distance_B215(
vec3 P0,
vec3 P1,
vec3 Q0,
vec3 Q1,
out vec3 NearP,
out vec3 NearQ,
out float Distance)
{
vec3 u=P1-P0;
vec3 v=Q1-Q0;
vec3 w=P0-Q0;
float a=dot(u,u);
float b=dot(u,v);
float c=dot(v,v);
float d=dot(u,w);
float e=dot(v,w);
float D=a*c-b*b;
float sD=D;
float tD=D;
float sc,sN,tc,tN;
if (D<0.00001) {
sN=0.0;
sD=1.0;
tN=e;
tD=c;
} else {
sN=(b*e-c*d);
tN=(a*e-b*d);
if (sN<0.0) {
sN=0.0;
tN=e;
tD=c;
} else if (sN>sD) {
sN=sD;
tN=e+b;
tD=c;
}
}
if (tN<0.0) {
tN=0.0;
if (-d<0.0) {
sN=0.0;
} else if (-d>a) {
sN=sD;
} else {
sN=-d;
sD=a;
}
} else if (tN>tD) {
tN=tD;
if ((-d+b)<0.0) {
sN=0.0;
} else if ((-d+b)>a) {
sN=sD;
} else {
sN=(-d+b);
sD=a;
}
}
sc=abs(sN)<0.000001 ? 0.0 : sN/sD;
tc=abs(tN)<0.000001 ? 0.0 : tN/tD;
NearP=P0+sc*u;
NearQ=Q0+tc*v;
Distance=distance(NearP,NearQ);
}
void To_XYZ_B224(
vec3 Vec3,
out float X,
out float Y,
out float Z)
{
X=Vec3.x;
Y=Vec3.y;
Z=Vec3.z;
}
void Finger_Positions_B214(
vec3 Left_Index_Pos,
vec3 Right_Index_Pos,
vec3 Left_Index_Middle_Pos,
vec3 Right_Index_Middle_Pos,
out vec3 Left_Index,
out vec3 Right_Index,
out vec3 Left_Index_Middle,
out vec3 Right_Index_Middle)
{
Left_Index= (Use_Global_Left_Index ? Global_Left_Index_Tip_Position.xyz : Left_Index_Pos);
Right_Index= (Use_Global_Right_Index ? Global_Right_Index_Tip_Position.xyz : Right_Index_Pos);
Left_Index_Middle= (Use_Global_Left_Index ? Global_Left_Index_Middle_Position.xyz : Left_Index_Middle_Pos);
Right_Index_Middle= (Use_Global_Right_Index ? Global_Right_Index_Middle_Position.xyz : Right_Index_Middle_Pos);
}
void VaryHSV_B258(
vec3 HSV_In,
float Hue_Shift,
float Saturation_Shift,
float Value_Shift,
out vec3 HSV_Out)
{
HSV_Out=vec3(fract(HSV_In.x+Hue_Shift),clamp(HSV_In.y+Saturation_Shift,0.0,1.0),clamp(HSV_In.z+Value_Shift,0.0,1.0));
}
void Remap_Range_B264(
float In_Min,
float In_Max,
float Out_Min,
float Out_Max,
float In,
out float Out)
{
Out=mix(Out_Min,Out_Max,clamp((In-In_Min)/(In_Max-In_Min),0.0,1.0));
}
void To_HSV_B225(
vec4 Color,
out float Hue,
out float Saturation,
out float Value,
out float Alpha,
out vec3 HSV)
{
vec4 K=vec4(0.0,-1.0/3.0,2.0/3.0,-1.0);
vec4 p=Color.g<Color.b ? vec4(Color.bg,K.wz) : vec4(Color.gb,K.xy);
vec4 q=Color.r<p.x ? vec4(p.xyw,Color.r) : vec4(Color.r,p.yzx);
float d=q.x-min(q.w,q.y);
float e=1.0e-10;
Hue=abs(q.z+(q.w-q.y)/(6.0*d+e));
Saturation=d/(q.x+e);
Value=q.x;
Alpha=Color.a;
HSV=vec3(Hue,Saturation,Value);
}
void Code_B260(
float X,
out float Result)
{
Result=(acos(X)/3.14159-0.5)*2.0;
}
void Rim_Light_B282(
vec3 Front,
vec3 Normal,
vec3 Incident,
float Rim_Intensity,
sampler2D Texture,
out vec4 Result)
{
vec3 R=reflect(Incident,Normal);
float RdotF=dot(R,Front);
float RdotL=sqrt(1.0-RdotF*RdotF);
vec2 UV=vec2(R.y*0.5+0.5,0.5);
vec4 Color=texture(Texture,UV);
Result=Color;
}
void main()
{
vec4 Blob_Color_Q180;
#if BLOB_ENABLE
Blob_Fragment_B180(_Blob_Texture_,vExtra2,vExtra3,Blob_Color_Q180);
#else
Blob_Color_Q180=vec4(0,0,0,0);
#endif
vec3 Incident_Q189=normalize(vPosition-cameraPosition);
vec3 Normalized_Q188=normalize(vNormal);
vec3 Normalized_Q221=normalize(vTangent);
vec4 Color_Q233;
#if DECAL_ENABLE
Color_Q233=texture(_Decal_,vUV);
#else
Color_Q233=vec4(0,0,0,0);
#endif
float X_Q240;
float Y_Q240;
float Z_Q240;
float W_Q240;
X_Q240=vExtra1.x;
Y_Q240=vExtra1.y;
Z_Q240=vExtra1.z;
W_Q240=vExtra1.w;
vec4 Linear_Q193;
Linear_Q193.rgb=clamp(_Sky_Color_.rgb*_Sky_Color_.rgb,0.0,1.0);
Linear_Q193.a=_Sky_Color_.a;
vec4 Linear_Q194;
Linear_Q194.rgb=clamp(_Horizon_Color_.rgb*_Horizon_Color_.rgb,0.0,1.0);
Linear_Q194.a=_Horizon_Color_.a;
vec4 Linear_Q195;
Linear_Q195.rgb=clamp(_Ground_Color_.rgb*_Ground_Color_.rgb,0.0,1.0);
Linear_Q195.a=_Ground_Color_.a;
vec3 Left_Index_Q214;
vec3 Right_Index_Q214;
vec3 Left_Index_Middle_Q214;
vec3 Right_Index_Middle_Q214;
Finger_Positions_B214(_Left_Index_Pos_,_Right_Index_Pos_,_Left_Index_Middle_Pos_,_Right_Index_Middle_Pos_,Left_Index_Q214,Right_Index_Q214,Left_Index_Middle_Q214,Right_Index_Middle_Q214);
vec4 Linear_Q196;
Linear_Q196.rgb=clamp(_Albedo_.rgb*_Albedo_.rgb,0.0,1.0);
Linear_Q196.a=_Albedo_.a;
vec3 Normalized_Q257=normalize(vBinormal);
vec3 Incident_Q220=normalize(vPosition-cameraPosition);
vec3 New_Normal_Q229;
Bulge_B229(_Bulge_Enabled_,Normalized_Q188,Normalized_Q221,_Bulge_Height_,vColor,_Bulge_Radius_,vBinormal,New_Normal_Q229);
float Result_Q227;
SSS_B227(vBinormal,New_Normal_Q229,Incident_Q189,Result_Q227);
vec4 Result_Q241;
Scale_Color_B241(Color_Q233,X_Q240,Result_Q241);
float Transmit_Q272;
float Reflect_Q272;
Fast_Fresnel_B272(_Front_Reflect_,_Edge_Reflect_,_Power_,New_Normal_Q229,Incident_Q189,Transmit_Q272,Reflect_Q272);
float Product_Q275=Y_Q240*Y_Q240;
vec3 NearP_Q215;
vec3 NearQ_Q215;
float Distance_Q215;
Min_Segment_Distance_B215(Left_Index_Q214,Left_Index_Middle_Q214,vPosition,cameraPosition,NearP_Q215,NearQ_Q215,Distance_Q215);
vec3 NearP_Q213;
vec3 NearQ_Q213;
float Distance_Q213;
Min_Segment_Distance_B215(Right_Index_Q214,Right_Index_Middle_Q214,vPosition,cameraPosition,NearP_Q213,NearQ_Q213,Distance_Q213);
vec3 Reflected_Q197=reflect(Incident_Q189,New_Normal_Q229);
vec4 Product_Q253=Linear_Q196*vec4(1,1,1,1);
vec4 Result_Q282;
Rim_Light_B282(Normalized_Q257,Normalized_Q188,Incident_Q220,_Rim_Intensity_,_Rim_Texture_,Result_Q282);
float Dot_Q222=dot(Incident_Q220, Normalized_Q221);
float MaxAB_Q273=max(Reflect_Q272,Product_Q275);
float NotInShadow_Q217;
#if OCCLUSION_ENABLED
FingerOcclusion_B217(_Width_,Distance_Q215,_Fuzz_,_Min_Fuzz_,vPosition,vBinormal,NearP_Q215,_Clip_Fade_,NotInShadow_Q217);
#else
NotInShadow_Q217=1.0;
#endif
float NotInShadow_Q218;
#if OCCLUSION_ENABLED
FingerOcclusion_B218(_Width_,Distance_Q213,_Fuzz_,_Min_Fuzz_,vPosition,vBinormal,NearP_Q213,_Clip_Fade_,NotInShadow_Q218);
#else
NotInShadow_Q218=1.0;
#endif
vec4 Reflected_Color_Q201;
vec4 Indirect_Diffuse_Q201;
#if ENV_ENABLE
Mapped_Environment_B201(_Reflection_Map_,_Indirect_Environment_,Reflected_Q197,Reflected_Color_Q201,Indirect_Diffuse_Q201);
#else
Reflected_Color_Q201=vec4(0,0,0,1);
Indirect_Diffuse_Q201=vec4(0,0,0,1);
#endif
vec4 Reflected_Color_Q200;
vec4 Indirect_Color_Q200;
#if SKY_ENABLED
Sky_Environment_B200(New_Normal_Q229,Reflected_Q197,Linear_Q193,Linear_Q194,Linear_Q195,_Horizon_Power_,Reflected_Color_Q200,Indirect_Color_Q200);
#else
Reflected_Color_Q200=vec4(0,0,0,1);
Indirect_Color_Q200=vec4(0,0,0,1);
#endif
float Hue_Q225;
float Saturation_Q225;
float Value_Q225;
float Alpha_Q225;
vec3 HSV_Q225;
To_HSV_B225(Product_Q253,Hue_Q225,Saturation_Q225,Value_Q225,Alpha_Q225,HSV_Q225);
float Hue_Q277;
float Saturation_Q277;
float Value_Q277;
float Alpha_Q277;
vec3 HSV_Q277;
To_HSV_B225(Result_Q282,Hue_Q277,Saturation_Q277,Value_Q277,Alpha_Q277,HSV_Q277);
float Result_Q260;
Code_B260(Dot_Q222,Result_Q260);
float AbsA_Q226=abs(Result_Q260);
float MinAB_Q208=min(NotInShadow_Q217,NotInShadow_Q218);
vec4 Sum_Q198=Reflected_Color_Q201+Reflected_Color_Q200;
vec4 Sum_Q199=Indirect_Diffuse_Q201+Indirect_Color_Q200;
vec3 HSV_Out_Q276;
VaryHSV_B258(HSV_Q277,_Rim_Hue_Shift_,_Rim_Saturation_Shift_,_Rim_Value_Shift_,HSV_Out_Q276);
float Out_Q264;
Remap_Range_B264(-1.0,1.0,0.0,1.0,Result_Q260,Out_Q264);
float Product_Q256;
Product_Q256=AbsA_Q226*_Hue_Shift_;
float X_Q278;
float Y_Q278;
float Z_Q278;
To_XYZ_B224(HSV_Out_Q276,X_Q278,Y_Q278,Z_Q278);
vec2 Vec2_Q262=vec2(Out_Q264,0.5);
vec3 HSV_Out_Q258;
VaryHSV_B258(HSV_Q225,Product_Q256,_Saturation_Shift_,_Value_Shift_,HSV_Out_Q258);
vec4 Color_Q279;
From_HSV_B223(X_Q278,Y_Q278,Z_Q278,0.0,Color_Q279);
vec4 Color_Q261;
#if IRIDESCENCE_ENABLED
Color_Q261=texture(_Iridescence_Texture_,Vec2_Q262);
#else
Color_Q261=vec4(0,0,0,0);
#endif
float X_Q224;
float Y_Q224;
float Z_Q224;
To_XYZ_B224(HSV_Out_Q258,X_Q224,Y_Q224,Z_Q224);
vec4 Result_Q281=_Rim_Intensity_*Color_Q279;
vec4 Result_Q263=_Iridescence_Intensity_*Color_Q261;
vec4 Color_Q223;
From_HSV_B223(X_Q224,Y_Q224,Z_Q224,0.0,Color_Q223);
vec4 Result_Q234=Result_Q241+(1.0-Result_Q241.a)*Color_Q223;
vec4 Result_Q271;
Fragment_Main_B271(_Sun_Intensity_,_Sun_Theta_,_Sun_Phi_,New_Normal_Q229,Result_Q234,MaxAB_Q273,_Shininess_,Incident_Q189,_Horizon_Color_,_Sky_Color_,_Ground_Color_,_Indirect_Diffuse_,_Specular_,_Horizon_Power_,_Reflection_,Sum_Q198,Sum_Q199,_Sharpness_,Result_Q227,_Subsurface_,vec4(0,0,0,0),Result_Q281,Result_Q263,Result_Q271);
vec4 Result_Q209;
Scale_RGB_B209(Result_Q271,MinAB_Q208,Result_Q209);
vec4 sRGB_Q192;
FastLinearTosRGB_B192(Result_Q209,sRGB_Q192);
vec4 Result_Q181=Blob_Color_Q180+(1.0-Blob_Color_Q180.a)*sRGB_Q192;
vec4 Result_Q190=Result_Q181; Result_Q190.a=1.0;
vec4 Out_Color=Result_Q190;
float Clip_Threshold=0.001;
bool To_sRGB=false;
gl_FragColor=Out_Color;
}`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/materials/mrdl/shaders/mrdlSliderThumb.vertex.js":(C,v,n)=>{n.r(v),n.d(v,{mrdlSliderThumbVertexShader:()=>g});var s=n("core/Misc/observable"),r=n.n(s);const p="mrdlSliderThumbVertexShader",f=`uniform mat4 world;
uniform mat4 viewProjection;
uniform vec3 cameraPosition;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
#ifdef TANGENT
attribute vec3 tangent;
#else
const vec3 tangent=vec3(0.);
#endif
uniform float _Radius_;
uniform float _Bevel_Front_;
uniform float _Bevel_Front_Stretch_;
uniform float _Bevel_Back_;
uniform float _Bevel_Back_Stretch_;
uniform float _Radius_Top_Left_;
uniform float _Radius_Top_Right_;
uniform float _Radius_Bottom_Left_;
uniform float _Radius_Bottom_Right_;
uniform bool _Bulge_Enabled_;
uniform float _Bulge_Height_;
uniform float _Bulge_Radius_;
uniform float _Sun_Intensity_;
uniform float _Sun_Theta_;
uniform float _Sun_Phi_;
uniform float _Indirect_Diffuse_;
uniform vec4 _Albedo_;
uniform float _Specular_;
uniform float _Shininess_;
uniform float _Sharpness_;
uniform float _Subsurface_;
uniform vec4 _Left_Color_;
uniform vec4 _Right_Color_;
uniform float _Reflection_;
uniform float _Front_Reflect_;
uniform float _Edge_Reflect_;
uniform float _Power_;
uniform vec4 _Sky_Color_;
uniform vec4 _Horizon_Color_;
uniform vec4 _Ground_Color_;
uniform float _Horizon_Power_;
uniform sampler2D _Reflection_Map_;
uniform sampler2D _Indirect_Environment_;
uniform float _Width_;
uniform float _Fuzz_;
uniform float _Min_Fuzz_;
uniform float _Clip_Fade_;
uniform float _Hue_Shift_;
uniform float _Saturation_Shift_;
uniform float _Value_Shift_;
uniform vec3 _Blob_Position_;
uniform float _Blob_Intensity_;
uniform float _Blob_Near_Size_;
uniform float _Blob_Far_Size_;
uniform float _Blob_Near_Distance_;
uniform float _Blob_Far_Distance_;
uniform float _Blob_Fade_Length_;
uniform float _Blob_Pulse_;
uniform float _Blob_Fade_;
uniform sampler2D _Blob_Texture_;
uniform vec3 _Blob_Position_2_;
uniform float _Blob_Near_Size_2_;
uniform float _Blob_Pulse_2_;
uniform float _Blob_Fade_2_;
uniform vec3 _Left_Index_Pos_;
uniform vec3 _Right_Index_Pos_;
uniform vec3 _Left_Index_Middle_Pos_;
uniform vec3 _Right_Index_Middle_Pos_;
uniform sampler2D _Decal_;
uniform vec2 _Decal_Scale_XY_;
uniform bool _Decal_Front_Only_;
uniform float _Rim_Intensity_;
uniform sampler2D _Rim_Texture_;
uniform float _Rim_Hue_Shift_;
uniform float _Rim_Saturation_Shift_;
uniform float _Rim_Value_Shift_;
uniform float _Iridescence_Intensity_;
uniform sampler2D _Iridescence_Texture_;
uniform bool Use_Global_Left_Index;
uniform bool Use_Global_Right_Index;
uniform vec4 Global_Left_Index_Tip_Position;
uniform vec4 Global_Right_Index_Tip_Position;
uniform vec4 Global_Left_Thumb_Tip_Position;
uniform vec4 Global_Right_Thumb_Tip_Position;
uniform float Global_Left_Index_Tip_Proximity;
uniform float Global_Right_Index_Tip_Proximity;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vColor;
varying vec4 vExtra1;
varying vec4 vExtra2;
varying vec4 vExtra3;
void Object_To_World_Pos_B162(
vec3 Pos_Object,
out vec3 Pos_World)
{
Pos_World=(world*vec4(Pos_Object,1.0)).xyz;
}
void Object_To_World_Normal_B182(
vec3 Nrm_Object,
out vec3 Nrm_World)
{
Nrm_World=(vec4(Nrm_Object,0.0)).xyz;
}
void Blob_Vertex_B173(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
float Blob_Fade_Length,
float Blob_Pulse,
float Blob_Fade,
out vec4 Blob_Info)
{
vec3 blob= (Use_Global_Left_Index ? Global_Left_Index_Tip_Position.xyz : Blob_Position);
vec3 delta=blob-Position;
float dist=dot(Normal,delta);
float lerpValue=clamp((abs(dist)-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);
float fadeValue=1.0-clamp((abs(dist)-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);
float size=Blob_Near_Size+(Blob_Far_Size-Blob_Near_Size)*lerpValue;
vec2 blobXY=vec2(dot(delta,Tangent),dot(delta,Bitangent))/(0.0001+size);
float Fade=fadeValue*Intensity*Blob_Fade;
float Distance=(lerpValue*0.5+0.5)*(1.0-Blob_Pulse);
Blob_Info=vec4(blobXY.x,blobXY.y,Distance,Fade);
}
void Blob_Vertex_B174(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
float Blob_Fade_Length,
float Blob_Pulse,
float Blob_Fade,
out vec4 Blob_Info)
{
vec3 blob= (Use_Global_Right_Index ? Global_Right_Index_Tip_Position.xyz : Blob_Position);
vec3 delta=blob-Position;
float dist=dot(Normal,delta);
float lerpValue=clamp((abs(dist)-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);
float fadeValue=1.0-clamp((abs(dist)-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);
float size=Blob_Near_Size+(Blob_Far_Size-Blob_Near_Size)*lerpValue;
vec2 blobXY=vec2(dot(delta,Tangent),dot(delta,Bitangent))/(0.0001+size);
float Fade=fadeValue*Intensity*Blob_Fade;
float Distance=(lerpValue*0.5+0.5)*(1.0-Blob_Pulse);
Blob_Info=vec4(blobXY.x,blobXY.y,Distance,Fade);
}
void Move_Verts_B280(
float Anisotropy,
vec3 P,
float Radius,
float Bevel,
vec3 Normal_Object,
float ScaleZ,
float Stretch,
out vec3 New_P,
out vec2 New_UV,
out float Radial_Gradient,
out vec3 Radial_Dir,
out vec3 New_Normal)
{
vec2 UV=P.xy*2.0+0.5;
vec2 center=clamp(UV,0.0,1.0);
vec2 delta=UV-center;
float deltad=(length(delta)*2.0);
float f=(Bevel+(Radius-Bevel)*Stretch)/Radius;
float innerd=clamp(deltad*2.0,0.0,1.0);
float outerd=clamp(deltad*2.0-1.0,0.0,1.0);
float bevelAngle=outerd*3.14159*0.5;
float sinb=sin(bevelAngle);
float cosb=cos(bevelAngle);
float beveld=(1.0-f)*innerd+f*sinb;
float br=outerd;
vec2 r2=2.0*vec2(Radius/Anisotropy,Radius);
float dir=P.z<0.0001 ? 1.0 : -1.0;
New_UV=center+r2*((0.5-center)+normalize(delta+vec2(0.0,0.000001))*beveld*0.5);
New_P=vec3(New_UV-0.5,P.z+dir*(1.0-cosb)*Bevel*ScaleZ);
Radial_Gradient=clamp((deltad-0.5)*2.0,0.0,1.0);
Radial_Dir=vec3(delta*r2,0.0);
vec3 beveledNormal=cosb*Normal_Object+sinb*vec3(delta.x,delta.y,0.0);
New_Normal=Normal_Object.z==0.0 ? Normal_Object : beveledNormal;
}
void Object_To_World_Dir_B210(
vec3 Dir_Object,
out vec3 Normal_World,
out vec3 Normal_World_N,
out float Normal_Length)
{
Normal_World=(world*vec4(Dir_Object,0.0)).xyz;
Normal_Length=length(Normal_World);
Normal_World_N=Normal_World/Normal_Length;
}
void To_XYZ_B228(
vec3 Vec3,
out float X,
out float Y,
out float Z)
{
X=Vec3.x;
Y=Vec3.y;
Z=Vec3.z;
}
void Conditional_Float_B243(
bool Which,
float If_True,
float If_False,
out float Result)
{
Result=Which ? If_True : If_False;
}
void Object_To_World_Dir_B178(
vec3 Dir_Object,
out vec3 Binormal_World,
out vec3 Binormal_World_N,
out float Binormal_Length)
{
Binormal_World=(world*vec4(Dir_Object,0.0)).xyz;
Binormal_Length=length(Binormal_World);
Binormal_World_N=Binormal_World/Binormal_Length;
}
void Pick_Radius_B219(
float Radius,
float Radius_Top_Left,
float Radius_Top_Right,
float Radius_Bottom_Left,
float Radius_Bottom_Right,
vec3 Position,
out float Result)
{
bool whichY=Position.y>0.0;
Result=Position.x<0.0 ? (whichY ? Radius_Top_Left : Radius_Bottom_Left) : (whichY ? Radius_Top_Right : Radius_Bottom_Right);
Result*=Radius;
}
void Conditional_Float_B186(
bool Which,
float If_True,
float If_False,
out float Result)
{
Result=Which ? If_True : If_False;
}
void Greater_Than_B187(
float Left,
float Right,
out bool Not_Greater_Than,
out bool Greater_Than)
{
Greater_Than=Left>Right;
Not_Greater_Than=!Greater_Than;
}
void Remap_Range_B255(
float In_Min,
float In_Max,
float Out_Min,
float Out_Max,
float In,
out float Out)
{
Out=mix(Out_Min,Out_Max,clamp((In-In_Min)/(In_Max-In_Min),0.0,1.0));
}
void main()
{
vec2 XY_Q235;
XY_Q235=(uv-vec2(0.5,0.5))*_Decal_Scale_XY_+vec2(0.5,0.5);
vec3 Tangent_World_Q177;
vec3 Tangent_World_N_Q177;
float Tangent_Length_Q177;
Tangent_World_Q177=(world*vec4(vec3(1,0,0),0.0)).xyz;
Tangent_Length_Q177=length(Tangent_World_Q177);
Tangent_World_N_Q177=Tangent_World_Q177/Tangent_Length_Q177;
vec3 Normal_World_Q210;
vec3 Normal_World_N_Q210;
float Normal_Length_Q210;
Object_To_World_Dir_B210(vec3(0,0,1),Normal_World_Q210,Normal_World_N_Q210,Normal_Length_Q210);
float X_Q228;
float Y_Q228;
float Z_Q228;
To_XYZ_B228(position,X_Q228,Y_Q228,Z_Q228);
vec3 Nrm_World_Q176;
Nrm_World_Q176=normalize((world*vec4(normal,0.0)).xyz);
vec3 Binormal_World_Q178;
vec3 Binormal_World_N_Q178;
float Binormal_Length_Q178;
Object_To_World_Dir_B178(vec3(0,1,0),Binormal_World_Q178,Binormal_World_N_Q178,Binormal_Length_Q178);
float Anisotropy_Q179=Tangent_Length_Q177/Binormal_Length_Q178;
float Result_Q219;
Pick_Radius_B219(_Radius_,_Radius_Top_Left_,_Radius_Top_Right_,_Radius_Bottom_Left_,_Radius_Bottom_Right_,position,Result_Q219);
float Anisotropy_Q203=Binormal_Length_Q178/Normal_Length_Q210;
bool Not_Greater_Than_Q187;
bool Greater_Than_Q187;
Greater_Than_B187(Z_Q228,0.0,Not_Greater_Than_Q187,Greater_Than_Q187);
vec4 Linear_Q251;
Linear_Q251.rgb=clamp(_Left_Color_.rgb*_Left_Color_.rgb,0.0,1.0);
Linear_Q251.a=_Left_Color_.a;
vec4 Linear_Q252;
Linear_Q252.rgb=clamp(_Right_Color_.rgb*_Right_Color_.rgb,0.0,1.0);
Linear_Q252.a=_Right_Color_.a;
vec3 Difference_Q211=vec3(0,0,0)-Normal_World_N_Q210;
vec4 Out_Color_Q184=vec4(X_Q228,Y_Q228,Z_Q228,1);
float Result_Q186;
Conditional_Float_B186(Greater_Than_Q187,_Bevel_Back_,_Bevel_Front_,Result_Q186);
float Result_Q244;
Conditional_Float_B186(Greater_Than_Q187,_Bevel_Back_Stretch_,_Bevel_Front_Stretch_,Result_Q244);
vec3 New_P_Q280;
vec2 New_UV_Q280;
float Radial_Gradient_Q280;
vec3 Radial_Dir_Q280;
vec3 New_Normal_Q280;
Move_Verts_B280(Anisotropy_Q179,position,Result_Q219,Result_Q186,normal,Anisotropy_Q203,Result_Q244,New_P_Q280,New_UV_Q280,Radial_Gradient_Q280,Radial_Dir_Q280,New_Normal_Q280);
float X_Q248;
float Y_Q248;
X_Q248=New_UV_Q280.x;
Y_Q248=New_UV_Q280.y;
vec3 Pos_World_Q162;
Object_To_World_Pos_B162(New_P_Q280,Pos_World_Q162);
vec3 Nrm_World_Q182;
Object_To_World_Normal_B182(New_Normal_Q280,Nrm_World_Q182);
vec4 Blob_Info_Q173;
#if BLOB_ENABLE
Blob_Vertex_B173(Pos_World_Q162,Nrm_World_Q176,Tangent_World_N_Q177,Binormal_World_N_Q178,_Blob_Position_,_Blob_Intensity_,_Blob_Near_Size_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_,_Blob_Fade_,Blob_Info_Q173);
#else
Blob_Info_Q173=vec4(0,0,0,0);
#endif
vec4 Blob_Info_Q174;
#if BLOB_ENABLE_2
Blob_Vertex_B174(Pos_World_Q162,Nrm_World_Q176,Tangent_World_N_Q177,Binormal_World_N_Q178,_Blob_Position_2_,_Blob_Intensity_,_Blob_Near_Size_2_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_2_,_Blob_Fade_2_,Blob_Info_Q174);
#else
Blob_Info_Q174=vec4(0,0,0,0);
#endif
float Out_Q255;
Remap_Range_B255(0.0,1.0,0.0,1.0,X_Q248,Out_Q255);
float X_Q236;
float Y_Q236;
float Z_Q236;
To_XYZ_B228(Nrm_World_Q182,X_Q236,Y_Q236,Z_Q236);
vec4 Color_At_T_Q247=mix(Linear_Q251,Linear_Q252,Out_Q255);
float Minus_F_Q237=-Z_Q236;
float R_Q249;
float G_Q249;
float B_Q249;
float A_Q249;
R_Q249=Color_At_T_Q247.r; G_Q249=Color_At_T_Q247.g; B_Q249=Color_At_T_Q247.b; A_Q249=Color_At_T_Q247.a;
float ClampF_Q238=clamp(0.0,Minus_F_Q237,1.0);
float Result_Q243;
Conditional_Float_B243(_Decal_Front_Only_,ClampF_Q238,1.0,Result_Q243);
vec4 Vec4_Q239=vec4(Result_Q243,Radial_Gradient_Q280,G_Q249,B_Q249);
vec3 Position=Pos_World_Q162;
vec3 Normal=Nrm_World_Q182;
vec2 UV=XY_Q235;
vec3 Tangent=Tangent_World_N_Q177;
vec3 Binormal=Difference_Q211;
vec4 Color=Out_Color_Q184;
vec4 Extra1=Vec4_Q239;
vec4 Extra2=Blob_Info_Q173;
vec4 Extra3=Blob_Info_Q174;
gl_Position=viewProjection*vec4(Position,1);
vPosition=Position;
vNormal=Normal;
vUV=UV;
vTangent=Tangent;
vBinormal=Binormal;
vColor=Color;
vExtra1=Extra1;
vExtra2=Extra2;
vExtra3=Extra3;
}`;s.ShaderStore.ShadersStore[p]=f;const g={name:p,shader:f}},"../../../dev/gui/dist/3D/vector3WithInfo.js":(C,v,n)=>{n.r(v),n.d(v,{Vector3WithInfo:()=>p});var s=n("core/Misc/observable"),r=n.n(s);class p extends s.Vector3{constructor(g,d=0){super(g.x,g.y,g.z);this.buttonIndex=d}}},"../../../dev/gui/dist/index.js":(C,v,n)=>{n.r(v),n.d(v,{AbstractButton3D:()=>r.AbstractButton3D,AdvancedDynamicTexture:()=>s.AdvancedDynamicTexture,AdvancedDynamicTextureInstrumentation:()=>s.AdvancedDynamicTextureInstrumentation,BaseGradient:()=>s.BaseGradient,BaseSlider:()=>s.BaseSlider,Button:()=>s.Button,Button3D:()=>r.Button3D,Checkbox:()=>s.Checkbox,CheckboxGroup:()=>s.CheckboxGroup,ColorPicker:()=>s.ColorPicker,Container:()=>s.Container,Container3D:()=>r.Container3D,Control:()=>s.Control,Control3D:()=>r.Control3D,CornerHandle:()=>r.CornerHandle,CylinderPanel:()=>r.CylinderPanel,DisplayGrid:()=>s.DisplayGrid,Ellipse:()=>s.Ellipse,FluentBackplateMaterial:()=>r.FluentBackplateMaterial,FluentButtonMaterial:()=>r.FluentButtonMaterial,FluentMaterial:()=>r.FluentMaterial,FluentMaterialDefines:()=>r.FluentMaterialDefines,FocusableButton:()=>s.FocusableButton,GUI3DManager:()=>r.GUI3DManager,GizmoHandle:()=>r.GizmoHandle,Grid:()=>s.Grid,HandMenu:()=>r.HandMenu,HandleMaterial:()=>r.HandleMaterial,HandleState:()=>r.HandleState,HolographicBackplate:()=>r.HolographicBackplate,HolographicButton:()=>r.HolographicButton,HolographicSlate:()=>r.HolographicSlate,Image:()=>s.Image,ImageBasedSlider:()=>s.ImageBasedSlider,ImageScrollBar:()=>s.ImageScrollBar,InputPassword:()=>s.InputPassword,InputText:()=>s.InputText,InputTextArea:()=>s.InputTextArea,KeyPropertySet:()=>s.KeyPropertySet,Line:()=>s.Line,LinearGradient:()=>s.LinearGradient,MRDLBackplateMaterial:()=>r.MRDLBackplateMaterial,MRDLSliderBarMaterial:()=>r.MRDLSliderBarMaterial,MRDLSliderThumbMaterial:()=>r.MRDLSliderThumbMaterial,MathTools:()=>s.MathTools,Matrix2D:()=>s.Matrix2D,Measure:()=>s.Measure,MeshButton3D:()=>r.MeshButton3D,MultiLine:()=>s.MultiLine,MultiLinePoint:()=>s.MultiLinePoint,NearMenu:()=>r.NearMenu,PlanePanel:()=>r.PlanePanel,RadialGradient:()=>s.RadialGradient,RadioButton:()=>s.RadioButton,RadioGroup:()=>s.RadioGroup,Rectangle:()=>s.Rectangle,ScatterPanel:()=>r.ScatterPanel,ScrollBar:()=>s.ScrollBar,ScrollViewer:()=>s.ScrollViewer,SelectionPanel:()=>s.SelectionPanel,SelectorGroup:()=>s.SelectorGroup,SideHandle:()=>r.SideHandle,SlateGizmo:()=>r.SlateGizmo,Slider:()=>s.Slider,Slider3D:()=>r.Slider3D,SliderGroup:()=>s.SliderGroup,SpherePanel:()=>r.SpherePanel,StackPanel:()=>s.StackPanel,StackPanel3D:()=>r.StackPanel3D,Style:()=>s.Style,TextBlock:()=>s.TextBlock,TextWrapper:()=>s.TextWrapper,TextWrapping:()=>s.TextWrapping,ToggleButton:()=>s.ToggleButton,TouchButton3D:()=>r.TouchButton3D,TouchHolographicButton:()=>r.TouchHolographicButton,TouchHolographicButtonV3:()=>r.TouchHolographicButtonV3,TouchHolographicMenu:()=>r.TouchHolographicMenu,TouchMeshButton3D:()=>r.TouchMeshButton3D,ValueAndUnit:()=>s.ValueAndUnit,Vector2WithInfo:()=>s.Vector2WithInfo,Vector3WithInfo:()=>r.Vector3WithInfo,VirtualKeyboard:()=>s.VirtualKeyboard,VolumeBasedPanel:()=>r.VolumeBasedPanel,XmlLoader:()=>s.XmlLoader,name:()=>s.name});var s=n("../../../dev/gui/dist/2D/index.js"),r=n("../../../dev/gui/dist/3D/index.js")},"../../../lts/gui/dist/legacy/legacy.js":(C,v,n)=>{n.r(v),n.d(v,{AbstractButton3D:()=>s.AbstractButton3D,AdvancedDynamicTexture:()=>s.AdvancedDynamicTexture,AdvancedDynamicTextureInstrumentation:()=>s.AdvancedDynamicTextureInstrumentation,BaseGradient:()=>s.BaseGradient,BaseSlider:()=>s.BaseSlider,Button:()=>s.Button,Button3D:()=>s.Button3D,Checkbox:()=>s.Checkbox,CheckboxGroup:()=>s.CheckboxGroup,ColorPicker:()=>s.ColorPicker,Container:()=>s.Container,Container3D:()=>s.Container3D,Control:()=>s.Control,Control3D:()=>s.Control3D,CornerHandle:()=>s.CornerHandle,CylinderPanel:()=>s.CylinderPanel,DisplayGrid:()=>s.DisplayGrid,Ellipse:()=>s.Ellipse,FluentBackplateMaterial:()=>s.FluentBackplateMaterial,FluentButtonMaterial:()=>s.FluentButtonMaterial,FluentMaterial:()=>s.FluentMaterial,FluentMaterialDefines:()=>s.FluentMaterialDefines,FocusableButton:()=>s.FocusableButton,GUI3DManager:()=>s.GUI3DManager,GizmoHandle:()=>s.GizmoHandle,Grid:()=>s.Grid,HandMenu:()=>s.HandMenu,HandleMaterial:()=>s.HandleMaterial,HandleState:()=>s.HandleState,HolographicBackplate:()=>s.HolographicBackplate,HolographicButton:()=>s.HolographicButton,HolographicSlate:()=>s.HolographicSlate,Image:()=>s.Image,ImageBasedSlider:()=>s.ImageBasedSlider,ImageScrollBar:()=>s.ImageScrollBar,InputPassword:()=>s.InputPassword,InputText:()=>s.InputText,InputTextArea:()=>s.InputTextArea,KeyPropertySet:()=>s.KeyPropertySet,Line:()=>s.Line,LinearGradient:()=>s.LinearGradient,MRDLBackplateMaterial:()=>s.MRDLBackplateMaterial,MRDLSliderBarMaterial:()=>s.MRDLSliderBarMaterial,MRDLSliderThumbMaterial:()=>s.MRDLSliderThumbMaterial,MathTools:()=>s.MathTools,Matrix2D:()=>s.Matrix2D,Measure:()=>s.Measure,MeshButton3D:()=>s.MeshButton3D,MultiLine:()=>s.MultiLine,MultiLinePoint:()=>s.MultiLinePoint,NearMenu:()=>s.NearMenu,PlanePanel:()=>s.PlanePanel,RadialGradient:()=>s.RadialGradient,RadioButton:()=>s.RadioButton,RadioGroup:()=>s.RadioGroup,Rectangle:()=>s.Rectangle,ScatterPanel:()=>s.ScatterPanel,ScrollBar:()=>s.ScrollBar,ScrollViewer:()=>s.ScrollViewer,SelectionPanel:()=>s.SelectionPanel,SelectorGroup:()=>s.SelectorGroup,SideHandle:()=>s.SideHandle,SlateGizmo:()=>s.SlateGizmo,Slider:()=>s.Slider,Slider3D:()=>s.Slider3D,SliderGroup:()=>s.SliderGroup,SpherePanel:()=>s.SpherePanel,StackPanel:()=>s.StackPanel,StackPanel3D:()=>s.StackPanel3D,Style:()=>s.Style,TextBlock:()=>s.TextBlock,TextWrapper:()=>s.TextWrapper,TextWrapping:()=>s.TextWrapping,ToggleButton:()=>s.ToggleButton,TouchButton3D:()=>s.TouchButton3D,TouchHolographicButton:()=>s.TouchHolographicButton,TouchHolographicButtonV3:()=>s.TouchHolographicButtonV3,TouchHolographicMenu:()=>s.TouchHolographicMenu,TouchMeshButton3D:()=>s.TouchMeshButton3D,ValueAndUnit:()=>s.ValueAndUnit,Vector2WithInfo:()=>s.Vector2WithInfo,Vector3WithInfo:()=>s.Vector3WithInfo,VirtualKeyboard:()=>s.VirtualKeyboard,VolumeBasedPanel:()=>s.VolumeBasedPanel,XmlLoader:()=>s.XmlLoader,name:()=>s.name});var s=n("../../../dev/gui/dist/index.js"),r=typeof n.g!="undefined"?n.g:typeof window!="undefined"?window:void 0;typeof r!="undefined"&&(r.BABYLON=r.BABYLON||{},r.BABYLON.GUI||(r.BABYLON.GUI=s))},"core/Misc/observable":C=>{C.exports=kt},"../../../../node_modules/tslib/tslib.es6.mjs":(C,v,n)=>{n.r(v),n.d(v,{__assign:()=>p,__asyncDelegator:()=>F,__asyncGenerator:()=>x,__asyncValues:()=>Q,__await:()=>I,__awaiter:()=>a,__classPrivateFieldGet:()=>rt,__classPrivateFieldIn:()=>gt,__classPrivateFieldSet:()=>st,__createBinding:()=>c,__decorate:()=>g,__esDecorate:()=>e,__exportStar:()=>h,__extends:()=>r,__generator:()=>l,__importDefault:()=>lt,__importStar:()=>Ct,__makeTemplateObject:()=>it,__metadata:()=>o,__param:()=>d,__propKey:()=>t,__read:()=>m,__rest:()=>f,__runInitializers:()=>_,__setFunctionName:()=>i,__spread:()=>b,__spreadArray:()=>B,__spreadArrays:()=>P,__values:()=>u,default:()=>It});var s=function(E,M){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(T,D){T.__proto__=D}||function(T,D){for(var O in D)Object.prototype.hasOwnProperty.call(D,O)&&(T[O]=D[O])},s(E,M)};function r(E,M){if(typeof M!="function"&&M!==null)throw new TypeError("Class extends value "+String(M)+" is not a constructor or null");s(E,M);function T(){this.constructor=E}E.prototype=M===null?Object.create(M):(T.prototype=M.prototype,new T)}var p=function(){return p=Object.assign||function(M){for(var T,D=1,O=arguments.length;D<O;D++){T=arguments[D];for(var y in T)Object.prototype.hasOwnProperty.call(T,y)&&(M[y]=T[y])}return M},p.apply(this,arguments)};function f(E,M){var T={};for(var D in E)Object.prototype.hasOwnProperty.call(E,D)&&M.indexOf(D)<0&&(T[D]=E[D]);if(E!=null&&typeof Object.getOwnPropertySymbols=="function")for(var O=0,D=Object.getOwnPropertySymbols(E);O<D.length;O++)M.indexOf(D[O])<0&&Object.prototype.propertyIsEnumerable.call(E,D[O])&&(T[D[O]]=E[D[O]]);return T}function g(E,M,T,D){var O=arguments.length,y=O<3?M:D===null?D=Object.getOwnPropertyDescriptor(M,T):D,L;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")y=Reflect.decorate(E,M,T,D);else for(var z=E.length-1;z>=0;z--)(L=E[z])&&(y=(O<3?L(y):O>3?L(M,T,y):L(M,T))||y);return O>3&&y&&Object.defineProperty(M,T,y),y}function d(E,M){return function(T,D){M(T,D,E)}}function e(E,M,T,D,O,y){function L(Pt){if(Pt!==void 0&&typeof Pt!="function")throw new TypeError("Function expected");return Pt}for(var z=D.kind,W=z==="getter"?"get":z==="setter"?"set":"value",w=!M&&E?D.static?E:E.prototype:null,A=M||(w?Object.getOwnPropertyDescriptor(w,D.name):{}),k,U=!1,_t=T.length-1;_t>=0;_t--){var ht={};for(var J in D)ht[J]=J==="access"?{}:D[J];for(var J in D.access)ht.access[J]=D.access[J];ht.addInitializer=function(Pt){if(U)throw new TypeError("Cannot add initializers after decoration has completed");y.push(L(Pt||null))};var H=(0,T[_t])(z==="accessor"?{get:A.get,set:A.set}:A[W],ht);if(z==="accessor"){if(H===void 0)continue;if(H===null||typeof H!="object")throw new TypeError("Object expected");(k=L(H.get))&&(A.get=k),(k=L(H.set))&&(A.set=k),(k=L(H.init))&&O.unshift(k)}else(k=L(H))&&(z==="field"?O.unshift(k):A[W]=k)}w&&Object.defineProperty(w,D.name,A),U=!0}function _(E,M,T){for(var D=arguments.length>2,O=0;O<M.length;O++)T=D?M[O].call(E,T):M[O].call(E);return D?T:void 0}function t(E){return typeof E=="symbol"?E:"".concat(E)}function i(E,M,T){return typeof M=="symbol"&&(M=M.description?"[".concat(M.description,"]"):""),Object.defineProperty(E,"name",{configurable:!0,value:T?"".concat(T," ",M):M})}function o(E,M){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(E,M)}function a(E,M,T,D){function O(y){return y instanceof T?y:new T(function(L){L(y)})}return new(T||(T=Promise))(function(y,L){function z(A){try{w(D.next(A))}catch(k){L(k)}}function W(A){try{w(D.throw(A))}catch(k){L(k)}}function w(A){A.done?y(A.value):O(A.value).then(z,W)}w((D=D.apply(E,M||[])).next())})}function l(E,M){var T={label:0,sent:function(){if(y[0]&1)throw y[1];return y[1]},trys:[],ops:[]},D,O,y,L;return L={next:z(0),throw:z(1),return:z(2)},typeof Symbol=="function"&&(L[Symbol.iterator]=function(){return this}),L;function z(w){return function(A){return W([w,A])}}function W(w){if(D)throw new TypeError("Generator is already executing.");for(;L&&(L=0,w[0]&&(T=0)),T;)try{if(D=1,O&&(y=w[0]&2?O.return:w[0]?O.throw||((y=O.return)&&y.call(O),0):O.next)&&!(y=y.call(O,w[1])).done)return y;switch(O=0,y&&(w=[w[0]&2,y.value]),w[0]){case 0:case 1:y=w;break;case 4:return T.label++,{value:w[1],done:!1};case 5:T.label++,O=w[1],w=[0];continue;case 7:w=T.ops.pop(),T.trys.pop();continue;default:if(y=T.trys,!(y=y.length>0&&y[y.length-1])&&(w[0]===6||w[0]===2)){T=0;continue}if(w[0]===3&&(!y||w[1]>y[0]&&w[1]<y[3])){T.label=w[1];break}if(w[0]===6&&T.label<y[1]){T.label=y[1],y=w;break}if(y&&T.label<y[2]){T.label=y[2],T.ops.push(w);break}y[2]&&T.ops.pop(),T.trys.pop();continue}w=M.call(E,T)}catch(A){w=[6,A],O=0}finally{D=y=0}if(w[0]&5)throw w[1];return{value:w[0]?w[1]:void 0,done:!0}}}var c=Object.create?function(E,M,T,D){D===void 0&&(D=T);var O=Object.getOwnPropertyDescriptor(M,T);(!O||("get"in O?!M.__esModule:O.writable||O.configurable))&&(O={enumerable:!0,get:function(){return M[T]}}),Object.defineProperty(E,D,O)}:function(E,M,T,D){D===void 0&&(D=T),E[D]=M[T]};function h(E,M){for(var T in E)T!=="default"&&!Object.prototype.hasOwnProperty.call(M,T)&&c(M,E,T)}function u(E){var M=typeof Symbol=="function"&&Symbol.iterator,T=M&&E[M],D=0;if(T)return T.call(E);if(E&&typeof E.length=="number")return{next:function(){return E&&D>=E.length&&(E=void 0),{value:E&&E[D++],done:!E}}};throw new TypeError(M?"Object is not iterable.":"Symbol.iterator is not defined.")}function m(E,M){var T=typeof Symbol=="function"&&E[Symbol.iterator];if(!T)return E;var D=T.call(E),O,y=[],L;try{for(;(M===void 0||M-- >0)&&!(O=D.next()).done;)y.push(O.value)}catch(z){L={error:z}}finally{try{O&&!O.done&&(T=D.return)&&T.call(D)}finally{if(L)throw L.error}}return y}function b(){for(var E=[],M=0;M<arguments.length;M++)E=E.concat(m(arguments[M]));return E}function P(){for(var E=0,M=0,T=arguments.length;M<T;M++)E+=arguments[M].length;for(var D=Array(E),O=0,M=0;M<T;M++)for(var y=arguments[M],L=0,z=y.length;L<z;L++,O++)D[O]=y[L];return D}function B(E,M,T){if(T||arguments.length===2)for(var D=0,O=M.length,y;D<O;D++)(y||!(D in M))&&(y||(y=Array.prototype.slice.call(M,0,D)),y[D]=M[D]);return E.concat(y||Array.prototype.slice.call(M))}function I(E){return this instanceof I?(this.v=E,this):new I(E)}function x(E,M,T){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var D=T.apply(E,M||[]),O,y=[];return O={},L("next"),L("throw"),L("return"),O[Symbol.asyncIterator]=function(){return this},O;function L(U){D[U]&&(O[U]=function(_t){return new Promise(function(ht,J){y.push([U,_t,ht,J])>1||z(U,_t)})})}function z(U,_t){try{W(D[U](_t))}catch(ht){k(y[0][3],ht)}}function W(U){U.value instanceof I?Promise.resolve(U.value.v).then(w,A):k(y[0][2],U)}function w(U){z("next",U)}function A(U){z("throw",U)}function k(U,_t){U(_t),y.shift(),y.length&&z(y[0][0],y[0][1])}}function F(E){var M,T;return M={},D("next"),D("throw",function(O){throw O}),D("return"),M[Symbol.iterator]=function(){return this},M;function D(O,y){M[O]=E[O]?function(L){return(T=!T)?{value:I(E[O](L)),done:!1}:y?y(L):L}:y}}function Q(E){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var M=E[Symbol.asyncIterator],T;return M?M.call(E):(E=typeof u=="function"?u(E):E[Symbol.iterator](),T={},D("next"),D("throw"),D("return"),T[Symbol.asyncIterator]=function(){return this},T);function D(y){T[y]=E[y]&&function(L){return new Promise(function(z,W){L=E[y](L),O(z,W,L.done,L.value)})}}function O(y,L,z,W){Promise.resolve(W).then(function(w){y({value:w,done:z})},L)}}function it(E,M){return Object.defineProperty?Object.defineProperty(E,"raw",{value:M}):E.raw=M,E}var bt=Object.create?function(E,M){Object.defineProperty(E,"default",{enumerable:!0,value:M})}:function(E,M){E.default=M};function Ct(E){if(E&&E.__esModule)return E;var M={};if(E!=null)for(var T in E)T!=="default"&&Object.prototype.hasOwnProperty.call(E,T)&&c(M,E,T);return bt(M,E),M}function lt(E){return E&&E.__esModule?E:{default:E}}function rt(E,M,T,D){if(T==="a"&&!D)throw new TypeError("Private accessor was defined without a getter");if(typeof M=="function"?E!==M||!D:!M.has(E))throw new TypeError("Cannot read private member from an object whose class did not declare it");return T==="m"?D:T==="a"?D.call(E):D?D.value:M.get(E)}function st(E,M,T,D,O){if(D==="m")throw new TypeError("Private method is not writable");if(D==="a"&&!O)throw new TypeError("Private accessor was defined without a setter");if(typeof M=="function"?E!==M||!O:!M.has(E))throw new TypeError("Cannot write private member to an object whose class did not declare it");return D==="a"?O.call(E,T):O?O.value=T:M.set(E,T),T}function gt(E,M){if(M===null||typeof M!="object"&&typeof M!="function")throw new TypeError("Cannot use 'in' operator on non-object");return typeof E=="function"?M===E:E.has(M)}const It={__extends:r,__assign:p,__rest:f,__decorate:g,__param:d,__metadata:o,__awaiter:a,__generator:l,__createBinding:c,__exportStar:h,__values:u,__read:m,__spread:b,__spreadArrays:P,__spreadArray:B,__await:I,__asyncGenerator:x,__asyncDelegator:F,__asyncValues:Q,__makeTemplateObject:it,__importStar:Ct,__importDefault:lt,__classPrivateFieldGet:rt,__classPrivateFieldSet:st,__classPrivateFieldIn:gt}}},ct={};function ot(C){var v=ct[C];if(v!==void 0)return v.exports;var n=ct[C]={exports:{}};return Mt[C](n,n.exports,ot),n.exports}(()=>{ot.n=C=>{var v=C&&C.__esModule?()=>C.default:()=>C;return ot.d(v,{a:v}),v}})(),(()=>{ot.d=(C,v)=>{for(var n in v)ot.o(v,n)&&!ot.o(C,n)&&Object.defineProperty(C,n,{enumerable:!0,get:v[n]})}})(),(()=>{ot.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch(C){if(typeof window=="object")return window}}()})(),(()=>{ot.o=(C,v)=>Object.prototype.hasOwnProperty.call(C,v)})(),(()=>{ot.r=C=>{typeof Symbol!="undefined"&&Symbol.toStringTag&&Object.defineProperty(C,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(C,"__esModule",{value:!0})}})();var Et={};return(()=>{/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/ot.r(Et),ot.d(Et,{default:()=>v,gui:()=>C});var C=ot("../../../lts/gui/dist/legacy/legacy.js");const v=C})(),Et=Et.default,Et})());
