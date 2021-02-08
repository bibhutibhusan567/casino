
import React from 'react'
import { Table } from 'reactstrap'

export default function SpinTable(props) {
    return (
        <Table>
            <thead>
                <tr>
                    <th>
                        Id
                    </th>
                    <th>
                        Slot 1
                    </th>
                    <th>
                        Slot 2
                    </th>
                    <th>
                        Slot 3
                    </th>
                    <th>Time</th>

                </tr>
            </thead>
            <tbody>
                <>
                    {
                        props.spinHistory.map((history, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{history.id}</td>
                                    <td>{history.slot1}</td>
                                    <td>{history.slot2}</td>
                                    <td>{history.slot3}</td>
                                    <td>{history.time}</td>
                                </tr>
                            )

                        })
                    }
                </>
            </tbody>
        </Table>
    )
}
