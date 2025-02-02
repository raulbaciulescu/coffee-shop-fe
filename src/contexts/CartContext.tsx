import React, {createContext, useContext, useEffect, useReducer} from 'react';
import {Product} from '../data/products';

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    total: number;
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: Product }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'LOAD_CART'; payload: CartState };

const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
} | null>(null);

const CART_STORAGE_KEY = 'dailyBrew_cart';

function cartReducer(state: CartState, action: CartAction): CartState {
    let newState: CartState;

    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                newState = {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? {...item, quantity: item.quantity + 1}
                            : item
                    ),
                    total: state.total + action.payload.price
                };
            } else {
                newState = {
                    ...state,
                    items: [...state.items, {...action.payload, quantity: 1}],
                    total: state.total + action.payload.price
                };
            }
            break;
        }

        case 'REMOVE_ITEM': {
            const item = state.items.find(item => item.id === action.payload);
            if (!item) return state;

            newState = {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
                total: state.total - item.price * item.quantity
            };
            break;
        }

        case 'UPDATE_QUANTITY': {
            const item = state.items.find(item => item.id === action.payload.id);
            if (!item) return state;

            const quantityDiff = action.payload.quantity - item.quantity;

            newState = {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? {...item, quantity: action.payload.quantity}
                        : item
                ),
                total: state.total + (item.price * quantityDiff)
            };
            break;
        }

        case 'LOAD_CART': {
            newState = action.payload;
            break;
        }

        default:
            return state;
    }

    // Save to localStorage after each change
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
    return newState;
}

export function CartProvider({children}: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, {items: [], total: 0});

    // Load cart from localStorage on initial render
    useEffect(() => {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                dispatch({type: 'LOAD_CART', payload: parsedCart});
            } catch (error) {
                console.error('Failed to parse saved cart:', error);
                localStorage.removeItem(CART_STORAGE_KEY);
            }
        }
    }, []);

    return (
        <CartContext.Provider value={{state, dispatch}}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}