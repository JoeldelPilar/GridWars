const create2dArrays = (numberOfRows: number) => {
  // För att förvara referenser till cell-elementen
  const parentArr: HTMLSpanElement[][] = []
  for (let i = 0; i < numberOfRows; i++) {
    const arrToPush: HTMLSpanElement[] = []
    parentArr.push(arrToPush)
  }
  return parentArr
}

export default create2dArrays;