import { HeaderBox } from "@/components/HeaderBox";
import { TotalBalanceBox } from "@/components/TotalBalanceBox";


const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {

  const loggedIn = {
    firstName: 'Pietro'
  };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Bentornato" 
            user={loggedIn?.firstName || 'Guest'} 
            subtext={"Accedi e gestisci il tuo account e transazioni efficacemente"}
          />

          <TotalBalanceBox 
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}

          />
        </header>
      </div>
    </section>
  )
}

export default Home