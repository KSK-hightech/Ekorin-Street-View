const tourType = document.body.dataset.tour || "village";

const villageTour = {
    default: {
        firstScene: "spot_1",
        autoLoad: true,
        sceneFadeDuration: 1000,
        hfov: 100,
        minHfov: 50,
        maxHfov: 120
    },

   scenes: {
        spot_1: { title: "地点 1", type: "equirectangular", panorama: "image/outside/7.jpg" },
        spot_2: { title: "地点 2", type: "equirectangular", panorama: "image/outside/12.jpg" },
        spot_3: { title: "地点 3", type: "equirectangular", panorama: "image/outside/8.jpg" },
        spot_4: { title: "地点 4", type: "equirectangular", panorama: "image/outside/11.jpg" },

        spot_11: { title: "地点 11", type: "equirectangular", panorama: "image/outside/13.jpg" },
        spot_13: { title: "地点 13", type: "equirectangular", panorama: "image/outside/14.jpg" },
        spot_15: { title: "地点 15", type: "equirectangular", panorama: "image/outside/15.jpg" },
        spot_16: { title: "地点 16", type: "equirectangular", panorama: "image/outside/17.jpg" },
        spot_17: { title: "地点 17", type: "equirectangular", panorama: "image/outside/16.jpg" },
        spot_18: { title: "地点 18", type: "equirectangular", panorama: "image/outside/18.jpg" },

        spot_20: { title: "地点 20", type: "equirectangular", panorama: "image/outside/19.jpg" },
        spot_21: { title: "地点 21", type: "equirectangular", panorama: "image/outside/21.jpg" },
        spot_22: { title: "地点 22", type: "equirectangular", panorama: "image/outside/22.jpg" },
        spot_23: { title: "地点 23", type: "equirectangular", panorama: "image/outside/24.jpg" },
        spot_24: { title: "地点 24", type: "equirectangular", panorama: "image/outside/20.jpg" },

        spot_25: { title: "地点 25", type: "equirectangular", panorama: "image/spot/25.jpg" },
        spot_26: { title: "地点 26", type: "equirectangular", panorama: "image/spot/26.jpg" },
        spot_27: { title: "地点 27", type: "equirectangular", panorama: "image/spot/27.jpg" },
        spot_28: { title: "地点 28", type: "equirectangular", panorama: "image/spot/28.jpg" },
        spot_29: { title: "地点 29", type: "equirectangular", panorama: "image/spot/29.jpg" },
        spot_30: { title: "地点 30", type: "equirectangular", panorama: "image/spot/30.jpg" }
    }
};



const mapArrowOffsets = {
    spot_1: 160,
    spot_2: -90,
    spot_3: 90,
    spot_4: 240,

    spot_11: -30,
    spot_12: 0,
    spot_13: 15,
    spot_14: 0,
    spot_15: 0,
    spot_16: 0,
    spot_17: 0,
    spot_18: 0,
    
    spot_19: 0,
    spot_20: 0,
    spot_21: 0,
    spot_22: 0,
    spot_23: 0,
    spot_24: 0,
    spot_25: 0,
    spot_26: 0,
    spot_27: 0,
    spot_28: 0,
    spot_29: 0,
    spot_30: 0
};

const tomatoTour = {
    default: {
        firstScene: "tomato_entrance",
        autoLoad: true,
        sceneFadeDuration: 1000,
        hfov: 100,
        minHfov: 50,
        maxHfov: 120,
        showControls: true
    },

    scenes: {
        tomato_entrance: {
            title: "トマトの森",
            type: "equirectangular",
            panorama: "image/tomato/21.jpg"
        }
    }
};

const welcomeTour = {
    default: {
        firstScene: "welcome_1",
        autoLoad: true,
        sceneFadeDuration: 1000,
        hfov: 100,
        minHfov: 50,
        maxHfov: 120,
        showControls: true
    },

    scenes: {
        welcome_1: { title: "ウェルカムセンター 1", type: "equirectangular", panorama: "image/welcomeCenter/1.jpg" },
        welcome_2: { title: "ウェルカムセンター 2", type: "equirectangular", panorama: "image/welcomeCenter/2.jpg" },
        welcome_3: { title: "ウェルカムセンター 3", type: "equirectangular", panorama: "image/welcomeCenter/3.jpg" },
        welcome_4: { title: "ウェルカムセンター 4", type: "equirectangular", panorama: "image/welcomeCenter/4.jpg" }
    }
};

const coconutTour = {
    default: {
        firstScene: "coconut_1",
        autoLoad: true,
        sceneFadeDuration: 1000,
        hfov: 100,
        minHfov: 50,
        maxHfov: 120,
        showControls: true
    },

    scenes: {
        coconut_1: {
            title: "ココワッカホール",
            type: "equirectangular",
            panorama: "image/coconutHole/23.jpg"
        }
    }
};

const rakudaTour = {
    default: {
        firstScene: "rakuda_1",
        autoLoad: true,
        sceneFadeDuration: 1000,
        hfov: 100,
        minHfov: 50,
        maxHfov: 120,
        showControls: true
    },

    scenes: {
        rakuda_1: { title: "レストランラクダ軒 1", type: "equirectangular", panorama: "image/RakudaKen/7.jpg" },
        rakuda_2: { title: "レストランラクダ軒 2", type: "equirectangular", panorama: "image/RakudaKen/8.jpg" }
    }
};

const mapLocations = {
    spot_1: { top: "62%", left: "47%" },
    spot_2: { top: "36%", left: "24%" },
    spot_3: { top: "44%", left: "27%" },
    spot_4: { top: "38%", left: "30%" },

    spot_11: { top: "29%", left: "36%" },
    spot_13: { top: "19%", left: "42%" },
    spot_15: { top: "10%", left: "50%" },
    spot_16: { top: "4%", left: "50%" },
    spot_17: { top: "9%", left: "56%" },
    spot_18: { top: "2%", left: "66%" },

    spot_20: { top: "40%", left: "44%" },
    spot_21: { top: "54%", left: "57%" },
    spot_22: { top: "52%", left: "60%" },
    spot_23: { top: "45%", left: "60%" },
    spot_24: { top: "48%", left: "49%" },

    spot_25: { top: "45%", left: "65%" },
    spot_26: { top: "0%", left: "0%" },
    spot_27: { top: "0%", left: "0%" },
    spot_28: { top: "0%", left: "0%" },
    spot_29: { top: "0%", left: "0%" },
    spot_30: { top: "0%", left: "0%" }
};

const tours = {
    village: villageTour,
    tomato: tomatoTour,
    welcome: welcomeTour,
    coconut: coconutTour,
    rakuda: rakudaTour
};

const tourConfig = tours[tourType] || villageTour;
const viewer = pannellum.viewer("panorama", tourConfig);
const panorama = document.getElementById("panorama");

function changeScene(id) {
    viewer.loadScene(id);
}

function toggleMenu() {
    document.getElementById("menu-container")?.classList.toggle("open");
}

document.addEventListener("click", function (e) {
    const menu = document.getElementById("menu-container");

    if (menu && !menu.contains(e.target)) {
        menu.classList.remove("open");
    }
});

function updateCurrentPosition() {
    const dot = document.getElementById("current-pos");
    const pos = mapLocations[viewer.getScene()];

    if (dot && pos) {
        dot.style.top = pos.top;
        dot.style.left = pos.left;
    }
}

viewer.on("load", updateCurrentPosition);

function moveSceneInOrder(order) {
    const current = viewer.getScene();
    const currentIndex = order.indexOf(current);

    if (currentIndex === -1) return;

    const nextIndex = currentIndex === order.length - 1 ? 0 : currentIndex + 1;
    viewer.loadScene(order[nextIndex]);
}

panorama.addEventListener("contextmenu", function (e) {
    const clickedUi = e.target.closest("#menu-container, #map-container, .pnlm-controls-container, .pnlm-hotspot-base");

    if (clickedUi) return;

    if (tourType === "welcome") {
        e.preventDefault();
        moveSceneInOrder(["welcome_1", "welcome_2", "welcome_3", "welcome_4"]);
    }

    if (tourType === "rakuda") {
        e.preventDefault();
        moveSceneInOrder(["rakuda_1", "rakuda_2"]);
    }
});

// 自作カーソル
const cursor = document.getElementById("move-cursor");
const panoramaArea = document.getElementById("panorama");

document.addEventListener("mousemove", function (e) {
    if (!cursor) return;

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    const yaw = viewer.getYaw();
    cursor.style.transform = `translate(-50%, -50%) rotate(${yaw - 90}deg)`;
});

if (panoramaArea) {
    panoramaArea.addEventListener("mouseenter", function () {
        if (cursor) {
            cursor.classList.add("active");
            cursor.style.display = "block";
        }
    });

    panoramaArea.addEventListener("mouseleave", function () {
        if (cursor) {
            cursor.classList.remove("active");
            cursor.style.display = "none";
        }
    });
}

document.addEventListener("mousedown", function (e) {
    if (e.target.closest("#map-container")) return;
    if (cursor) cursor.classList.add("dragging");
});

document.addEventListener("mouseup", function () {
    if (cursor) cursor.classList.remove("dragging");
});

// ミニマップ拡大縮小・移動
const mapContainer = document.getElementById("map-container");
const mapZoomLayer = document.getElementById("map-zoom-layer");

let mapScale = 1;
let mapX = 0;
let mapY = 0;

let isMapDragging = false;
let mapStartX = 0;
let mapStartY = 0;

function updateMapTransform() {
    if (!mapZoomLayer) return;

    mapZoomLayer.style.transform =
        `translate(${mapX}px, ${mapY}px) scale(${mapScale})`;
}

if (mapContainer && mapZoomLayer) {
    mapContainer.addEventListener("wheel", function (e) {
        e.preventDefault();

        if (e.deltaY < 0) {
            mapScale += 0.1;
        } else {
            mapScale -= 0.1;
        }

        mapScale = Math.min(Math.max(mapScale, 1), 2.5);

        if (mapScale === 1) {
            mapX = 0;
            mapY = 0;
        }

        updateMapTransform();
    });

    mapContainer.addEventListener("mousedown", function (e) {
        if (e.button !== 1) return;

        e.preventDefault();

        isMapDragging = true;
        mapStartX = e.clientX - mapX;
        mapStartY = e.clientY - mapY;

        mapContainer.classList.add("dragging");
    });

    document.addEventListener("mousemove", function (e) {
        if (!isMapDragging) return;

        mapX = e.clientX - mapStartX;
        mapY = e.clientY - mapStartY;

        updateMapTransform();
    });

    document.addEventListener("mouseup", function () {
        isMapDragging = false;
        mapContainer.classList.remove("dragging");
    });

    mapContainer.addEventListener("auxclick", function (e) {
        if (e.button === 1) {
            e.preventDefault();
        }
    });
}

function updateMapRotation() {
    const dot = document.getElementById("current-pos");

    if (dot) {
        const sceneId = viewer.getScene();
        const offset = mapArrowOffsets[sceneId] || 0;

        dot.style.transform =
            `translate(-50%, -50%) rotate(${viewer.getYaw() + offset}deg)`;
    }

    requestAnimationFrame(updateMapRotation);
}

updateCurrentPosition();
updateMapRotation();