// ==========================================================
// stock-sector-map.js
// Thai Stock -> Sector Map
// SET + mai
//
// SET : ใช้ 28 Sector ของ SET
// mai : SET ไม่กำหนด Sector แบบเดียวกับ SET
//       ดังนั้น mai จะคืนค่า ""
//
// Data source:
// Thai Securities Data
// ข้อมูลอ้างอิงจาก Listed Companies ของ SET
// ==========================================================

// ==========================================================
// 1. URL ข้อมูลหุ้น
// ==========================================================

const STOCK_DATA_URL =
"https://raw.githubusercontent.com/lumduan/thai-securities-data/main/thai_securities_all_en.json";

// ==========================================================
// 2. Map ชื่อ Sector จากข้อมูลภาษาอังกฤษ
//    -> Sector ที่ Stock Tracker ของเราใช้
// ==========================================================

const SET_SECTOR_MAP = {

```
// =========================
// AGRO
// =========================

"Agribusiness":
    "AGRI",

"Food & Beverage":
    "FOOD",


// =========================
// CONSUMPTION
// =========================

"Fashion":
    "FASHION",

"Home & Office Products":
    "HOME",

"Personal Products & Pharmaceuticals":
    "PERSON",


// =========================
// FINANCIALS
// =========================

"Banking":
    "BANK",

"Finance & Securities":
    "FIN",

"Insurance":
    "INSUR",


// =========================
// INDUSTRIALS
// =========================

"Automotive":
    "AUTO",

"Industrial Materials & Machinery":
    "IMM",

"Paper & Printing Materials":
    "PAPER",

"Petrochemicals & Chemicals":
    "PETRO",

"Packaging":
    "PKG",

"Steel and Metal Products":
    "STEEL",


// =========================
// PROPERTY & CONSTRUCTION
// =========================

"Construction Materials":
    "CONMAT",

"Construction Services":
    "CONS",

"Property Fund & REITs":
    "PF&REIT",

"Property Development":
    "PROP",


// =========================
// RESOURCES
// =========================

"Energy & Utilities":
    "ENERG",

"Mining":
    "MINE",


// =========================
// SERVICES
// =========================

"Commerce":
    "COMM",

"Health Care Services":
    "HELTH",

"Media & Publishing":
    "MEDIA",

"Professional Services":
    "PROF",

"Tourism & Leisure":
    "TOURISM",

"Transportation & Logistics":
    "TRANS",


// =========================
// TECHNOLOGY
// =========================

"Electronic Components":
    "ETRON",

"Information & Communication Technology":
    "ICT"
```

};

// ==========================================================
// 3. ตัวแปร Map จริงที่ script.js จะใช้
// ==========================================================

const STOCK_SECTOR_MAP = {};

// ==========================================================
// 4. โหลดข้อมูลหุ้น
// ==========================================================

async function loadStockSectorMap() {

```
try {

    const response =
        await fetch(STOCK_DATA_URL, {
            cache: "no-cache"
        });

    if (!response.ok) {

        throw new Error(
            "ไม่สามารถโหลดข้อมูล Stock Sector ได้"
        );

    }

    const data =
        await response.json();


    // ล้าง Map เดิม
    Object.keys(STOCK_SECTOR_MAP)
        .forEach(key => {
            delete STOCK_SECTOR_MAP[key];
        });


    // ==================================================
    // สร้าง Symbol -> Sector
    // ==================================================

    data.forEach(stock => {

        const symbol =
            String(stock.symbol || "")
                .trim()
                .toUpperCase();

        if (!symbol)
            return;


        // ----------------------------------------------
        // SET
        // ----------------------------------------------

        if (stock.market === "SET") {

            const sectorName =
                String(stock.sector || "")
                    .trim();

            const sector =
                SET_SECTOR_MAP[sectorName] || "";


            STOCK_SECTOR_MAP[symbol] =
                sector;

        }


        // ----------------------------------------------
        // mai
        //
        // mai ไม่มี Sector แบบ 28 Sector ของ SET
        // ----------------------------------------------

        else if (stock.market === "mai") {

            STOCK_SECTOR_MAP[symbol] = "";

        }

    });


    console.log(
        "Stock Sector Map Loaded:",
        Object.keys(STOCK_SECTOR_MAP).length,
        "stocks"
    );


    return STOCK_SECTOR_MAP;


} catch (error) {

    console.error(
        "โหลด Stock Sector Map ไม่สำเร็จ:",
        error
    );

    return STOCK_SECTOR_MAP;

}
```

}

// ==========================================================
// 5. ฟังก์ชันค้นหา Sector
// ==========================================================

function getStockSector(symbol) {

```
const key =
    String(symbol || "")
        .trim()
        .toUpperCase();


return STOCK_SECTOR_MAP[key] || "";
```

}

// ==========================================================
// 6. ตรวจว่ามีหุ้นใน Map หรือไม่
// ==========================================================

function hasStockSector(symbol) {

```
const key =
    String(symbol || "")
        .trim()
        .toUpperCase();


return Object.prototype.hasOwnProperty.call(
    STOCK_SECTOR_MAP,
    key
);
```

}

// ==========================================================
// 7. โหลด Map ทันที
// ==========================================================

loadStockSectorMap();
