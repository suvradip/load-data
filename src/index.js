/**
 * Description: It's simple utility function which implement the fetch API and return a Promise
 * Author: Suvradip
 */
function fetchCheckStatus(response) {
   if (response.status >= 200 && response.status < 300) {
      return response;
   }
   const error = new Error(response.statusText);
   error.response = response;
   throw error;
}

window.loadData = url => {
   const option = {
      method: 'GET',
      headers: new Headers(),
      mode: 'cors',
      cache: 'default',
   };

   return fetch(url, option)
      .then(fetchCheckStatus)
      .then(resp => {
         const contentType = resp.headers.get('Content-Type');
         if (contentType && contentType.indexOf('application/json') !== -1) {
            return resp.json();
         }
         return resp.text();
      })
      .then(data => data)
      .catch(() => {
         console.error('Something went wrong! Please check url');
      });
};
