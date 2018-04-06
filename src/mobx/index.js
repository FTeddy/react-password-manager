import { observable } from 'mobx'

class Mobx {
  // Data
  @observable passList = null
  @observable passFilter = []
  @observable pages = 1
  @observable currentPage = 1
  @observable selectedPass = {}

  // Utils
  @observable isLoading = false
  @observable isSearch = false
  @observable isAdd = false
  @observable isDelete = false
  @observable err = null
  @observable hello = 'hello :v'

  // UI
  @observable pwdModalClass = 'modal'

  modalTrigger= () => {
    if (this.pwdModalClass === 'modal') {
      this.pwdModalClass = 'modal is-active'
    } else if (this.pwdModalClass === 'modal is-active') {
      this.pwdModalClass = 'modal'
    }
  }

  modalClose= () => {
    this.pwdModalClass = 'modal'
  }

}

export default new Mobx()
