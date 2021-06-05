import React from "react";
import { create } from "react-test-renderer";
import {ProfileStatus} from './ProfileStatus';

describe("ProfileStatus component", () => {
    test("Status from props should be in state", () => {
        const component = create(<ProfileStatus status='TESTING' updateUserStatus={x => x} />);
        const instance: any = component.getInstance();
        expect(instance.state.status).toBe("TESTING");
    });

    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status='TESTING' updateUserStatus={x => x} />);
        const root: any = component.root;
        const span = root.findByType('span')
        expect(span).not.toBeNull();
    });

    test("after creation <input> should not be displayed", () => {
        const component = create(<ProfileStatus status='TESTING' updateUserStatus={x => x} />);
        const root: any = component.root;
        expect(() => root.findByType('input'))
            .toThrow('No instances found with node type: "input"');
    });

    test("after creation <span> should contain correct status", () => {
        const component = create(<ProfileStatus status='TESTING' updateUserStatus={x => x} />);
        const root: any = component.root;
        const span = root.findByType('span')
        expect(span.children[0]).toBe('TESTING');
    });

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status='TESTING' updateUserStatus={x => x} />);
        const root: any = component.root;
        const span = root.findByType('span')
        span.props.onDoubleClick()
        const input = root.findByType('input')
        expect(input.props.value).toBe('TESTING');
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status='TESTING' updateUserStatus={mockCallback} />);
        const instance: any = component.getInstance();
        instance.deActivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});



