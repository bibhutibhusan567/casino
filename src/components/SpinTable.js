
import React from 'react'
import { Button, Table } from 'reactstrap'

export default function SpinTable(props) {
    return (
        <Table>
            <thead>
                <tr>
                    <th>
                        <Button onClick={() => props.sortBy("id")}>
                            Id
                        </Button>
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
                    <th><Button onClick={() => props.sortBy("time")}>Time</Button> </th>

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
