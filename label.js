class BdLabel extends HTMLElement {

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  render() {
    this.shadow.innerHTML = `
    <style>
  
    @keyframes SHOW-OVERLAY {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }


    @keyframes HIDE-OVERLAY {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    .overlay {
      width: 100%;
      min-heigth: 100vh;
      background-color: transparent;
      position: fixed;
      top: 100px;
      right: 50px;
      z-index: 50;
    }
    
    .label {
        width: 100px;
        text-align: right;
        display: flex;
        align-items:center;
        border-radius: 5px;
        padding: 9px 15px 9px 145px;
        z-index: 100;
    }

    .success {
        color: #1ba86b;
        background-color:red;
    }

    .alert {
        color: #9d6d00;
    }
    
    .danger {
        color: #c92a4f;
    }
    
    .small {
        min-heigth: 25px;
        font-size: 11px;
        line-heigth: 20px;
    }

    .medium {
        min-heigth: 40px;
        font-size: 13px;
        line-heigth: 26px;
    }

    .large {
        min-heigth: 60px;
        font-size: 13px;
        line-heigth: 26px;
    }

    .overlay-show {
      animation-duration: 250ms;
      animation-name: SHOW-OVERLAY;
    }

    .overlay-hide {
      animation-duration: 250ms;
      animation-name: HIDE-OVERLAY;
      opacity: 0;
    }

    .no-opacity {
      opacity: 0;
    }

   </style>

    <div class="overlay no-opacity">
        <div class="label success">
          <div class="content">
            ${this.visibility}
          </div>
          <div>
            <button id="close-btn">
              icon btn
            </button>
          </div>
        </div>
    </div>
    `
  }

  get visibility() {
    return this.getAttribute('visibility')
  }

  set visibility(v) {
    this.setAttribute('visibility', v)
  }

  static get observedAttributes() {
    return ['visibility']
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    this.render()

    if (newVal === 'true')
      this.show()
    else if (newVal === 'false') this.hide()

    const closeBtn = this.shadow.querySelector('#close-btn')
    closeBtn.addEventListener('click', this.hide.bind(this))
  }

  connectedCallback() {
    this._attachEventHandlers()
  }

  _attachEventHandlers() {
    this.render()
  }

  show() {
    const overlayEl = this.shadow.querySelector('.overlay')
    overlayEl.classList.remove('no-opacity')
    overlayEl.classList.add('overlay-show')
  }

  hide() {
    const overlayEl = this.shadow.querySelector('.overlay')
      overlayEl.classList.add('overlay-hide')
  }

}

customElements.define('bd-label', BdLabel)