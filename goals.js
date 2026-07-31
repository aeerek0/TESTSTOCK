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

}

function formatNumber(value) {

    return Number(value || 0).toLocaleString("en-US");

}
