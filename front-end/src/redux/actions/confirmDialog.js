const setIsOpen = (flag) => ({type: 'SET_OPEN_DIALOG', payload: flag});
const setIsAgree = (flag) => ({type: 'SET_AGREE_DIALOG', payload: flag});

export { setIsOpen, setIsAgree };