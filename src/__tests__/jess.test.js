import React from 'react'
import { getUser } from '../../server/controller/authController'

//test Create.js createBlorp function

test('', () => {
    expect(getUser(test_username).stringMatching())
})
