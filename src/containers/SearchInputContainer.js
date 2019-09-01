import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as newsActions from '@store/actions';
import SearchInput from '@components/SearchInput';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(newsActions, dispatch)
});

const SearchInputContainer = connect(
  null,
  mapDispatchToProps
)(SearchInput);

export { SearchInputContainer as SearchInput };
