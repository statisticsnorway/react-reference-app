import React from 'react';
import { List, Accordion } from 'semantic-ui-react';

function DataView({ data }) {
    const parseData = (data, first, index) => {

        let composite = Array.isArray(data) ? {
            title: 'array', key: 'a', content: {
                content: <List>{data.map((datum, index) => parseData(datum, false, index))}</List>
                }
            }
            : (typeof data === 'object' && data !== null ? {
                title: 'object', key: 'o', content: {
                    content: <List>{Object.entries(data).map((entry, index) =>
                        <List.Item key={index}><List.Header>{entry[0]}</List.Header>{parseData(entry[1], false)}</List.Item>
                    )}</List>
                }
            } : null);

        return (composite && first ? <Accordion fluid styled defaultActiveIndex={0} panels={[composite]} />
            : (composite ? <Accordion.Accordion panels={[composite]} />
                : <div key={index !== undefined ? index : 1}>{data}</div>));
    }
    return parseData(data, true);
}
export default DataView;