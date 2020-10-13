/**
 * post打开页面
 * hagan.getDocumentWidth()
 * !IE8
 */

const postWindow = function ({action = '', params = [], target = '_blank'}) {
  const domForm = document.createElement('form')
  domForm.style.display = 'none'
  domForm.action = action
  domForm.method = 'post'
  domForm.target = target
  params.forEach(item => {
    const domInput = document.createElement('input')
    domInput.type = 'text'
    domInput.name = item.key
    domInput.value = item.value
    domForm.appendChild(domInput)
  })
  const domBody = document.body
  domBody.appendChild(domForm)
  domForm.submit()
  domBody.removeChild(domForm)
}

export default postWindow