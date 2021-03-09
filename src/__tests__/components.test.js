import { shallow } from 'enzyme'
import React from 'react'
import CounterButton from '../components/CounterButton'
import CardList from '../components/CardList'
import Card from '../components/Card'
import MainPage from '../components/MainPage'

describe('MainPage.js', () => {
    let wrapper;
    beforeEach(() => {
        const mockProps = {
            onRequestRobots: jest.fn(),
            robots: [],
            searchField: '',
            isPending: false
        }
        wrapper = shallow(<MainPage { ...mockProps } />)
    })

    it('renders MainPage without crashing', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('Filters robots correctly', () => {
        const mockProps2 = {
            onRequestRobots: jest.fn(),
            robots: [{
                id: 3,
                name: 'John',
                email: 'john@gmail.com'
            }],
            searchField: 'john',
            isPending: false
        }

        let wrapper2 = shallow(<MainPage { ...mockProps2 } />)

        //expect(wrapper2.instance().filterRobots([])).toEqual([])
        expect(wrapper2.instance().filterRobots()).toEqual([{
            id: 3,
            name: 'John',
            email: 'john@gmail.com'
        }])


        const mockProps3 = {
            onRequestRobots: jest.fn(),
            robots: [{
                id: 3,
                name: 'John',
                email: 'john@gmail.com'
            }],
            searchField: 'a',
            isPending: false
        }

        const filteredRobots = []
        let wrapper3 = shallow(<MainPage { ...mockProps3 } />)        
        expect(wrapper3.instance().filterRobots()).toEqual([])
    })

    it('Check isPending', () => {
        const mockProps4 = {
            onRequestRobots: jest.fn(),
            robots: [],
            searchField: '',
            isPending: true
        }
        let wrapper4 = shallow(<MainPage { ...mockProps4 } />)
        expect(mockProps4.isPending).toEqual(true)
    })
})

describe('Card', () => {
    it('Expect to render Card component', () => {    
        expect(shallow(<Card name='Test' email='abc@some.com' />)).toMatchSnapshot()
    })
})

describe('CardList', () => {
    it('Expect to render CardList component', () => {    
        const mockRobots = [
            {
                id: 1,
                name: 'John Snow',
                username: 'JohnJohn',
                email: 'john@gmail.com'
            }
        ]
        expect(shallow(<CardList robots={mockRobots} />)).toMatchSnapshot()
    })
})

describe('CounterButton', () => {
    it('Expect to render CounterButton component', () => {    
        const mockColor = 'red'
        const wrapper = shallow(<CounterButton color={mockColor} />)
    
        expect(wrapper).toMatchSnapshot()
    })
    
    it('correctly increments the counter', () => {
        const mockColor = 'red'
        const wrapper = shallow(<CounterButton color={mockColor} />)
    
        wrapper.find('[id="counter"]').simulate('click')
        expect(wrapper.state()).toEqual({ count: 1 })
    })
    
    it('check for shouldComponentUpdate', () => {
        const mockCB = new CounterButton()    
        expect(mockCB.shouldComponentUpdate({}, { count: 0 })).toEqual(false)
        expect(mockCB.shouldComponentUpdate({}, { count: 1 })).toEqual(true)
    })
})