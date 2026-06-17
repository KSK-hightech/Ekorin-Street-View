// 地図座標
const mapLocations = {
    "entrance": { top: '80%', left: '20%' },
    "garden_path": { top: '50%', left: '40%' },
    "city_view": { top: '30%', left: '70%' },
    "sunset_road": { top: '10%', left: '85%' }
};

// シーン接続
const sceneLinks = {
    "entrance": [ { yaw: 0, target: "garden_path" } ],
    "garden_path": [ { yaw: 180, target: "entrance" }, { yaw: 0, target: "city_view" } ],
    "city_view": [ { yaw: 180, target: "garden_path" }, { yaw: 0, target: "sunset_road" } ],
    "sunset_road": [ { yaw: 180, target: "city_view" } ]
};

// viewerの初期化
const viewer = pannellum.viewer('panorama', {
    "default": {
        "firstScene": "entrance",
        "autoLoad": true,
        "sceneFadeDuration": 1000,
        "hfov": 100,
        "minHfov": 50,
        "maxHfov": 120,
        "orientationOnByDefault": false,
    },
    "scenes": {
        "entrance": { "title": "銀河庭園 入口", "type": "equirectangular", "panorama": "image/indoor2.jpg" },
        "garden_path": { "title": "庭園の散策路", "type": "equirectangular", "panorama": "image/GPTDemo.png" },
        "city_view": { "title": "街のパノラマ", "type": "equirectangular", "panorama": "image/demo3.jpg" },
        "sunset_road": { "title": "夕暮れの道", "type": "equirectangular", "panorama": "image/sample4.jpg" }
    }
});

// シーン変更関数（これがないと地図クリックでエラーになります）
function changeScene(id) {
    viewer.loadScene(id);
}

// 現在地更新
viewer.on('load', function () {
    const sceneId = viewer.getScene();
    const pos = mapLocations[sceneId];
    if (pos) {
        const dot = document.getElementById('current-pos');
        dot.style.top = pos.top;
        dot.style.left = pos.left;
    }
});

// 右クリック移動
document.getElementById("panorama").addEventListener("contextmenu", function (e) {
    e.preventDefault();
    let currentYaw = viewer.getYaw();
    let currentScene = viewer.getScene();
    let links = sceneLinks[currentScene];
    if (!links) return;

    let closest = null;
    let smallestDiff = 9999;

    links.forEach(link => {
        let diff = Math.abs(currentYaw - link.yaw);
        if (diff > 180) { diff = 360 - diff; }
        if (diff < smallestDiff) {
            smallestDiff = diff;
            closest = link;
        }
    });

    if (closest && smallestDiff < 60) {
        viewer.loadScene(closest.target);
    }
});

// 自作カーソル要素の取得
const cursor = document.getElementById("move-cursor");
const panoramaArea = document.getElementById("panorama");

// マウス移動時の処理
document.addEventListener("mousemove", (e) => {
    if (!cursor) return;
    
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    let yaw = viewer.getYaw();
    cursor.style.transform = `translate(-50%, -50%) rotate(${yaw - 90}deg)`;
});

// パノラマ画像の上にマウスが入った時の処理
if (panoramaArea) {
    panoramaArea.addEventListener("mouseenter", () => {
        if (cursor) {
            cursor.classList.add("active");
            cursor.style.display = "block";
        }
    });

    panoramaArea.addEventListener("mouseleave", () => {
        if (cursor) {
            cursor.classList.remove("active");
            cursor.style.display = "none";
        }
    });
}

// ドラッグ開始（クリック中）
document.addEventListener("mousedown", (e) => {
    if (e.target.closest("#map-container")) return;
    if (cursor) cursor.classList.add("dragging");
});

// ドラッグ終了
document.addEventListener("mouseup", () => {
    if (cursor) cursor.classList.remove("dragging");
});

// ミニマップ方向更新
function updateMapRotation() {
    const dot = document.getElementById("current-pos");
    if (dot) {
        let yaw = viewer.getYaw();
        dot.style.transform = `translate(-50%, -50%) rotate(${yaw}deg)`;
    }
    requestAnimationFrame(updateMapRotation);
}

// 開始
updateMapRotation();