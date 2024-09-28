
// ----> Question #1
function longestSubseq(arr) {
    if (arr.length === 0) return 0;

    let dp = new Array(arr.length).fill(1);
    let parent = new Array(arr.length).fill(-1);
    let maxLength = 1;
    let maxIndex = 0;

    for (let i = 1; i < arr.length; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[i] > arr[j] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
                parent[i] = j;
            }
        }

        if (dp[i] > maxLength) {
            maxLength = dp[i];
            maxIndex = i;
        }
    }


    let lis = [];
    for (let i = maxIndex; i >= 0; i = parent[i]) {
        lis.unshift(arr[i]);
        if (parent[i] === -1) break;
    }

    return {
        length: maxLength,
        subsequence: lis
    };
}

let arr = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(longestSubseq(arr));

// ----> Question #3
db.sales.aggregate([
    {
      "$unwind": "$items"
    },
    {
      "$project": {
        "store": 1,
        "month": { "$dateToString": { "format": "%Y-%m", "date": "$date" } },
        "totalRevenue": { "$multiply": ["$items.quantity", "$items.price"] },
        "price": "$items.price"
      }
    },
    {
      "$group": {
        "_id": {
          "store": "$store",
          "month": "$month"
        },
        "totalRevenue": { "$sum": "$totalRevenue" },
        "averagePrice": { "$avg": "$price" }
      }
    },
    {
      "$project": {
        "_id": 0,
        "store": "$_id.store",
        "month": "$_id.month",
        "totalRevenue": 1,
        "averagePrice": 1
      }
    },
    {
      "$sort": {
        "store": 1,
        "month": 1
      }
    }
  ])
