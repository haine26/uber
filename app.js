//Khai báo các mảng giá và giá chờ cho các loại xe
//hằng số
const ARRAY_GIA_UBER_X = [600, 1000, 800];
const WAIT_TIME_UBER_X = 300;

const ARRAY_GIA_SUV = [700, 1200, 1000];
const WAIT_TIME_SUV = 400;

const ARRAY_GIA_BLACK = [800, 1400, 1200];
const WAIT_TIME_BLACK = 500;

function checkUberType() {
    var uberX = document.getElementById("uberX");
    var uberSUV = document.getElementById("uberSUV");
    var uberBlack = document.getElementById("uberBlack");

    if (uberX.checked) {
        return "uberX";
    } else if (uberSUV.checked) {
        return "uberSUV"
    } else if (uberBlack.checked) {
        return "uberBlack";
    }
}
//Trên 3 phút mỗi tính tiền chờ, cứ 3 phút tính một lần -> chia cho 3 và làm tròn
function waitTimeCheck(waitTime, price) {
    var wait_time = 0;
    if (waitTime >= 3) {
        wait_time = Math.round(waitTime / 3.0) * price;
    }
    return wait_time;
}

function payment(Km, waitTime, arrayPrice, price) {
    var waitTimePrice = waitTimeCheck(waitTime, price);
    if (Km <= 1) {
        return arrayPrice[0] + waitTimePrice;
    } else if (Km > 1 && Km <= 20) {
        return arrayPrice[0] + (Km - 1) * arrayPrice[1] + waitTimePrice;
    } else if (Km > 20) {
        return arrayPrice[0] + 19 * arrayPrice[1] * (Km - 20) * arrayPrice[2] + waitTimePrice;
    }

}

function sumPayment() {
    var Km = document.getElementById("Km").value;
    var waitTime = document.getElementById("waitTime").value;

    Km = parseFloat(Km);
    waitTime = parseFloat(waitTime);

    var sumPrice = 0;
    var uberType = checkUberType();
    switch (uberType) {
        case "uberX":
            sumPrice = payment(Km, waitTime, ARRAY_GIA_UBER_X, WAIT_TIME_UBER_X);
            break;
        case "uberSUV":
            sumPrice = payment(Km, waitTime, ARRAY_GIA_SUV, WAIT_TIME_SUV);
            break;
        case "uberBlack":
            sumPrice = payment(Km, waitTime, ARRAY_GIA_BLACK, WAIT_TIME_BLACK);
            break;
        default:
            alert("Please chose the Uber type !");
    }
    return sumPrice;
}

document.getElementById("btnPayment").onclick = function () {
    var sumPrice = sumPayment();
    document.getElementById("divTotal").style.display = "block";
    document.getElementById("totalOut").innerHTML = sumPrice;
}

function renderRowDetailKm(checkUberType, arrayKm, arrayPrice, tblBody) {
    for (var i = 0; i < arrayKm.length; i++) {
        var tr = document.createElement("tr");

        var tdUberType = document.createElement("td");
        var tdUsedKm = document.createElement("td");
        var tdUnitPrice = document.createElement("td");
        var tdTotal = document.createElement("td");

        tdUberType.innerHTML = checkUberType;
        tdUsedKm.innerHTML = arrayKm[i] + " km";
        tdUnitPrice.innerHTML = arrayPrice[i];
        tdTotal.innerHTML = arrayKm[i] * arrayPrice[i];

        tr.appendChild(tdUberType);
        tr.appendChild(tdUsedKm);
        tr.appendChild(tdUnitPrice);
        tr.appendChild(tdTotal);

        tblBody.appendChild(tr);
    }
}

function renderRowWaitTime(waitTime, waitTimePrice, tblBody) {
    var wait_time = waitTimeCheck(waitTime, waitTimePrice);
    var trWaitTime = document.createElement("tr");

    var tdMinuteTitle = document.createElement("td");
    var tdMinute = document.createElement("td");
    var tdPrice = document.createElement("td");
    var tdTotal = document.createElement("td");

    tdMinuteTitle.innerHTML = " Wait time";
    tdMinuteTitle.innerHTML = waitTime + " minutes";
    tdPrice.innerHTML = waitTimePrice;
    tdTotal.innerHTML = wait_time;

    trWaitTime.appendChild(tdMinuteTitle);
    trWaitTime.appendChild(tdMinute);
    trWaitTime.appendChild(tdPrice);
    trWaitTime.appendChild(tdTotal);

    tblBody.appendChild(trWaitTime);
}

function renderRowSum(sumPrice, tblBody) {
    var trTotal = document.createElement("tr");
    trTotal.className = "alert alert-success";

    var tdTotalTile = document.createElement("td");
    tdTotalTile.setAttribute("colspan", 3);
    var tdTotal = document.createElement("td");

    tdTotalTile.innerHTML = " Total payable";
    tdTotal.innerHTML = sumPrice;

    trTotal.appendChild(tdTotalTile);
    trTotal.appendChild(tdTotal);

    tblBody.appendChild(trTotal);
}

function printOutBill(checkUberType, Km, waitTime, waitTimePrice, arrayPrice, sumPrice) {
    var tblBody = document.getElementById("tblBody");
    tblBody.innerHTML = ""; // reset lại tbody 

    if (Km <= 1) {
        renderRowDetailKm(checkUberType, [1], arrayPrice, tblBody);
    }
    else if (Km > 1 && Km <= 20) {
        renderRowDetailKm(checkUberType, [1, Km - 1], arrayPrice, tblBody);
    }
    else if (Km > 20) {
        renderRowDetailKm(checkUberType, [1, 19, Km - 20], arrayPrice, tblBody);
    }

    /**
     * wait time
     */
    if (waitTime > 2) {
        renderRowWaitTime(waitTime, waitTimePrice, tblBody);
    }

    /**
     * Tổng tiền
     */
    renderRowSum(sumPrice, tblBody);
}

document.getElementById("btnReceipt").onclick = function () {
    var data = getData();
    var sumPrice = sumPayment();
    var uberType = checkUberType();
    switch (uberType) {
        case "uberX":
            printOutBill(uberType, data[0], data[1], WAIT_TIME_UBER_X, ARRAY_GIA_UBER_X, sumPrice);
            break;
        case "uberSUV":
            printOutBill(uberType, data[0], data[1], WAIT_TIME_SUV, ARRAY_GIA_SUV, sumPrice);
            break;
        case "uberBlack":
            printOutBill(uberType, data[0], data[1], WAIT_TIME_BLACK, ARRAY_GIA_BLACK, sumPrice);
            break;
        default:
            alert("Please chose the Uber type !");
    }


}

function getData() {
    var data = [];
    var Km = document.getElementById("Km").value;
    Km = parseFloat(Km);
    data.push(Km);
    var waitTime = document.getElementById("waitTime").value;
    waitTime = parseFloat(waitTime);
    data.push(waitTime);
    return data;
}