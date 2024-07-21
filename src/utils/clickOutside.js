function clickOutside(el){

  function handleClick(e){
    const target = e.target

    if(el && !el.contains(target)){
      const clickOutsideEvent = new CustomEvent('outside')
      el.dispatchEvent(clickOutsideEvent)
    }

  }

  document.addEventListener('click',handleClick,true)

  return {
    destory(){
      document.removeEventListener('click',handleClick,true)
    }
  }
}

export default clickOutside;
