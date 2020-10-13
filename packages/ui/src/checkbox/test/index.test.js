import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Checkbox from "../index";

describe( '<Checkbox />', () => {
	it( 'should call onChange prop when checkbox checked changed.', () => {
		const onChangeMock = jest.fn();

		const { container } = render( <Checkbox onChange={ onChangeMock }/> )

		fireEvent.click( container.firstChild )

		expect( onChangeMock ).toHaveBeenCalledTimes( 1 )
	} );
} )
