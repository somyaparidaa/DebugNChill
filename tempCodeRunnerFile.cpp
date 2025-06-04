#include<bits/stdc++.h>
using namespace std;
#define ll long long 
typedef vector<long long> vll;

int main(){
ios_base::sync_with_stdio(false);
cin.tie(NULL);
int t;cin>>t;
while(t--){
    ll n;
    cin>>n;
    vll v(n);
    vector<pair<ll,ll>>gap(n);
    for(int i=0;i<n;i++){
        cin>>v[i];
    }
    for(int i=0;i<n;i++){
        ll a,b;
        cin>>a>>b;
        gap[i]={a,b};
    }
    vll mini(n+1,0),maxi(n+1,0);
    bool check=false;
    for(int i=1;i<=n;i++){

        ll tempL,tempR;
     if(v[i-1]==0){
       tempL=mini[i-1];
       tempR=maxi[i-1];
     }
     else if(v[i-1]==1){
         tempL=mini[i-1]+1;
       tempR=maxi[i-1]+1;
     }
     else{
        tempL=mini[i-1];
       tempR=maxi[i-1]+1;
     }
     if((gap[i-1].first>tempR)||(tempL>gap[i-1].second)){
        cout<<-1<<endl;
        check=true;
        break;
     }
     mini[i]=max(tempL,gap[i-1].first);
     maxi[i]=min(tempR,gap[i-1].second);
    }
    if(check==true) continue;
    
    // cout<<"YES"<<endl;

    vll  path;
    ll curr=maxi[n];
    // ll curr=mini[n];
    for(int i=n-1;i>=0;i--){
       if(v[i]==-1 && ((mini[i]<=curr) && (maxi[i]>=curr))){
            path.push_back(0);
       }
       else if(v[i]==-1){
            path.push_back(1);
            curr-=1;
       }
       else{
          path.push_back(v[i]);
          curr-=v[i];
       }
    }
    reverse(path.begin(),path.end());
    for(auto it:path){
        cout<<it<<" ";
    }
    cout<<endl;
}
return 0;
}