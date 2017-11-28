# AliExpressAnalytics_QuickNDurty
Get your purchase history from AliExpress in the form of CSV files
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
