<template>
<div class="wrapper">
    <div class="content">
        <div class="main-crop">
            <vueCropper ref="cropper" :img="options.img " :outputSize="options.size" :outputType="options.outputType" :info="options.info" :canScale="options.canScale" :autoCrop="options.autoCrop" :autoCropWidth="options.autoCropWidth" :autoCropHeight="options.autoCropHeight" :fixed="options.fixed" :fixedNumber="options.fixedNumber" :canMove="options.canMove" :canMoveBox="options.canMoveBox" :fixedBox="options.fixedBox"></vueCropper>
        </div>
        <div class="btn-box">
            <label class="btn" for="upload2">拍照或选择</label>
            <input type="file" id="upload2" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event,2)">
            <button @click="finishCropper()" class="btn">裁剪</button>
        </div>
    </div>

    <div class="model" v-show="model" @click="model = false">
        <div class="model-show">
            <img :src="modelSrc" alt="" />
        </div>
    </div>
</div>
</template>

 

<script>
export default {
    data: function () {
        return {
            model: false,
            modelSrc: "",
            options: {
                //img的路径
                img: "https://fengyuanchen.github.io/cropper/images/picture.jpg",
                info: true,
                size: 1,
                canScale: true,
                autoCrop: true,
                canMove: true, //可否拖动图片
                canMoveBox: false, //可否拖动截图框
                autoCropWidth: 260,
                autoCropHeight: 300,
                fixedBox: true, //是否禁止截图框大小
                fixed: true, //固定宽高比
                outputType: "jpeg",
                infoTrue: true //真实的输出宽高
            }
        };
    },
    methods: {
        /**
         * 裁剪
         */
        finishCropper() {
            this.$refs.cropper.getCropData(data => {
                this.modelSrc = data;
                this.model = true;
                //裁剪后的图片显示
                console.log(this.modelSrc);
            });
        },

        /**
         * 上传
         */
        uploadImg(e, num) {
            //上传图片
            this.options.img = "";
            var file = e.target.files[0];
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
                return false;
            }
            var reader = new FileReader();
            reader.onload = e => {
                let data;
                data = e.target.result;
                if (typeof e.target.result === "object") {
                    // 把Array Buffer转化为blob 如果是base64不需要
                    data = window.URL.createObjectURL(new Blob([e.target.result]));
                } else {
                    data = e.target.result;
                }
                if (num === 1) {
                    this.option.img = data;
                } else if (num === 2) {
                    this.options.img = data;
                }
            };
            // 转化为base64
            // reader.readAsDataURL(file)
            // 转化为blobcs
            reader.readAsArrayBuffer(file);
        }
    }
};
</script>
 

<style>
* {
    margin: 0;
    padding: 0;
}

.btn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 20px 10px 0px 0px;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff;
    transition: all 0.2s ease;
    text-decoration: none;
    user-select: none;
}

.main-crop {
    height: 500px;
}

.model {
    position: fixed;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
}

.model-show {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}

.model img {
    display: block;
    margin: auto;
    max-width: 80%;
    user-select: none;
    background-position: 0px 0px, 10px 10px;
    background-size: 20px 20px;
    background-image: linear-gradient(45deg,
        #eee 25%,
        transparent 25%,
        transparent 75%,
        #eee 75%,
        #eee 100%),
        linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
}

@keyframes slide {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: -100% 0;
    }
}
</style>
