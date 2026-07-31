window.onload = function () {

    loadGoals();

};

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

    // =========================
// Current Portfolio
// =========================
const currentPortfolio =
    Number(localStorage.getItem("currentPortfolioValue")) || 0;

const currentDividend =
    Number(localStorage.getItem("currentDividendValue")) || 0;


// แสดงข้อมูลปัจจุบัน
document.getElementById("currentPortfolioValue").innerText =
    formatNumber(currentPortfolio) + " บาท";

document.getElementById("currentDividendValue").innerText =
    formatNumber(currentDividend) + " บาท";


// แสดงเป้าหมาย
document.getElementById("targetPortfolioValue").innerText =
    formatNumber(goals.portfolioGoal) + " บาท";

document.getElementById("targetDividendValue").innerText =
    formatNumber(goals.dividendGoal) + " บาท";


// =========================
// Portfolio Progress
// =========================
let portfolioPercent = 0;

if (goals.portfolioGoal > 0) {

    portfolioPercent =
        (currentPortfolio / goals.portfolioGoal) * 100;

}

portfolioPercent = Math.min(portfolioPercent, 100);

document.getElementById("goalProgressPercent").innerText =
    portfolioPercent.toFixed(2);

document.getElementById("goalProgressBar").style.width =
    portfolioPercent + "%";

document.getElementById("remainingGoal").innerText =
    formatNumber(
        Math.max(goals.portfolioGoal - currentPortfolio, 0)
    );


// =========================
// Dividend Progress
// =========================
let dividendPercent = 0;

if (goals.dividendGoal > 0) {

    dividendPercent =
        (currentDividend / goals.dividendGoal) * 100;

}

dividendPercent = Math.min(dividendPercent, 100);

document.getElementById("dividendGoalPercent").innerText =
    dividendPercent.toFixed(2);

document.getElementById("dividendGoalProgressBar").style.width =
    dividendPercent + "%";

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

    
    document.getElementById("portfolioPercent").innerText =
    portfolioPercent.toFixed(2);

document.getElementById("portfolioProgress").style.width =
    Math.min(portfolioPercent, 100) + "%";

const dividendPercent = goals.dividendGoal > 0
    ? (currentDividend / goals.dividendGoal) * 100
    : 0;

document.getElementById("dividendGoalPercent").innerText = dividendPercent.toFixed(2);
document.getElementById("dividendGoalProgressBar").style.width = Math.min(dividendPercent, 100) + "%";

    document.getElementById("dividendPercent").innerText =
    dividendPercent.toFixed(2);

document.getElementById("dividendProgress").style.width =
    Math.min(dividendPercent, 100) + "%";

    document.getElementById("projectionCurrent").innerText =
    formatNumber(currentPortfolio) + " บาท";

document.getElementById("projectionMonthlyInvestment").innerText =
    formatNumber(goals.monthlyInvestment) + " บาท";

document.getElementById("projectionExpectedReturn").innerText =
    goals.expectedReturn + " %";

document.getElementById("projectionYear").innerText =
    goals.targetYear || "-";

}

function formatNumber(value) {

    return Number(value || 0).toLocaleString("en-US");

}

window.loadGoals = loadGoals;
