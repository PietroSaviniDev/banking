import { HeaderBox } from "@/components/HeaderBox";
import { RightSidebar } from "@/components/RightSidebar";
import { TotalBalanceBox } from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";


const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {

  const loggedIn = await getLoggedInUser()
  console.log(loggedIn)
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Bentornato"
            user={loggedIn?.name || 'Guest'}
            subtext={"Accedi per gestire il tuo account e transazioni efficacemente"}
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        TRANSAZIONI RECENTI
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{id:'1', currentBalance:1250.50},{id:'2', currentBalance:1250.50}]}
      />
    </section>
  )
}

export default Home