function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

// header for csv
var ordersString = "Amount\tArticle\tDate\t\Status\r\n";
// regex to take the first line of order status (wihtout Open Dispute / Refund links)
var strRegexOrderStatus = new RegExp("^(.*?)[\r\n]+.*", "gi");
document.querySelectorAll('.order-item-wraper').forEach(function(node) {

	var orderStatus = node.querySelectorAll('.product-action')[0].innerText;
	var orderStatusTrimmed = orderStatus.replace(strRegexOrderStatus, '$1');

    ordersString = ordersString +  
		node.querySelectorAll('.amount-num')[0].innerText + "\t" +
		node.querySelectorAll('.baobei-name')[0].innerText + "\t" +
		node.querySelectorAll('.info-body')[1].innerText + "\t" +
		orderStatusTrimmed + "\r\n";
});
download(ordersString, 'orders.txt','text/plain;charset=utf-8');
var nextButton = document.querySelectorAll('.ui-pagination-navi.util-left > .ui-pagination-next.ui-goto-page')[0];
nextButton.click();