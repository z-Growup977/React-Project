// reducer必须是一个纯函数， 固定的输入必须要有固定的输出，内部不能有不纯的操作  new Date Math.radom()
// 内部不能有IO操作，异步操作
// 千万不能更改之前的状态

const initState = {
  list: [
    { id: 1, title: "1111", desc: "11111111111", hasRead: true },
    { id: 2, title: "2222", desc: "22222222222", hasRead: true },
  ],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
