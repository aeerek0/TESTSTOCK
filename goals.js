window.loadGoals = loadGoals;

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


let projectionYear = document.getElementById("projectionYear").innerText;

document.getElementById("healthProjectionYear").innerText =
    projectionYear;


const currentYear = new Date().getFullYear();

if (projectionYear !== "-") {

    const remainYear = Number(projectionYear) - currentYear;

    document.getElementById("healthRemainYear").innerText =
        remainYear > 0 ? remainYear : 0;

}


let status = "🟢 อยู่ในแผน";


if (goals.targetYear && projectionYear !== "-") {

    if (Number(projectionYear) > Number(goals.targetYear)) {

        status = "🟡 ต้องเร่งเพิ่ม";

    }

}


document.getElementById("goalStatus").innerText = status;

    // =========================
// Investment Milestone
// =========================

const milestoneList = [
    {
        name: "🥉 เริ่มต้น",
        percent: 25
    },
    {
        name: "🥈 ครึ่งทาง",
        percent: 50
    },
    {
        name: "🥇 ใกล้ถึงเป้าหมาย",
        percent: 75
    },
    {
        name: "🏆 เป้าหมายสำเร็จ",
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
            ${completed ? "✅ สำเร็จแล้ว" : 
            "กำลังเดินทาง " + progress.toFixed(1) + "%"}
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

window.loadGoals = loadGoals;
