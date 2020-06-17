import React from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import moment from 'moment';
const { Option } = Select;
const { TextArea } = Input;
class Index extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    const { dispatch, location } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.begin_time = moment(values.begin_time).format('YYYY-MM-DD HH:mm:ss');
        values.end_time = moment(values.end_time).format('YYYY-MM-DD HH:mm:ss');
        dispatch({
          type: 'admin_cid/updateContest',
          payload: values,
        });
        router.push(location.pathname);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 18 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const { Contest, AllMessage } = this.props;

    return (
      <div>
        {Contest != undefined ? (
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="ID">
              {getFieldDecorator('cid', {
                initialValue: Contest.cid,
              })(<Input disabled={true} />)}
            </Form.Item>
            <Form.Item label="比赛名称">
              {getFieldDecorator('contests_name', {
                rules: [{ required: true, message: '请输入1~11个字符', min: 1, max: 11 }],
                initialValue: Contest.contests_name,
              })(<Input />)}
            </Form.Item>
            <Form.Item label="比赛文章">
              {getFieldDecorator('mid', {
                initialValue: Contest.mid,
                rules: [{ required: true, message: '请选择等级' }],
              })(
                <Select style={{ width: '100%' }}>
                  {AllMessage === undefined
                    ? null
                    : AllMessage.map(item => {
                        return <Option value={item.mid}>{item.name}</Option>;
                      })}
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="开始时间">
              {getFieldDecorator('begin_time', {
                initialValue: moment(Contest.begin_time),
                rules: [{ required: true, message: '请输入开始时间' }],
              })(<DatePicker showTime placeholder="Select Time" style={{ width: '100%' }} />)}
            </Form.Item>
            <Form.Item label="结束时间">
              {getFieldDecorator('end_time', {
                initialValue: moment(Contest.end_time),
                rules: [{ required: true, message: '请输入结束时间' }],
              })(<DatePicker showTime placeholder="Select Time" style={{ width: '100%' }} />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                更新
              </Button>
            </Form.Item>
          </Form>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { Contest, AllMessage } = state.admin_cid;
  return {
    loading: state.loading.models.admin_cid,
    Contest,
    AllMessage,
  };
}

export default Form.create()(connect(mapStateToProps)(Index));
