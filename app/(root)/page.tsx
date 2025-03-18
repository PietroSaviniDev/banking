import { HeaderBox } from "@/components/HeaderBox";
import { RightSidebar } from "@/components/RightSidebar";
import { TotalBalanceBox } from "@/components/TotalBalanceBox";


const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {

  const loggedIn = {
    firstName: 'Pietro',
    lastName: 'Savini',
    email: 'savinipietro.dev@gmail.com'
  };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Bentornato" 
            user={loggedIn?.firstName || 'Guest'} 
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
        banks={[{currentBalance:999.87},{currentBalance:1988.78}]}
      />
    </section>
  )
}

export default Home