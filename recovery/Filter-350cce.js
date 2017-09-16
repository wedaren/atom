import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Button, Row, Col, Input, Select, Collapse, Cascader } from 'antd'

const Search = Input.Search
const Option = Select.Option
const Panel = Collapse.Panel
import city from '../../../utils/city'

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const Filter = ({
  onAdd,
  onFilterChange,
  filter,
  form: { getFieldDecorator, getFieldsValue, setFieldsValue },
}) => {
  const handleFields = (fields) => {
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const { state, deviceSelfCode, stallCode, address, parkName, status } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }

  return (
    <div>
      <Collapse>
        <Panel header="高级搜索" key="1">
          <Row gutter={24}>
            <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
              {getFieldDecorator('address', { initialValue: address })(
                <Cascader
                  size="large"
                  style={{ width: '100%' }}
                  options={city}
                  placeholder="Please pick an address"
                  onChange={handleChange.bind(null, 'address')}
                />
              )}
            </Col>
            <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
              {getFieldDecorator('parkName', { initialValue: parkName })(
                <Search
                  placeholder="所属车场"
                  size="large"
                  onSearch={handleSubmit}
                />
              )}
            </Col>
            <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
              {getFieldDecorator('parkName', { initialValue: parkName })(
                <Search
                  placeholder="所属基站编码"
                  size="large"
                  onSearch={handleSubmit}
                />
              )}
            </Col>
            <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
              {getFieldDecorator('deviceSelfCode', {
                initialValue: deviceSelfCode,
              })(
                <Search
                  placeholder="地磁自带编号"
                  size="large"
                  onSearch={handleSubmit}
                />
              )}
            </Col>
            <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
              {getFieldDecorator('stallCode', { initialValue: stallCode })(
                <Search
                  placeholder="关联车位"
                  size="large"
                  onSearch={handleSubmit}
                />
              )}
            </Col>
            <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
              {getFieldDecorator('state', { initialValue: state })(
                <Select
                  style={{ width: '100%' }}
                  size="large"
                  onChange={handleChange}
                  placeholder="停车状态"
                >
                  <Option value="1">停车中</Option>
                  <Option value="2">空闲</Option>
                </Select>
              )}
            </Col>
            <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
              {getFieldDecorator('status', { initialValue: status })(
                <Select
                  style={{ width: '100%' }}
                  size="large"
                  onChange={handleChange}
                  placeholder="设备状态"
                >
                  <Option value="1">正常</Option>
                  <Option value="2">异常</Option>
                </Select>
              )}
            </Col>
            <Col
              {...ColProps}
              xl={{ span: 10 }}
              md={{ span: 24 }}
              sm={{ span: 24 }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <Button
                    type="primary"
                    size="large"
                    className="margin-right"
                    onClick={handleSubmit}
                  >
                    Search
                  </Button>
                  <Button size="large" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Panel>
      </Collapse>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <Button type="primary" size="large" onClick={onAdd}>
            添加地磁
          </Button>
        </div>
      </div>
    </div>
  )
}
Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
