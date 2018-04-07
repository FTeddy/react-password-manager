import { observable, computed } from 'mobx'

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
  @observable query = ''

  // UI
  @observable pwdModalClass = 'modal'
  @observable pwdEditClass = 'modal'
  @observable pwdStatus = {
    uppercase: false,
    lowercase: false,
    special: false,
    number: false,
    length: false
  }

  @computed get pwdProgress () {
    let progress = Object.entries(this.pwdStatus).filter(prop => prop[1] ? true : false).length
    return (progress * 20).toString()
  }
  @computed get pwdProgColor () {
    if (this.pwdProgress >= 60) {
      return 'progress is-success is-small'
    } else {
      return 'progress is-danger is-small'
    }
  }

  modalTrigger= () => {
    if (this.pwdModalClass === 'modal') {
      this.pwdModalClass = 'modal is-active'
    } else if (this.pwdModalClass === 'modal is-active') {
      this.pwdModalClass = 'modal'
    }
  }

  modalClose= () => {
    this.pwdModalClass = 'modal'
    this.passValidateReset()
  }

  modalUpdateTrigger= (entry) => {
    // console.log(entry);
    this.selectedPass = entry
    if (this.pwdEditClass === 'modal') {
      this.pwdEditClass = 'modal is-active'
    } else if (this.pwdEditClass === 'modal is-active') {
      this.pwdEditClass = 'modal'
    }
  }

  modalUpdateClose= () => {
    this.pwdEditClass = 'modal'
    this.passValidateReset()
  }

  // PASS VALIDATION
  passValidateReset = () => {
    this.pwdStatus = {
      uppercase: false,
      lowercase: false,
      special: false,
      number: false,
      length: false
    }
  }
  passValidate = (pwd) => {
    let result = {
      uppercase: false,
      lowercase: false,
      special: false,
      number: false,
      length: false
    }
    // uppercase
    let uppercase = RegExp(/([A-Z])/g)
    if (uppercase.test(pwd)) {
      result.uppercase = true
    }
    // lowercase
    let lowercase = RegExp(/([a-z])/g)
    if (lowercase.test(pwd)) {
      result.lowercase = true
    }
    // special
    let special = RegExp(/([^A-Za-z0-9\s])/g)
    if (special.test(pwd)) {
      result.special = true
    }
    // number
    let number = RegExp(/([0-9])/g)
    if (number.test(pwd)) {
      result.number = true
    }
    // length
    if (pwd.length > 6) {
      result.length = true
    }
    this.pwdStatus = result
  }

}

export default new Mobx()
