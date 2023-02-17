import Button from '../packages/button/index-button';
import ButtonGroup from '../packages/button/index-button-group';
import Icon from '../packages/icon';
import Radio from '../packages/radio/index-radio';
import RadioGroup from '../packages/radio/index-radio-group';
import Checkbox from '../packages/checkbox/index-checkbox';
import CheckboxGroup from '../packages/checkbox/index-checkbox-group';
import Badge from '../packages/badge';
import Switch from '../packages/switch';
import Pagination from '../packages/pagination';
import Select from '../packages/select/index-select';
import SelectOption from '../packages/select/index-select-option';
import SelectOptionGroup from '../packages/select/index-select-group';
import Input from '../packages/input';
import ColorPicker from '../packages/colorPicker';
import Textarea from '../packages/textarea';
import Tabs from '../packages/tabs/index-tab';
import TabsPane from '../packages/tabs/index-tab-pane';
import Breadcrumb from './breadcrumb/index-breadcrumb';
import BreadcrumbItem from './breadcrumb/index-breadcrumb-item';
import Steps from './steps/index-steps';
import step from './steps/index-step';
import Tag from '../packages/tag';
import Table from '../packages/table';
import TableColumn from '../packages/tableColumn';
import Popover from '../packages/popover';
import Dropdown from '../packages/dropdown/index-dropdown';
import DropdownItem from '../packages/dropdown/index-dropdown-item';
import DropdownMenu from '../packages/dropdown/index-dropdown-menu';
import Message from '../packages/message/index';
import MessageBox from '../packages/messageBox/index';
import Link from '../packages/link';
import Upload from '../packages/upload';
import Modal from '../packages/modal';
import Form from '../packages/form';
import FormItem from '../packages/formItem';
import Row from '../packages/grid/index-row';
import Col from '../packages/grid/index-col';
import datePicker from '../packages/datePicker';
import timePicker from '../packages/timePicker';
import Alert from '../packages/alert';
import Json from '../packages/json';
import Image from '../packages/image';
import ImageMask from '../packages/image/index-image-mask';
import imagePreview from '../packages/image/index-image-preview';
import Editor from '../packages/editor';
import '../src/assets/css/index.less';
import Loader from '../packages/loader/index';
import Progress from '../packages/progress/index';
import Tree from '../packages/tree';
import Cascader from '../packages/cascader';
import Collapse from '../packages/collapse';
import CollapseItem from '../packages/collapseItem';
import { updateTheme, injectTheme } from '../src/utils/theme/setting';

import Vue from 'vue';

// const files = require.context('.', false, /.js$/)
// const obj = {}
// files.keys().forEach(key => {
//   if (key === './index.js') return
//   Object.assign(obj, { ...files(key).default })

// })

const components = {
  datePicker,
  timePicker,
  Button,
  ButtonGroup,
  Icon,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Badge,
  Switch,
  Pagination,
  Select,
  SelectOption,
  SelectOptionGroup,
  Input,
  ColorPicker,
  Textarea,
  Tabs,
  TabsPane,
  Breadcrumb,
  BreadcrumbItem,
  Steps,
  step,
  Tag,
  Table,
  TableColumn,
  Popover,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Message,
  MessageBox,
  Link,
  Upload,
  Modal,
  Form,
  FormItem,
  Row,
  Col,
  Alert,
  Json,
  Image,
  ImageMask,
  imagePreview,
  Editor,
  Loader,
  Progress,
  Tree,
  Cascader,
  Collapse,
  CollapseItem
};

Vue.config.productionTip = false;

const install = function(Vue) {
  Object.keys(components).map(key => components[key]).forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...components
};

Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$loader = Loader;
Vue.prototype.$injectTheme = injectTheme;
Vue.prototype.$updateTheme = updateTheme;

export {
  datePicker,
  timePicker,
  Button,
  ButtonGroup,
  Icon,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Badge,
  Switch,
  Pagination,
  Select,
  SelectOption,
  SelectOptionGroup,
  Input,
  ColorPicker,
  Textarea,
  Tabs,
  TabsPane,
  Breadcrumb,
  BreadcrumbItem,
  Steps,
  step,
  Tag,
  Table,
  TableColumn,
  Popover,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Message,
  MessageBox,
  Link,
  Upload,
  Modal,
  Form,
  FormItem,
  Row,
  Col,
  Alert,
  Json,
  Image,
  ImageMask,
  imagePreview,
  Editor,
  Loader,
  Progress,
  Tree,
  Cascader,
  Collapse,
  CollapseItem,
  updateTheme,
  injectTheme
};
