import { defaultIconPrefixCls } from 'antd/lib/config-provider';
import React, { Component } from 'react';

export default class Queue extends Component{
    constructor(){
        super()
        this.state={
            queue: []
        }
    }
    render() {
        const { items, session } = this.props;
        return (
          <div style={{ paddingBottom: '10px' }}>
            <h2><FormattedMessage id="queue.title" /></h2>
            {items.length === 0
              ? <p><FormattedMessage id="queue.empty" /></p>
              : <table className="queue">
                  <style jsx>{`
                    .queue {
                      max-width: 550px;
                    }
                  `}</style>
                  <tbody>
                    {items.map((i, index) => (
                      <QueueItem
                        item={i}
                        session={session}
                        index={index}
                        key={index}
                      />
                    ))}
                  </tbody>
                </table>}
          </div>
        );
      }
}