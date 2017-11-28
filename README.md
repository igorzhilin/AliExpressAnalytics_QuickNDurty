# AliExpressAnalytics_QuickNDurty
Get your AliExpress purchase history from the web browser in the form of CSV files
## How to run it
1. Go to your **AliExpress Orders** page https://trade.aliexpress.com/orderList.htm
2. Pop up developer console (**F12**)
3. Copypaste the script
4. Run it, it will automatically download a txt file. Confirm the file save. The page will switch to the next page.
5. Repeat step **4** until the pages are over
## What it does
Very simply, it loops over HTML elements of the page, looks into classes and associates their contents with different columns.
The data is written to a string variable, which is then provided to the user as a blob txt file.

Download function copied from here https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server

## How I process the generated txt files
I prefer working with Qlik Sense https://www.qlik.com/us/try-or-buy/download-qlik-sense, because it is free and allows batch upload of same-format files. To load in Qlik Sense:

```
[OrdersRaw]:
LOAD *, 
	Date#(Mid("Date", 7, 20), 'MMM. DD YYYY') 	as DateConverted,
    Time(left("Date",5), '$(TimeFormat)') 		as Time,
    FileName()									as FileName
FROM [lib://folder/orders*.txt]
(txt, utf8, embedded labels, delimiter is '\t', no quotes, no eof);

[Orders]:
NoConcatenate
LOAD
    FileName,
    Status,
    Amount,
    Article,
    Time,
    DateConverted 								as Date,
    month(DateConverted)						as Month,
    year(DateConverted) 						as Year,
    year(DateConverted) &'-'&month(DateConverted) as YearMonth,
    day(DateConverted) 							as Day
Resident [OrdersRaw];

Drop Tables [OrdersRaw];
```

## The look of the dashboard
![alt text](https://github.com/igorzhilin/AliExpressAnalytics_QuickNDurty/blob/master/AliExpressAnalytics_QuickNDurty%20Qlik%20Sense%201.png "Qlik Sense screenshot")
