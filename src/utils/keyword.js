// 说明：把关键字序列化

function split(text, keyword) {
  const content = splitKeyword(text, keyword)
  console.log(content)
}

function splitKeyword(text, keyword) {
  if (keyword === '') {
    return [generateText(text, false)]
  }
  let content = []
  const keyIndex = 
    text
      .toLocaleLowerCase()
      .indexOf(keyword.toLocaleLowerCase())
  if (keyIndex !== -1) {
    
    // 纠正大小写：搜索严格匹配大小写，在匹配时都将匹配对象转换为小写，但是找到关键字之后需要返回之前格式
    keyword = text.slice(keyIndex, keyIndex + keyword.length)

    if (keyIndex !== 0) {
      const before = text.slice(0, keyIndex)
      content.push(
        generateText(before, false),
      )
    }

    const last = text.slice(keyIndex + keyword.length)
    content.push(
      generateText(keyword, true)
    )
    if (last.length >= keyword.length) {
      const result = splitKeyword(last, keyword)
      const finalResults = content.concat(result)
      return finalResults
    } else {
      return content
    }
  } else {
    content.push(
      generateText(text, false)
    )
    return content
  }
}

function generateText(text, mark) {
  return {
    content: text,
    keyword: mark
  }
}

export default splitKeyword