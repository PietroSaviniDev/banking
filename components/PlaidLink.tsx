import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { useRouter } from 'next/navigation'
import { createLinkToken } from '@/lib/actions/user.actions'
const PlaidLink = ({user, variant}: PlaidLinkProps) => {

    const [token, setToken] = useState('');
    const router = useRouter();

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        // await exchangePublicToken({
        //     publicToken: public_token,
        //     user
        // })

        router.push('/')
    }, [user])


    //handshake user-plaid
    useEffect(() => {
        
        const getLinkToken = async () => {
            const data = await createLinkToken(user);
            setToken(data?.linkToken)
        }

        getLinkToken()

    }, [user])
    

    const config: PlaidLinkOptions = {
        token,
        onSuccess
    }

    const {open, ready } = usePlaidLink(config)

  return (
    <>
        {variant === 'primary' ? (

            <Button
                className='plaidlink-primary'
                onClick={() => open()}
                disabled={!ready}
            >
                Connetti Conto
            </Button>
        ) : variant === 'ghost' ? (
            <Button>
                Connetti Conto
            </Button>
        ) : (
            <Button>
                Connetti Conto
            </Button>
        )}
    </>
  )
}

export default PlaidLink