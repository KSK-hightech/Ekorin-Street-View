// 地図座標
const mapLocations = {

    "entrance": {
        top: '80%',
        left: '20%'
    },

    "garden_path": {
        top: '50%',
        left: '40%'
    },

    "city_view": {
        top: '30%',
        left: '70%'
    },

    "sunset_road": {
        top: '10%',
        left: '85%'
    }
};

// シーン接続
const sceneLinks = {

    "entrance": [
        {
            yaw: 0,
            target: "garden_path"
        }
    ],

    "garden_path": [
        {
            yaw: 180,
            target: "entrance"
        },

        {
            yaw: 0,
            target: "city_view"
        }
    ],

    "city_view": [
        {
            yaw: 180,
            target: "garden_path"
        },

        {
            yaw: 0,
            target: "sunset_road"
        }
    ],

    "sunset_road": [
        {
            yaw: 180,
            target: "city_view"
        }
    ]
};

// viewer
const viewer = pannellum.viewer('panorama', {

    "default": {

        "firstScene": "entrance",

        "autoLoad": true,

        "sceneFadeDuration": 1000,

        "hfov": 100,

        "minHfov": 50,

        "maxHfov": 120
    },

    "scenes": {

        "entrance": {

            "title": "銀河庭園 入口",

            "type": "equirectangular",

            "panorama": "image/indoor2.jpg"
        },

        "garden_path": {

            "title": "庭園の散策路",

            "type": "equirectangular",

            "panorama": "image/GPTDemo.png"
        },

        "city_view": {

            "title": "街のパノラマ",

            "type": "equirectangular",

            "panorama": "image/demo3.jpg"
        },

        "sunset_road": {

            "title": "夕暮れの道",

            "type": "equirectangular",

            "panorama": "image/sample4.jpg"
        }
    }
});

// シーン変更
function changeScene(id) {

    viewer.loadScene(id);
}

// 現在地更新
viewer.on('load', function () {

    const sceneId = viewer.getScene();

    const pos = mapLocations[sceneId];

    if (pos) {

        const dot =
        document.getElementById('current-pos');

        dot.style.top = pos.top;

        dot.style.left = pos.left;
    }
});

// 右クリック移動
document.getElementById("panorama")
.addEventListener("contextmenu", function (e) {

    e.preventDefault();

    // 現在向き
    let currentYaw = viewer.getYaw();

    // 現在シーン
    let currentScene = viewer.getScene();

    // 接続先
    let links = sceneLinks[currentScene];

    if (!links) return;

    let closest = null;

    let smallestDiff = 9999;

    // 一番近い方向
    links.forEach(link => {

        let diff =
        Math.abs(currentYaw - link.yaw);

        if (diff > 180) {

            diff = 360 - diff;
        }

        if (diff < smallestDiff) {

            smallestDiff = diff;

            closest = link;
        }
    });

    // 60度以内なら移動
    if (closest && smallestDiff < 60) {

        viewer.loadScene(closest.target);
    }
});

// カーソル
const cursor =
document.getElementById("move-cursor");

// マウス移動
document.addEventListener("mousemove", (e) => {

    cursor.style.left =
    e.clientX + "px";

    cursor.style.top =
    e.clientY + "px";

    // 向き
    let yaw = viewer.getYaw();

    // 回転
    cursor.style.transform =
    `translate(-50%, -50%)
    rotate(${yaw}deg)`;
});

// ドラッグ開始
document.addEventListener("mousedown", () => {

    cursor.classList.add("dragging");
});

// ドラッグ終了
document.addEventListener("mouseup", () => {

    cursor.classList.remove("dragging");
});

// panorama上
const panorama =
document.getElementById("panorama");

panorama.addEventListener("mouseenter", () => {

    cursor.classList.add("active");
});

panorama.addEventListener("mouseleave", () => {

    cursor.classList.remove("active");
});

// ミニマップ方向更新
function updateMapRotation() {

    const dot =
    document.getElementById("current-pos");

    // 向いてる方向
    let yaw = viewer.getYaw();

    // 回転
    dot.style.transform =
    `translate(-50%, -50%)
    rotate(${yaw}deg)`;

    requestAnimationFrame(updateMapRotation);
}

// 開始
updateMapRotation();