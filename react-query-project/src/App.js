import {QueryClient, QueryClientProvider} from 'react-query';

// For React Query Dev-Tool
import {ReactQueryDevtools} from 'react-query/devtools';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SinglePost from './pages/SinglePost';

// Creating a query client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/post/:id' component={SinglePost} />
          </Switch>
        </div>
    
        {/* Call React Query Dev-Tool */}
        <ReactQueryDevtools />
        <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
