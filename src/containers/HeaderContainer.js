import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as newsActions from '@store/actions';
import Header from '@components/Header';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(newsActions, dispatch)
});

const HeaderContainer = connect(
  null,
  mapDispatchToProps
)(Header);

export { HeaderContainer as Header };
