import { observable } from 'mobx'

class Mobx {
  // Data
  @observable passList = [];
  @observable pages = 1;
  @observable currentPage = 1;
  @observable selectedPass = {};

  // Utils
  @observable isLoading = false;
  @observable err = null;
  @observable hello = 'hello :v';

}

export default new Mobx()
