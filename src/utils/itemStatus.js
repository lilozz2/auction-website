export const itemStatus = (item) => {
  const bids = Object.keys(item.bids ?? {}).length;

  if (bids === 0) {
    return { bids: 0, amount: item.startingPrice ?? 0, winner: "" };
  }

  // Find the bid with the highest amount
  let highestBid = null;
  let highestAmount = 0;

  for (const bidKey in item.bids) {
    const bid = item.bids[bidKey];
    if (bid.amount > highestAmount) {
      highestAmount = bid.amount;
      highestBid = bid;
    }
  }

  const amount = highestBid ? highestBid.amount : item.startingPrice ?? 0;
  const winner = highestBid ? highestBid.uid : "";

  return { bids, amount, winner };
};
