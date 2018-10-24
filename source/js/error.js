if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

const forms = document.querySelectorAll('.programm__list')

const validation = {
  init(form) {
    this.valid = true
    this.form = form
    const fieldsRequired = this.form.querySelectorAll('[required]')

    fieldsRequired.forEach((field) => {
      this.test(field)
    })

    if (this.valid) {
      // this.ajaxSend()
    }

    console.log(this.valid);

  },
  fieldSuccess(field) {
    field.classList.remove('error')
    this.valid = true
  },
  fieldError(field) {
    field.classList.add('error')
    this.valid = false
  },
  test(field) {
    const typeField = field.getAttribute('type')
    switch (typeField) {
      case 'email':
        this.testEmail(field)
        break
      case 'checkbox':
        this.testCheckbox(field)
        break
      default:
        this.testEmpty(field)
    }
  },
  testEmpty(field) {
    if (field.value === '') {
      this.fieldError(field)
    } else {
      this.fieldSuccess(field)
    }
  },
  testEmail(field) {
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9])+$/
    if (!filter.test(field.value)) {
      this.fieldError(field)
    } else {
      this.fieldSuccess(field)
    }
  },
  testCheckbox(field) {
    if (!field.is(':checked')) {
      this.fieldError(field)
    } else {
      this.fieldSuccess(field)
    }
  },

  ajaxSend() {

  },
  messageView(form, modClass) {

  },
}

document.querySelectorAll('[required]').forEach((field) => {
  field.addEventListener('input', () => {
    validation.fieldSuccess(field)
  })
})

function formSubmit(form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    validation.init(form)
  })

  const button = form.querySelector('.programm__button-submit')
  if (button !== null) {
    button.addEventListener('click', (event) => {
      event.preventDefault()
      const domEvent = document.createEvent('Event')
      domEvent.initEvent('submit', false, true)
      event.target.closest('form').dispatchEvent(domEvent)
    })
  }
}

forms.forEach((form) => {
  formSubmit(form)
})
