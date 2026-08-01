function saveGoals() {
    const goals = {
        portfolioGoal: Number(document.getElementById("inputPortfolioGoal").value) || 0,
        dividendGoal: Number(document.getElementById("inputDividendGoal").value) || 0,
        monthlyInvestment: Number(document.getElementById("inputMonthlyInvestment").value) || 0,
        expectedReturn: Number(document.getElementById("inputExpectedReturn").value) || 8,
        targetYear: document.getElementById("inputTargetYear").value
    };

    localStorage.setItem(
        "investmentGoals",
        JSON.stringify(goals)
    );

    alert("✅ บันทึกเป้าหมายเรียบร้อย");
    loadGoals();
}

function loadGoals() {
    const goals = JSON.parse(
        localStorage.getItem("investmentGoals")
    );

    if (!goals) return;

    document.getElementById("inputPortfolioGoal").value =
        goals.portfolioGoal || "";

    document.getElementById("inputDividendGoal").value =
        goals.dividendGoal || "";

    document.getElementById("inputMonthlyInvestment").value =
        goals.monthlyInvestment || "";

    document.getElementById("inputExpectedReturn").value =
        goals.expectedReturn || 8;

    document.getElementById("inputTargetYear").value =
        goals.targetYear || "";

    document.getElementById("portfolioGoalValue").innerText =
        formatNumber(goals.portfolioGoal);

    document.getElementById("dividendGoalValue").innerText =
        formatNumber(goals.dividendGoal);

    const currentPortfolio = Number(localStorage.getItem("currentPortfolioValue")) || 0;
    const currentDividend = Number(localStorage.getItem("currentDividendValue")) || 0;

    renderProjectionChart(
    currentPortfolio,
    goals.portfolioGoal,
    goals.monthlyInvestment,
    goals.expectedReturn
);

renderSmartTips(
    currentPortfolio,
    goals.portfolioGoal,
    goals.monthlyInvestment,
    currentDividend,
    goals.expectedReturn,
    goals.targetYear
);
    document.getElementById("currentPortfolioValue").innerText = formatNumber(currentPortfolio) + " บาท";
    document.getElementById("currentDividendValue").innerText = formatNumber(currentDividend) + " บาท";

    document.getElementById("targetPortfolioValue").innerText = formatNumber(goals.portfolioGoal) + " บาท";
    document.getElementById("targetDividendValue").innerText = formatNumber(goals.dividendGoal) + " บาท";

    const portfolioPercent = goals.portfolioGoal > 0
        ? (currentPortfolio / goals.portfolioGoal) * 100
        : 0;

    document.getElementById("goalProgressPercent").innerText = portfolioPercent.toFixed(2);
    document.getElementById("goalProgressBar").style.width = Math.min(portfolioPercent, 100) + "%";

    document.getElementById("remainingGoal").innerText =
        formatNumber(Math.max(goals.portfolioGoal - currentPortfolio, 0));

    // ตรวจสอบว่ามี Element นี้อยู่ใน HTML หรือไม่ ป้องกัน Error กรณีไม่มี ID นี้
    const portfolioPercentEl = document.getElementById("portfolioPercent");
    if (portfolioPercentEl) {
        portfolioPercentEl.innerText = portfolioPercent.toFixed(2);
    }

    document.getElementById("portfolioProgress").style.width =
        Math.min(portfolioPercent, 100) + "%";

    const dividendPercent = goals.dividendGoal > 0
        ? (currentDividend / goals.dividendGoal) * 100
        : 0;

    document.getElementById("dividendGoalPercent").innerText = dividendPercent.toFixed(2);
    document.getElementById("dividendGoalProgressBar").style.width = Math.min(dividendPercent, 100) + "%";
    document.getElementById("remainingDividendGoal").innerText =
    formatNumber(Math.max(goals.dividendGoal - currentDividend, 0));

    // ตรวจสอบว่ามี Element นี้อยู่ใน HTML หรือไม่ ป้องกัน Error กรณีไม่มี ID นี้
    const dividendPercentEl = document.getElementById("dividendPercent");
    if (dividendPercentEl) {
        dividendPercentEl.innerText = dividendPercent.toFixed(2);
    }

    document.getElementById("dividendProgress").style.width =
        Math.min(dividendPercent, 100) + "%";

    document.getElementById("projectionCurrent").innerText =
        formatNumber(currentPortfolio) + " บาท";

    document.getElementById("projectionMonthlyInvestment").innerText =
        formatNumber(goals.monthlyInvestment) + " บาท";

    document.getElementById("projectionExpectedReturn").innerText =
        goals.expectedReturn + " %";

    const target = Number(goals.portfolioGoal);
    const current = currentPortfolio;
    const monthly = Number(goals.monthlyInvestment);
    const annualReturn = Number(goals.expectedReturn) / 100;

    if (target > current && monthly > 0) {
        let value = current;
        let months = 0;

        while (value < target && months < 1000) {
            value = value * (1 + annualReturn / 12);
            value += monthly;
            months++;
        }

        const finishDate = new Date();
        finishDate.setMonth(finishDate.getMonth() + months);

        document.getElementById("projectionYear").innerText =
            finishDate.getFullYear();

    } else {
        document.getElementById("projectionYear").innerText = goals.targetYear || "-";
    }

    // =========================
// Goal Health
// =========================

document.getElementById("healthCurrentPortfolio").innerText =
    formatNumber(currentPortfolio);

document.getElementById("healthTargetPortfolio").innerText =
    formatNumber(goals.portfolioGoal);


let projectionYear =
    document.getElementById("projectionYear").innerText;


// ปีเป้าหมายที่ผู้ใช้ตั้ง
const healthTargetYearEl =
    document.getElementById("healthTargetYear");

if (healthTargetYearEl) {
    healthTargetYearEl.innerText =
        goals.targetYear || "-";
}


// ปีที่ระบบคำนวณ
const healthProjectionYearEl =
    document.getElementById("healthProjectionYear");

if (healthProjectionYearEl) {
    healthProjectionYearEl.innerText =
        projectionYear;
}


const currentYear = new Date().getFullYear();

if (projectionYear !== "-") {

    const remainYear = Number(projectionYear) - currentYear;

    document.getElementById("healthRemainYear").innerText =
        remainYear > 0 ? remainYear : 0;

}


let status = "🟢 อยู่ในแผน";

if (
    goals.targetYear &&
    projectionYear !== "-" &&
    Number(projectionYear) > Number(goals.targetYear)
) {
    status = "🟡 ต้องเร่งเพิ่ม";
}

document.getElementById("goalStatus").innerText = status;

    // =========================
// Investment Milestone
// =========================

const milestoneList = [
    {
        name: "🌱 เริ่มต้น 25%",
        percent: 25
    },
    {
        name: "🚀 ครึ่งทาง 50%",
        percent: 50
    },
    {
        name: "🔥 ช่วงเร่งเครื่อง 75%",
        percent: 75
    },
    {
        name: "🏆 Freedom Goal 100%",
        percent: 100
    }
];


let milestoneHTML = "";


milestoneList.forEach(m => {

    const targetAmount =
        goals.portfolioGoal * (m.percent / 100);


    const progress =
        Math.min(
            (currentPortfolio / targetAmount) * 100,
            100
        );


    const completed =
        currentPortfolio >= targetAmount;


    milestoneHTML += `

    <div class="mb-3">

        <div class="d-flex justify-content-between">

            <span>
                ${m.name}
            </span>

            <span>
                ${formatNumber(targetAmount)} บาท
            </span>

        </div>


        <div class="progress">

            <div 
            class="progress-bar ${completed ? 'bg-success' : ''}"
            style="width:${progress}%">

            </div>

        </div>


<small>
${
completed 
? "✅ สำเร็จแล้ว"
: 
"กำลังเดินทาง " + progress.toFixed(1) + 
"% | เหลืออีก " +
formatNumber(Math.max(targetAmount - currentPortfolio,0)) +
" บาท"
}
</small>

    </div>

    `;

});


document.getElementById("milestoneContainer").innerHTML =
    milestoneHTML;
}

function formatNumber(value) {
    return Number(value || 0).toLocaleString("en-US");
}

function renderProjectionChart(current, target, monthly, rate) {

    const ctx = document.getElementById("projectionChart");

    if (!ctx) return;


    let labels = [];
    let projected = [];
    let targetLine = [];


    let value = current;
    let year = new Date().getFullYear();


    for (let i = 0; i <= 10; i++) {

        labels.push(year + i);


        projected.push(Math.round(value));

        targetLine.push(target);


        // คำนวณปีถัดไป
        value = value * (1 + rate / 100);
        value += monthly * 12;

    }


    new Chart(ctx, {

        type: "line",

        data: {

            labels: labels,

            datasets: [

                {
                    label: "📈 พอร์ตคาดการณ์",
                    data: projected,
                    tension: 0.3
                },

                {
                    label: "🎯 เป้าหมาย",
                    data: targetLine,
                    borderDash: [5,5],
                    tension:0
                }

            ]

        },


        options: {

            responsive:true,

            plugins:{
                legend:{
                    position:"bottom"
                }
            },

            scales:{

                y:{
                    ticks:{
                        callback:function(value){
                            return value.toLocaleString()+" บาท";
                        }
                    }
                }

            }

        }

    });

}

function renderSmartTips(
    currentPortfolio,
    target,
    monthly,
    dividend,
    expectedReturn,
    targetYear
){

    const box = document.getElementById("smartTips");

    if(!box) return;


    let tips = "";


    // =========================
    // Portfolio Progress
    // =========================

    const portfolioPercent = target > 0
        ? (currentPortfolio / target) * 100
        : 0;


    let statusText = "";

    if(portfolioPercent < 25){

        statusText = "🌱 ระยะเริ่มต้นสร้างพอร์ต";

    } else if(portfolioPercent < 75){

        statusText = "🚀 กำลังเติบโต";

    } else if(portfolioPercent < 100){

        statusText = "🔥 ใกล้ถึงเป้าหมาย";

    } else {

        statusText = "🏆 บรรลุเป้าหมายแล้ว";

    }


    tips += `
    <div class="mb-3">

        📊 <b>สถานะพอร์ต</b><br>

        ${statusText}<br>

        ความสำเร็จ 
        <b>${portfolioPercent.toFixed(2)}%</b>

    </div>
    `;


    // =========================
    // Goal Analysis
    // =========================

    const remain =
        Math.max(target - currentPortfolio,0);


    tips += `
    <div class="mb-3">

        🎯 <b>เป้าหมาย</b><br>

        เป้าหมาย 
        <b>${formatNumber(target)} บาท</b><br>

        เหลืออีก 
        <b>${formatNumber(remain)} บาท</b>

    </div>
    `;



    // =========================
    // Investment Plan
    // =========================

    tips += `
    <div class="mb-3">

        📌 <b>แผนปัจจุบัน</b><br>

        ลงทุนเพิ่ม 
        <b>${formatNumber(monthly)} บาท/เดือน</b><br>

        พอร์ตปัจจุบัน 
        <b>${formatNumber(currentPortfolio)} บาท</b>

    </div>
    `;



    // =========================
    // Dividend Analysis
    // =========================

    const monthlyDividend =
        dividend / 12;


    tips += `
    <div>

        💰 <b>Passive Income</b><br>

        ปันผลปัจจุบัน 
        <b>${formatNumber(dividend)} บาท/ปี</b><br>

        เฉลี่ย 
        <b>${formatNumber(monthlyDividend)} บาท/เดือน</b>

    </div>
    `;


    // =========================
// Extra Investment Suggestion
// =========================

let extraTip = "";


if(targetYear){

    const currentYear = new Date().getFullYear();

    const years =
        Number(targetYear) - currentYear;


    if(years > 0){

        let requiredMonthly = monthly;


        while(requiredMonthly < 100000){

            let value = currentPortfolio;


            for(let i = 0; i < years * 12; i++){

                value =
                    value * (1 + expectedReturn / 100 / 12);

                value += requiredMonthly;

            }


            if(value >= target){
                break;
            }


            requiredMonthly += 500;

        }


        const extra =
            requiredMonthly - monthly;


        if(extra > 0){

extraTip = `

<div class="mb-3">

🚀 <b>คำแนะนำเพิ่ม</b><br>

ปัจจุบันลงทุน 
<b>${formatNumber(monthly)} บาท/เดือน</b><br>

ถ้าต้องการให้ถึงเป้าหมายปี 
<b>${targetYear}</b><br>

แนะนำเพิ่มอีก 
<b>${formatNumber(extra)} บาท/เดือน</b><br>

รวมเป็นประมาณ 
<b>${formatNumber(monthly + extra)} บาท/เดือน</b>

</div>

`;

        }else{

            extraTip = `

            <div class="mb-3">

            ✅ <b>แผนปัจจุบันทันเป้าหมาย</b><br>

            เงินลงทุนปัจจุบันเพียงพอสำหรับปี ${targetYear}

            </div>

            `;

        }

    }

}


tips += extraTip;

    box.innerHTML = tips;

}

window.loadGoals = loadGoals;
